import Spinner from '../../ui/Spinner';
import Header from '../../ui/Header';
import Form from '../../ui/Form';
import FormCheckBox from '../../ui/FormCheckBox';
import { Controller, useForm } from 'react-hook-form';
import Input from '../../ui/Input';
import FormRow from '../../ui/FormRow';
import Select from '../../ui/Select';
import { HiCalendarDateRange } from 'react-icons/hi2';
import DatePicker from 'react-datepicker';
import Textarea from '../../ui/Textarea';
import FormButtonRow from '../../ui/FormButtonRow';
import Button from '../../ui/Button';

import {
  calculateCabinPrice,
  calculateDailyPrice,
  calculateDayCount,
  calculateExtraPrice,
  createNumGuestArray,
  formatCurrency,
} from '../../utils/helpers';
import { useUpdateBooking } from './useUpdateBooking';
import { useCabinOccupaidDays } from './useCabinOccupaidDays';
import Heading from '../../ui/Heading';
import {
  daysNotAvaliableInTimeZone,
  getUserTimeZone,
  ymdInZoneToUtcDate,
} from '../../utils/time';
import { useCabin } from '../cabins/useCabin';
import { useSettings } from '../settings/useSettings';
import { useEffect } from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { device } from '../../styles/bereakingPoints';

