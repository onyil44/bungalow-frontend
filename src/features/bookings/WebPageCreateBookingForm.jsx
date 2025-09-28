import jsValidator from 'validator';
import { Controller, useForm } from 'react-hook-form';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Select from '../../ui/Select';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import SpinnerMini from '../../ui/SpinnerMini';
import { useCabins } from '../cabins/useCabins';
import DatePicker from 'react-datepicker';
import { HiCalendarDateRange } from 'react-icons/hi2';
import { useSettings } from '../settings/useSettings';
import { useEffect } from 'react';
import {
  calculateDailyPrice,
  calculateDayCount,
  calculateTotalPrice,
  createNumGuestArray,
  formatCurrency,
  isUserRangeOverlapping,
} from '../../utils/helpers';
import Checkbox from '../../ui/Checkbox';
import FormButtonRow from '../../ui/FormButtonRow';
import Button from '../../ui/Button';
import { countryList } from '../../utils/countryList';
import { addDays } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import {
  getBungalow,
  setTotalPrice,
  getBookingDetails,
  resetNewBooking,
} from './newBookingSlice';
import toast from 'react-hot-toast';
import Textarea from '../../ui/Textarea';
import { useCreateBooking } from './useCreateBooking';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { device } from '../../styles/bereakingPoints';
import { useNavigate } from 'react-router';
import {
  daysNotAvaliableInTimeZone,
  getUserTimeZone,
  utcMidnightToYmdInZone,
} from '../../utils/time';
import { useCabinOccupaidDaysForGuests } from './useCabinOccupaidDaysForGuests';
import { replace } from 'lodash';

