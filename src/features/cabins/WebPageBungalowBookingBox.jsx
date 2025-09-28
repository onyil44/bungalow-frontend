import styled from 'styled-components';
import { HiCalendarDateRange } from 'react-icons/hi2';
import Form from '../../ui/Form';
import FormGroup from '../../ui/FormGroup';
import Select from '../../ui/Select';
import Spinner from '../../ui/Spinner';
import { Controller, useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import Button from '../../ui/Button';
import Checkbox from '../../ui/Checkbox';
import {
  calculateDailyPrice,
  calculateDayCount,
  calculateTotalPrice,
  formatCurrency,
  isUserRangeOverlapping,
} from '../../utils/helpers';
import { addDays } from 'date-fns';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import {
  setBungalow,
  setBookingDetails,
  setTotalPrice,
  getBookingDetails,
} from '../bookings/newBookingSlice';
import { useNavigate } from 'react-router';
import { device } from '../../styles/bereakingPoints';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import {
  daysNotAvaliableInTimeZone,
  getUserTimeZone,
  userPickToHotelUtcMidnight,
  utcMidnightToYmdInZone,
} from '../../utils/time';
import { useCabinOccupaidDaysForGuests } from '../bookings/useCabinOccupaidDaysForGuests';

const BookingDetails = styled.div`
  background-color: var(--color-brand-300);

  transition: all 0.2s ease-out;
  overflow: hidden;
`;

const BookingDetailsBody = styled.div`
  display: flex;
  align-items: center;
  padding: 0 4rem;

  gap: 2rem;
  overflow: auto;

  label {
    color: var(--color-grey-50);
  }

  @media ${device.mobileL} {
    flex-direction: column;
    gap: 0;
  }
`;

const TotalPrice = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 0.5rem;

  font-size: 1.8rem;
  color: var(--color-grey-50);

  & span {
    &:first-child {
      font-weight: 600;
    }

    &:last-child {
      font-family: 'Sono';
      font-weight: 500;
      font-style: italic;
    }
  }

  @media ${device.mobileL} {
    margin-bottom: 1rem;
  }
`;

function WebPageBungalowBookingBox({ bungalow, setting }) {
  const registeredBookingDetails = useSelector(getBookingDetails);

  const isTabletSorSmaller = useMediaQuery(device.tabletS);

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

  const { cabinOccupaidDays, isLoading: isCabinOccupaidDaysLoading } =
    useCabinOccupaidDaysForGuests(bungalow?._id);

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

  const { control, watch, register, formState, handleSubmit } = useForm({
    defaultValues: {
      pickedStart: registeredStartDate,
      pickedEnd: registeredEndDate,
      numGuests: Number(registeredBookingDetails.numGuests) || 1,
      hasBreakfast: registeredBookingDetails.hasBreakfast,
    },
  });

  const { pickedStart, pickedEnd, hasBreakfast, numGuests } = watch();

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

  anyOverLappingDays &&
    toast.error(
      'Selected days are not avaliable for this bulgalow. Please change selected days.',
    );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { errors } = formState;

  const numOfGuestsArray = Array.from({ length: bungalow.maxCapacity }).map(
    (_, i) => {
      return { value: i + 1, label: `${i + 1}` };
    },
  );

  const dailyPrice = calculateDailyPrice(bungalow);

  const dayCount = calculateDayCount(pickedStart, pickedEnd);

  const totalPrice = calculateTotalPrice(
    dayCount,
    numGuests,
    dailyPrice,
    setting?.breakfastPrice,
    hasBreakfast,
  );

  const isLoading = isCabinOccupaidDaysLoading;
  if (isLoading) return <Spinner />;

  let maxEndDate = null;

  if (pickedStart) {
    maxEndDate = disabledDates
      .sort((a, b) => a - b)
      .filter((date) => date > pickedStart)
      .at(0);
  }

  function onSubmit(data) {
    if (!dayCount) return toast.error('Please submit valid dates.');

    if (dayCount < setting.minBookingLength)
      return toast.error(
        `Booking length should be higher than ${setting.minBookingLength} days.`,
      );

    if (dayCount > setting.maxBookingLength)
      return toast.error(
        `Booking length should be lower than ${setting.maxBookingLength} days.`,
      );

    dispatch(setBungalow(bungalow));

    dispatch(
      setBookingDetails({
        startDateUtc: userPickToHotelUtcMidnight(
          data.pickedStart,
          getUserTimeZone(),
          process.env.TZ,
        ).toISOString(),
        numNights: dayCount,
        hasBreakfast: data.hasBreakfast,
        numGuests: Number(data.numGuests),
      }),
    );
    dispatch(setTotalPrice({ totalPrice: totalPrice }));

    navigate('/web/newBooking');
  }

  return (
    <BookingDetails>
      <BookingDetailsBody>
        <Form
          columns="repeat(4,1fr) 15rem"
          type="webPageBungalowBookingForm"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormGroup label="Date (from)" error={errors?.pickedStart?.message}>
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
                  popperPlacement="top"
                  minDate={new Date()}
                  startDate={pickedStart ? new Date(pickedStart) : null}
                  endDate={pickedEnd ? new Date(pickedEnd) : null}
                  showDisabledMonthNavigation
                  excludeDates={disabledDates}
                  placeholderText="Start Date"
                  withPortal={isTabletSorSmaller}
                  popperProps={{ strategy: 'fixed' }}
                  shouldCloseOnScroll={false}
                  portalId={isTabletSorSmaller ? 'app-portal' : ''}
                />
              )}
            />
          </FormGroup>
          <FormGroup label="Date (to)" error={errors?.pickedEnd?.message}>
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
                  toggleCalendarOnIconClick
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  dateFormat="dd/MM/yyy"
                  popperPlacement="top"
                  disabled={!pickedStart}
                  minDate={pickedStart ? new Date(pickedStart) : new Date()}
                  maxDate={maxEndDate}
                  startDate={pickedStart ? new Date(pickedStart) : null}
                  endDate={field.value}
                  showDisabledMonthNavigation
                  excludeDates={disabledDates}
                  placeholderText="End Date"
                  withPortal={isTabletSorSmaller}
                  popperProps={{ strategy: 'fixed' }}
                  shouldCloseOnScroll={false}
                  portalId={isTabletSorSmaller ? 'app-portal' : ''}
                />
              )}
            />
          </FormGroup>
          <FormGroup
            label="Number of Guests"
            error={errors?.numGuests?.message}
          >
            <Select
              id="numGuests"
              options={numOfGuestsArray}
              {...register('numGuests', {
                required: 'This field is requirted.',
              })}
            />
          </FormGroup>
          <Checkbox
            type="webPageBungalowBookingCheckBox"
            id="hasBreakfast"
            {...register('hasBreakfast')}
          >
            Want breakfast? ({formatCurrency(setting.breakfastPrice)})
          </Checkbox>
          <div className="button-box">
            <Button
              $variation="primary"
              $size="mediumSmall"
              disabled={anyOverLappingDays}
            >
              New Booking
            </Button>
          </div>
        </Form>
        <TotalPrice>
          <span>Total Price</span>
          <span>{formatCurrency(totalPrice)}</span>
        </TotalPrice>
      </BookingDetailsBody>
    </BookingDetails>
  );
}

export default WebPageBungalowBookingBox;