function UpdateBookingForm({ bookingToUpdate, onCloseModal }) {
  const isTabletSorSmaller = useMediaQuery(device.tabletS);
  const booking = {
    ...bookingToUpdate,
  };

  const { updateBooking, isUpdating } = useUpdateBooking();

  const { cabinOccupaidDays, isLoading: isCabinOccupaidDaysLoading } =
    useCabinOccupaidDays(booking?.cabinId?._id);

  const { cabin, isCabinLoading } = useCabin(booking?.cabinId?._id);

  const { settings, isPending: isSettingsLoading } = useSettings();

  const setting = settings?.find((setting) => setting.isActive);

  const defaultPickedStart = booking?.startYmd_user
    ? ymdInZoneToUtcDate(booking.startYmd_user, getUserTimeZone())
    : null;

  const defaultPickedEnd = booking?.endYmd_user
    ? ymdInZoneToUtcDate(booking.endYmd_user, getUserTimeZone())
    : null;

  const { handleSubmit, reset, watch, formState, control, setValue } = useForm({
    defaultValues: {
      ...booking,
      pickedStart: defaultPickedStart,
      pickedEnd: defaultPickedEnd,
      status: booking?.status || null,
      numGuests: Number(booking?.numGuests) || 1,
      hasBreakfast: !!booking?.hasBreakfast,
      observations: booking?.observations,
      isPaid: !!booking?.isPaid,
      cabinPrice: booking?.cabinPrice || 0,
      extraPrice: booking?.extraPrice || 0,
    },
  });

  const {
    pickedStart,
    pickedEnd,
    isPaid,
    numGuests,
    hasBreakfast,
    cabinPrice,
    extraPrice,
  } = watch();

  const cabinOccupaidDaysFromOtherBookings = cabinOccupaidDays?.filter(
    (ocp) => ocp._id !== booking._id,
  );

  const disabledDates =
    cabinOccupaidDaysFromOtherBookings
      ?.flatMap((cod) =>
        daysNotAvaliableInTimeZone(cod.startDateUtc, cod.numNights, ENV.TZ),
      )
      .map((date) => new Date(date)) || [];
  const numOfGuestsArray = createNumGuestArray(cabin);

  let maxEndDate = null;

  if (pickedStart) {
    maxEndDate =
      [...disabledDates]
        .sort((a, b) => a.getTime() - b.getTime())
        .find((date) => date > pickedStart) || null;
  }

  const dailyPrice = calculateDailyPrice(cabin);

  const dayCount = calculateDayCount(pickedStart, pickedEnd);

  useEffect(
    function () {
      setValue('cabinPrice', calculateCabinPrice(dayCount, dailyPrice));
      setValue(
        'extraPrice',
        calculateExtraPrice(
          dayCount,
          numGuests,
          setting?.breakfastPrice,
          hasBreakfast,
        ),
      );
    },
    [
      dayCount,
      dailyPrice,
      numGuests,
      setting?.breakfastPrice,
      hasBreakfast,
      setValue,
    ],
  );

  const totalPrice = Number(cabinPrice) + Number(extraPrice);

  const { errors } = formState;

  if (
    isUpdating ||
    isCabinOccupaidDaysLoading ||
    isCabinLoading ||
    isSettingsLoading
  )
    return <Spinner />;

  function onSubmit(data) {
    console.log(data);
    const submitData = {
      ...data,
      guestId: data.guestId._id,
      cabinId: data.cabinId._id,
      extraPrice: data.extraPrice || 0,
      totalPrice,
    };
    updateBooking(submitData, {
      onSuccess: () => {
        reset();
        onCloseModal?.();
      },
    });
  }

  return (
    <>
      <div>
        <Heading as="h2" $variation="modal">
          Booking Update
        </Heading>
        <div>
          <Heading
            as="h4"
            $variation="modal"
            style={{ display: 'inline-block' }}
          >
            Guest Name :
          </Heading>
          <span> {booking.guestId.fullName}</span>
        </div>
        <div>
          <Heading
            as="h5"
            style={{ display: 'inline-block' }}
            $variation="modal"
          >
            Cabin Name :
          </Heading>
          <span style={{ fontSize: '1.4rem' }}>
            {' '}
            {booking.cabinId.name} ({formatCurrency(+totalPrice)}
            {watch().isPaid ? ' has been already paid.' : ' not paid yet.'})
          </span>
        </div>
      </div>

      <Form
        type={onCloseModal ? 'modal' : 'regular'}
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormRow label="Start Date">
          <Controller
            control={control}
            name="pickedStart"
            rules={{ required: 'This field is required.' }}
            render={({ field }) => (
              <DatePicker
                showIcon
                selectsStart
                icon={<HiCalendarDateRange />}
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                dateFormat="dd/MM/yyy"
                popperPlacement="bottom"
                startDate={field.value}
                endDate={pickedEnd}
                showDisabledMonthNavigation
                excludeDates={disabledDates}
                withPortal={isTabletSorSmaller}
                popperProps={{ strategy: 'fixed' }}
                shouldCloseOnScroll={false}
                portalId={isTabletSorSmaller ? 'app-portal' : ''}
              />
            )}
          />
        </FormRow>

        <FormRow label="End Date" error={errors?.pickedEnd?.message}>
          <Controller
            control={control}
            name="pickedEnd"
            rules={{
              required: 'This field is required.',
              validate: (value) => {
                return (
                  new Date(value) > new Date(pickedStart) ||
                  'End date should be later than start date.'
                );
              },
            }}
            render={({ field }) => (
              <DatePicker
                showIcon
                selectsEnd
                icon={<HiCalendarDateRange />}
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                dateFormat="dd/MM/yyy"
                popperPlacement="bottom"
                minDate={pickedStart}
                maxDate={maxEndDate}
                startDate={pickedStart}
                endDate={field.value}
                showDisabledMonthNavigation
                excludeDates={disabledDates}
                withPortal={isTabletSorSmaller}
                popperProps={{ strategy: 'fixed' }}
                shouldCloseOnScroll={false}
                portalId={isTabletSorSmaller ? 'app-portal' : ''}
              />
            )}
          />
        </FormRow>

        <FormRow label="Status" error={errors?.status?.message} id="status">
          <Controller
            control={control}
            name="status"
            rules={{
              required: 'This field is required.',
              validate: (value) =>
                (value === 'checked-in' || value === 'checked-out'
                  ? isPaid
                  : true) || 'The amount is not paid.',
            }}
            render={({ field }) => (
              <Select
                {...field}
                id="status"
                options={[
                  { value: 'unconfirmed', label: 'Unconfirmed' },
                  { value: 'checked-in', label: 'Checked In' },
                  { value: 'checked-out', label: 'Checked Out' },
                ]}
              />
            )}
          />
        </FormRow>

        <FormRow
          label="Number of Guests"
          error={errors?.numGuests?.message}
          id="numGuests"
        >
          <Controller
            control={control}
            name="numGuests"
            rules={{ required: 'This field is required!' }}
            render={({ field }) => (
              <Select
                {...field}
                id="numGuests"
                disabled={!cabin || isUpdating}
                options={numOfGuestsArray}
              />
            )}
          />
        </FormRow>

        <FormRow label="Breakfast" id="hasBreakfast">
          <Controller
            control={control}
            name="hasBreakfast"
            render={({ field }) => (
              <FormCheckBox
                {...field}
                id="hasBreakfast"
                checked={!!field.value}
              >
                Guests request breakfast?
              </FormCheckBox>
            )}
          />
        </FormRow>

        <FormRow label="Observations">
          <Controller
            control={control}
            name="observations"
            render={({ field }) => <Textarea {...field} id="observations" />}
          />
        </FormRow>

        <FormRow label="Paid" id="isPaid">
          <Controller
            control={control}
            name="isPaid"
            render={({ field }) => (
              <FormCheckBox {...field} id="isPaid" checked={!!field.value}>
                If the amount paid?
              </FormCheckBox>
            )}
          />
        </FormRow>

        <FormRow label="Cabin Price" id="cabinPrice">
          <Controller
            control={control}
            name="cabinPrice"
            render={({ field }) => (
              <Input {...field} type="number" id="cabinPrice" />
            )}
          />
        </FormRow>

        <FormRow label="Extra Price" id="extraPrice">
          <Controller
            control={control}
            name="extraPrice"
            render={({ field }) => (
              <Input
                {...field}
                id="extraPrice"
                type="number"
                disabled={!hasBreakfast}
              />
            )}
          />
        </FormRow>

        <FormButtonRow>
          <Button
            $variation="secondary"
            $size="medium"
            type="reset"
            onTap={() => onCloseModal?.()}
          >
            Cancel
          </Button>
          <Button $variation="primary" $size="medium">
            Update Booking
          </Button>
        </FormButtonRow>
      </Form>
    </>
  );
}

export default UpdateBookingForm;