function WebPageCreateBookingForm() {
  const navigate = useNavigate();
  const isTabletSorSmaller = useMediaQuery(device.tabletS);

  const registeredCabin = useSelector(getBungalow);
  const registeredBookingDetails = useSelector(getBookingDetails);

  const [registeredStartDate, registeredEndDate] =
    registeredBookingDetails?.startDateUtc
      ? [
          utcMidnightToYmdInZone(
            registeredBookingDetails?.startDateUtc,
            getUserTimeZone(),
          ),
          utcMidnightToYmdInZone(
            addDays(
              registeredBookingDetails?.startDateUtc,
              registeredBookingDetails?.numNights,
            ),
            getUserTimeZone(),
          ),
        ]
      : [null, null];

  const { cabins, isPending: isCabinsLoading } = useCabins();
  const { settings, isPending: isSettingsLoading } = useSettings();
  const { createBooking, isBookingCreating } = useCreateBooking();

  const { register, formState, handleSubmit, watch, control } = useForm({
    defaultValues: {
      cabinId: registeredCabin?._id,
      pickedStart: registeredStartDate ? new Date(registeredStartDate) : null,
      pickedEnd: registeredEndDate ? new Date(registeredEndDate) : null,
      numGuests: Number(registeredBookingDetails.numGuests ?? 1),
      hasBreakfast: registeredBookingDetails.hasBreakfast,
    },
  });

  const { cabinId, pickedStart, pickedEnd, numGuests, hasBreakfast } = watch();

  const { cabinOccupaidDays, isLoading: isCabinOccupaidDaysLoading } =
    useCabinOccupaidDaysForGuests(cabinId);

  const disabledDates =
    cabinOccupaidDays
      ?.flatMap((cod) =>
        daysNotAvaliableInTimeZone(
          cod.startDateUtc,
          cod.numNights,
          getUserTimeZone(),
        ),
      )
      .map((date) => new Date(date)) || [];

  const anyOverLappingDays =
    cabinOccupaidDays && pickedStart && pickedEnd
      ? isUserRangeOverlapping(
          pickedStart,
          pickedEnd,
          getUserTimeZone(),
          process.env.TZ,
          cabinOccupaidDays,
        )
      : false;

  useEffect(
    function () {
      anyOverLappingDays &&
        toast.error(
          'Selected days are not avaliable for this bulgalow. Please change selected days or bungalow.',
        );
    },
    [anyOverLappingDays],
  );

  const dispatch = useDispatch();

  const isLoading = isCabinsLoading || isSettingsLoading;

  const cabin = cabins?.find((el) => el._id === cabinId);
  const setting = settings?.find((setting) => setting.isActive);

  const numOfGuestsArray = createNumGuestArray(cabin);

  const dailyPrice = calculateDailyPrice(cabin);

  const dayCount = calculateDayCount(pickedStart, pickedEnd);

  const totalPrice = calculateTotalPrice(
    dayCount,
    numGuests,
    dailyPrice,
    setting?.breakfastPrice,
    hasBreakfast,
  );

  useEffect(
    function () {
      dispatch(setTotalPrice({ totalPrice: totalPrice }));
    },
    [totalPrice, dispatch],
  );

  if (isLoading) return <Spinner />;

  let maxEndDate = null;

  if (pickedStart) {
    maxEndDate = disabledDates
      .sort((a, b) => a - b)
      .filter((date) => date > pickedStart)
      .at(0);
  }

  const { errors } = formState;

  const cabinOptions = [
    { label: '', value: null },
    ...cabins.map((cabin) => {
      return { label: cabin.name, value: cabin._id };
    }),
  ];

  function onSubmit(data) {
    createBooking(data, {
      onSuccess: (data) => {
        toast.success('Your booking is created.');
        navigate(
          `/web/booking?pnrCode=${data.pnrCode}&email=${data.guestId.email}&nationalId=${data.guestId.nationalId}`,
          { replace: true },
        );
        dispatch(resetNewBooking());
      },
    });
  }

  return (
    <Form type="webPageCreateBookingForm" onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="Full Name"
        id="fullName"
        error={errors?.fullName?.message}
      >
        <Controller
          control={control}
          name="fullName"
          rules={{ required: 'This field is required.' }}
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              id="fullName"
              disabled={isBookingCreating}
            />
          )}
        />
      </FormRow>
      <FormRow label="E mail" id="email" error={errors?.email?.message}>
        <Controller
          control={control}
          name="email"
          rules={{
            required: 'This field is required.',
            validate: {
              validator: (v) =>
                jsValidator.isEmail(v) ||
                'Please submit a valid email address.',
            },
          }}
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              id="email"
              disabled={isBookingCreating}
            />
          )}
        />
      </FormRow>
      <FormRow
        label="Nationality"
        id="nationality"
        error={errors?.nationality?.message}
      >
        <Controller
          control={control}
          name="nationality"
          rules={{ required: 'This field is required.' }}
          render={({ field }) => (
            <Select
              {...field}
              id="nationality"
              options={countryList}
              disabled={isBookingCreating}
            />
          )}
        />
      </FormRow>
      <FormRow
        label="National ID Number"
        id="nationalId"
        error={errors?.nationalId?.message}
      >
        <Controller
          control={control}
          name="nationalId"
          rules={{ required: 'This field is required.' }}
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              id="nationalId"
              disabled={isBookingCreating}
            />
          )}
        />
      </FormRow>
      <FormRow label="Bungalow" error={errors?.cabinId?.message}>
        <Select
          id="cabinId"
          options={cabinOptions}
          disabled
          {...register('cabinId', { required: 'This field is required.' })}
        />
      </FormRow>
      <FormRow label="Cabin Price" error={errors?.cabinPrice?.message}>
        <Controller
          control={control}
          name="cabinPrice"
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              disabled={true}
              value={formatCurrency(dailyPrice)}
            />
          )}
        />
      </FormRow>
      <FormRow
        label="Date (from)"
        error={errors?.pickedStart?.message}
        id="pickedStart"
      >
        {isCabinOccupaidDaysLoading && <SpinnerMini />}
        {!isCabinOccupaidDaysLoading && (
          <Controller
            control={control}
            name="pickedStart"
            rules={{ required: 'This field is required.' }}
            render={({ field }) => (
              <DatePicker
                showIcon
                selectsStart
                icon={<HiCalendarDateRange />}
                toggleCalendarOnIconClick
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                dateFormat="dd/MM/yyyy"
                popperPlacement="bottom"
                disabled={!cabinId || isBookingCreating}
                minDate={new Date()}
                startDate={pickedStart ? new Date(pickedStart) : null}
                endDate={pickedEnd ? new Date(pickedEnd) : null}
                showDisabledMonthNavigation
                excludeDates={disabledDates}
                withPortal={isTabletSorSmaller}
                popperProps={{ strategy: 'fixed' }}
                shouldCloseOnScroll={false}
                portalId={isTabletSorSmaller ? 'app-portal' : ''}
              />
            )}
          />
        )}
      </FormRow>
      <FormRow
        label="Date (to)"
        error={errors?.pickedEnd?.message}
        id="pickedEnd"
      >
        {isCabinOccupaidDaysLoading && <SpinnerMini />}
        {!isCabinOccupaidDaysLoading && (
          <Controller
            control={control}
            name="pickedEnd"
            rules={{ required: 'This field is required.' }}
            render={({ field }) => (
              <DatePicker
                showIcon
                selectsEnd
                icon={<HiCalendarDateRange />}
                toggleCalendarOnIconClick
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                dateFormat="dd/MM/yyyy"
                popperPlacement="bottom"
                disabled={!cabinId || !pickedStart || isBookingCreating}
                minDate={pickedStart ? new Date(pickedStart) : null}
                maxDate={maxEndDate}
                startDate={pickedStart ? new Date(pickedStart) : null}
                endDate={pickedEnd ? new Date(pickedEnd) : null}
                showDisabledMonthNavigation
                excludeDates={disabledDates}
                withPortal={isTabletSorSmaller}
                popperProps={{ strategy: 'fixed' }}
                shouldCloseOnScroll={false}
                portalId={isTabletSorSmaller ? 'app-portal' : ''}
              />
            )}
          />
        )}
      </FormRow>
      <FormRow label="Number of Guests" error={errors?.numGuests?.message}>
        <Select
          id="numGuests"
          disabled={!cabinId || isBookingCreating}
          {...register('numGuests', { required: 'This field is required.' })}
          options={numOfGuestsArray}
        />
      </FormRow>
      <FormRow label="Breakfast" error={errors?.hasBreakfast?.message}>
        <Checkbox
          id="hasBreakfast"
          {...register('hasBreakfast')}
          disabled={!cabinId || isBookingCreating}
        >
          Do you want breakfast? ({formatCurrency(setting.breakfastPrice)})
        </Checkbox>
      </FormRow>
      <FormRow label="Observations" id="observations">
        <Controller
          control={control}
          name="observations"
          render={({ field }) => (
            <Textarea
              {...field}
              id="observations"
              disabled={isBookingCreating}
            />
          )}
        />
      </FormRow>
      <FormButtonRow $position="center">
        <Button
          $variation="primary"
          $size="medium"
          disabled={anyOverLappingDays || isBookingCreating}
        >
          Create New Booking
        </Button>
        <Button
          $variation="danger"
          $size="medium"
          type="button"
          onTap={() => navigate('/web', replace)}
        >
          Cancel
        </Button>
      </FormButtonRow>
    </Form>
  );
}

export default WebPageCreateBookingForm;
