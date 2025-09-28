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
import { fromUnixTime } from 'date-fns';
import { useURL } from '../../hooks/useURL';
import { useSettings } from '../settings/useSettings';
import { useMediaQuery } from '../../hooks/useMediaQuery.js';
import { device } from '../../styles/bereakingPoints';
import { calculateDayCount } from '../../utils/helpers.js';

function WebPageSearchBungalowForm() {
  const isTabletSorSmaller = useMediaQuery(device.tabletS);
  const { getURLParams, setURLParams, resetURLParams } = useURL();

  const [paramsStartDate, paramsEndDate, paramsNumGuests] = [
    getURLParams('startDate') ? fromUnixTime(getURLParams('startDate')) : null,
    getURLParams('endDate') ? fromUnixTime(getURLParams('endDate')) : null,
    +getURLParams('numGuests'),
  ];
  const { cabins, isPending: isCabinsLoading } = useCabins();
  const { settings, isLoading: isSettingsLoading } = useSettings();

  const { register, control, formState, watch, handleSubmit, reset } = useForm({
    defaultValues: {
      startDate: paramsStartDate,
      endDate: paramsEndDate,
      numGuests: paramsNumGuests,
    },
  });

  const { errors } = formState;

  const { endDate, startDate } = watch();

  const isLoading = isCabinsLoading || isSettingsLoading;

  if (isLoading) return <Spinner />;

  const setting = settings?.find((setting) => setting.isActive);

  const dayCount = calculateDayCount(startDate, endDate);

  const maxGuest = Math.max(...cabins.map((cabin) => cabin.maxCapacity));

  const numOfGuestsArray = Array.from({ length: maxGuest }).map((_, i) => {
    return { value: i + 1, label: `${i + 1}` };
  });

  function onSubmit(data) {
    setURLParams('startDate', new Date(data.startDate).getTime() / 1000);
    setURLParams('endDate', new Date(data.endDate).getTime() / 1000);
    setURLParams('numGuests', data.numGuests);
  }

  return (
    <Form
      columns="repeat(3, 1fr)"
      type="webPageSearchForm"
      onSubmit={handleSubmit(onSubmit)}
      $paddingy={10}
    >
      <FormGroup label="Date (from)" error={errors?.startDate?.message}>
        <Controller
          control={control}
          name="startDate"
          rules={{
            validate: (value) => {
              if (endDate && value) {
                return (
                  value < endDate || 'Start date should be before end date.'
                );
              }
            },
            required: 'This field is required.',
          }}
          render={({ field }) => (
            <DatePicker
              showIcon
              selectsStart
              maxDate={endDate}
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
              if (startDate && value && startDate >= value) {
                return 'End date should be after the start date.';
              }

              if (dayCount && value && setting?.minBookingLength > dayCount) {
                return `Booking length should be higher than ${setting?.minBookingLength} days.`;
              }

              return true;
            },
            required: 'This field is required.',
          }}
          render={({ field }) => (
            <DatePicker
              showIcon
              selectsEnd
              minDate={startDate}
              disabled={!startDate}
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
          onTap={() => {
            resetURLParams();
            reset({
              startDate: null,
              endDate: null,
              numGuests: 1,
            });
          }}
        >
          Reset
        </Button>
        <Button $variation="primary" $size="mediumSmall">
          Search
        </Button>
      </FormButtonBox>
    </Form>
  );
}

export default WebPageSearchBungalowForm;
