import { Controller, useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormButtonBox from '../../ui/FormButtonBox';
import FormGroup from '../../ui/FormGroup';
import DatePicker from 'react-datepicker';
import { HiCalendarDays } from 'react-icons/hi2';
import Select from '../../ui/Select';
import { useCabins } from './useCabins';
import Spinner from '../../ui/Spinner';
import { useNavigate } from 'react-router';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { device } from '../../styles/bereakingPoints';
import { useSelector } from 'react-redux';
import { getBookingDetails } from '../bookings/newBookingSlice';
import { getUserTimeZone, utcMidnightToYmdInZone } from '../../utils/time';
import { addDays } from 'date-fns';

function WebSearchBungalowForm() {
  const isTabletSorSmaller = useMediaQuery(device.tabletS);

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

  const navigate = useNavigate();
  const { cabins, isPending: isCabinsLoading } = useCabins();
  const { register, control, formState, watch, handleSubmit, reset } = useForm({
    defaultValues: {
      startDate: registeredStartDate ? new Date(registeredStartDate) : null,
      endDate: registeredEndDate ? new Date(registeredEndDate) : null,
      numGuests: Number(registeredBookingDetails.numGuests ?? 1),
    },
  });

  const { errors } = formState;

  const isLoading = isCabinsLoading;

  if (isLoading) return <Spinner />;

  const maxGuest = Math.max(...cabins.map((cabin) => cabin.maxCapacity));

  const numOfGuestsArray = Array.from({ length: maxGuest }).map((_, i) => {
    return { value: i + 1, label: `${i + 1}` };
  });

  function onSubmit(data) {
    navigate(
      `/web/search?startDate=${new Date(data.startDate).getTime() / 1000}&endDate=${new Date(data.endDate).getTime() / 1000}&numGuests=${data.numGuests}`,
    );
  }
  return (
    <Form
      columns="repeat(3, 1fr)"
      type="webPageSearchForm"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormGroup label="Date (from)" error={errors?.startDate?.message}>
        <Controller
          control={control}
          name="startDate"
          rules={{
            validate: (value) => {
              if (watch().endDate && value) {
                return (
                  value < watch().endDate ||
                  'Start date should be before end date.'
                );
              }
            },
            required: 'This field is required.',
          }}
          render={({ field }) => (
            <DatePicker
              showIcon
              selectsStart
              minDate={new Date()}
              maxDate={watch().endDate}
              icon={<HiCalendarDays />}
              toggleCalendarOnIconClick
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              dateFormat="dd/MM/yyyy"
              popperPlacement="bottom"
              placeholderText="Start Date"
              withPortal={isTabletSorSmaller}
              popperProps={{ strategy: 'fixed' }}
              shouldCloseOnScroll={false}
              portalId={isTabletSorSmaller ? 'app-portal' : ''}
            />
          )}
        />
      </FormGroup>
      <FormGroup label="Date (to)" error={errors?.endDate?.message}>
        <Controller
          control={control}
          name="endDate"
          rules={{
            validate: (value) => {
              if (watch().startDate && value) {
                return (
                  watch().startDate < value ||
                  'End date should be after the start date.'
                );
              }
            },
            required: 'This field is required.',
          }}
          render={({ field }) => (
            <DatePicker
              showIcon
              selectsEnd
              minDate={watch().startDate}
              icon={<HiCalendarDays />}
              toggleCalendarOnIconClick
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              dateFormat="dd/MM/yyyy"
              popperPlacement="bottom"
              placeholderText="EndDate"
              withPortal={isTabletSorSmaller}
              popperProps={{ strategy: 'fixed' }}
              shouldCloseOnScroll={false}
              portalId={isTabletSorSmaller ? 'app-portal' : ''}
            />
          )}
        />
      </FormGroup>
      <FormGroup label="Number of Guests" error={errors?.numGuests?.message}>
        <Select
          id="numGuests"
          options={numOfGuestsArray}
          {...register('numGuests', { required: 'This field is required.' })}
        />
      </FormGroup>
      <FormButtonBox>
        <Button
          $variation="secondary"
          $size="mediumSmall"
          type="button"
          onTap={reset}
        >
          Reset
        </Button>
        <Button $variation="primary" $size="mediumSmall">
          Create New Booking
        </Button>
      </FormButtonBox>
    </Form>
  );
}

export default WebSearchBungalowForm;
