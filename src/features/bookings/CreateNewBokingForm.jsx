import jsValidator from 'validator';
import { Controller, useForm } from 'react-hook-form';
import Form from '../../ui/Form';
import Heading from '../../ui/Heading';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import FormButtonRow from '../../ui/FormButtonRow';
import Button from '../../ui/Button';

import { countryList } from '../../utils/countryList';
import Select from '../../ui/Select';
import {
  calculateDailyPrice,
  calculateDayCount,
  calculateTotalPrice,
  createNumGuestArray,
  formatCurrency,
} from '../../utils/helpers';
import Checkbox from '../../ui/Checkbox';
import { useSettings } from '../settings/useSettings';
import Spinner from '../../ui/Spinner';
import { formatInTimeZone } from 'date-fns-tz';
import Textarea from '../../ui/Textarea';
import { useCreateBooking } from './useCreateBooking';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { getUserTimeZone } from '../../utils/time';
import { ENV } from '../../../config/env';

const TZ = ENV.TZ || 'Europe/Istanbul';

function CreateNewBokingForm({ bungalow, bookingData, onCloseModal }) {
  const { settings, isPending: isSettingsLoading } = useSettings();
  const { createBooking, isBookingCreating } = useCreateBooking();

  const navigate = useNavigate();

  const { control, formState, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      ...bookingData,
      fullName: '',
      email: '',
      nationality: '',
      nationalId: '',
      cabinPrice: bungalow?.discount
        ? formatCurrency(
            Number(bungalow?.regularPrice) - Number(bungalow?.discount),
          )
        : formatCurrency(bungalow?.regularPrice),
      numGuests: bookingData.numGuests || 1,
      hasBreakfast: bookingData.hasBreakfast || false,
      observations: '',
    },
  });

  const isLoading = isSettingsLoading;

  if (isLoading) return <Spinner />;

  const { numGuests, hasBreakfast, pickedStart, pickedEnd } = watch();

  const setting = settings.find((setting) => setting.isActive);

  const numOfGuestsArray = createNumGuestArray(bungalow);

  const { errors } = formState;

  const dailyPrice = calculateDailyPrice(bungalow);

  const dayConut = calculateDayCount(pickedStart, pickedEnd);

  const totaPrice = calculateTotalPrice(
    dayConut,
    numGuests,
    dailyPrice,
    setting.breakfastPrice,
    hasBreakfast,
  );

  function onSubmit(data) {
    createBooking(data, {
      onSuccess: (data) => {
        toast.success('New booking is created.');
        navigate(`/admin/bookings/${data._id}`);
      },
    });
  }

  return (
    <>
      <div>
        <Heading as="h3" $variation="modal">
          New Booking ({bungalow.name})
        </Heading>
        <div>
          <span>
            From:{' '}
            {formatInTimeZone(
              bookingData.pickedStart,
              getUserTimeZone(),
              'dd/MM/yyyy',
            )}
          </span>
          <span> - </span>
          <span>
            To:{' '}
            {formatInTimeZone(
              bookingData.pickedEnd,
              getUserTimeZone(),
              'dd/MM/yyyy',
            )}
          </span>
          <span>({dayConut} nights) </span>
        </div>
        <div>
          <span> Total Price: {formatCurrency(totaPrice)}</span>
        </div>
      </div>

      <Form
        type={onCloseModal ? 'modal' : 'regular'}
        onSubmit={handleSubmit(onSubmit)}
      >
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
              required: 'This filed is required.',
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
          id="natinality"
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
        <FormRow
          label="Cabin Price"
          id="cabinPrice"
          error={errors?.cabinPrice?.message}
        >
          <Controller
            control={control}
            name="cabinPrice"
            rules={{ required: 'This field is required.' }}
            render={({ field }) => (
              <Input {...field} id="cabinPrice" type="text" disabled />
            )}
          />
        </FormRow>
        <FormRow
          label="Number of Guests"
          id="numGuests"
          error={errors?.numGuests?.message}
        >
          <Controller
            control={control}
            name="numGuests"
            rules={{ required: 'This field is required.' }}
            render={({ field }) => (
              <Select
                {...field}
                id="numGuests"
                options={numOfGuestsArray}
                disabled={isBookingCreating}
              />
            )}
          />
        </FormRow>
        <FormRow
          label="Breakfast"
          id="hasBreakfast"
          error={errors?.hasBreakfast?.message}
        >
          <Controller
            control={control}
            name="hasBreakfast"
            render={({ field }) => (
              <Checkbox
                {...field}
                id="hasBreakfast"
                checked={!!field.value}
                disabled={isBookingCreating}
              >
                Does guest want breakfast? (
                {formatCurrency(setting?.breakfastPrice)})
              </Checkbox>
            )}
          />
        </FormRow>
        <FormRow
          label="Observations"
          id="observations"
          error={errors?.observations?.message}
        >
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
            disabled={isBookingCreating}
          >
            Create
          </Button>
          <Button
            $variation="brand-soft"
            $size="medium"
            type="button"
            onTap={() => reset()}
            disabled={isBookingCreating}
          >
            Reset
          </Button>
          <Button
            $variation="danger"
            $size="medium"
            type="button"
            onTap={onCloseModal}
            disabled={isBookingCreating}
          >
            Cancel
          </Button>
        </FormButtonRow>
      </Form>
    </>
  );
}

export default CreateNewBokingForm;
