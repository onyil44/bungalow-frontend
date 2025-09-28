import { useEffect, useMemo, useRef } from 'react';
import SearchBox from '../../ui/SearchBox.jsx';
import Heading from '../../ui/Heading.jsx';
import { Controller, useForm } from 'react-hook-form';
import { useCabins } from '../cabins/useCabins';
import Select from '../../ui/Select.jsx';
import ReactSelect from 'react-select';
import Spinner from '../../ui/Spinner.jsx';
import DatePicker from 'react-datepicker';
import { HiCalendarDateRange } from 'react-icons/hi2';
import { useMediaQuery } from '../../hooks/useMediaQuery.js';
import { device } from '../../styles/bereakingPoints.js';
import { useCabinOccupaidDays } from './useCabinOccupaidDays.js';
import {
  createNumGuestArray,
  isUserRangeOverlapping,
} from '../../utils/helpers.js';
import toast from 'react-hot-toast';
import SpinnerMini from '../../ui/SpinnerMini.jsx';
import { useURL } from '../../hooks/useURL.js';
import { fromUnixTime } from 'date-fns';
import { useLocation } from 'react-router';
import BungalowSelect from '../../ui/BungalowSelect.jsx';
import { daysNotAvaliableInTimeZone } from '../../utils/time.js';

function NewBookingSearchOperations() {
  const { search } = useLocation();
  const isTabletorSmaller = useMediaQuery(device.tablet);
  const isTabletSorSmaller = useMediaQuery(device.tabletS);

  const { getURLParams, setURLParams, resetURLParams, deleteURLParams } =
    useURL();

  const { cabins, isPending: isBungalowsLoading } = useCabins();

  const closeRef = useRef();

  const {
    control,
    formState,
    handleSubmit,
    watch,
    setValue,
    reset: resetForm,
  } = useForm({
    defaultValues: {
      cabinId: [],
      startDate: null,
      endDate: null,
      numGuests: 1,
    },
  });

  let { cabinId, startDate, endDate } = watch();

  const startDateFromUrl = useMemo(
    () =>
      getURLParams('startDate')
        ? fromUnixTime(Number(getURLParams('startDate')))
        : null,
    [search],
  );

  const endDateFromUrl = useMemo(
    () =>
      getURLParams('endDate')
        ? fromUnixTime(Number(getURLParams('endDate')))
        : null,
    [search],
  );

  const numGuestsFromUrl = useMemo(
    () =>
      getURLParams('numGuests') ? Number(getURLParams('numGuests')) : null,
    [search],
  );

  useEffect(
    function () {
      startDateFromUrl
        ? setValue('startDate', startDateFromUrl)
        : setValue('startDate', null);

      endDateFromUrl
        ? setValue('endDate', endDateFromUrl)
        : setValue('endDate', null);

      numGuestsFromUrl
        ? setValue('numGuests', numGuestsFromUrl)
        : setValue('numGuests', 1);
    },

    [startDateFromUrl, endDateFromUrl, numGuestsFromUrl, setValue],
  );

  const { cabinOccupaidDays, isLoading: isCabinOccupaidDaysLoading } =
    useCabinOccupaidDays(cabinId?.length === 1 ? cabinId.at(0).value : null);

  const { errors } = formState;

  const anyOverLappingDays =
    cabinOccupaidDays && startDate && endDate
      ? isUserRangeOverlapping(
          startDate,
          endDate,
          process.env.TZ,
          process.env.TZ,
          cabinOccupaidDays,
        )
      : false;

  anyOverLappingDays &&
    toast.error(
      'Selected days are not avaliable for this bulgalow. Please change selected days.',
    );

  useEffect(
    function () {
      anyOverLappingDays &&
        toast.error(
          'Selected days are not avaliable for this bulgalow. Please change selected days or bungalow.',
        );
    },
    [anyOverLappingDays],
  );

  const isLodaing = isBungalowsLoading;

  let numOfGuestsArray = createNumGuestArray(
    cabins?.sort((a, b) => b.maxCapacity - a.maxCapacity).at(0),
  );

  if (cabinId?.length === 1 && cabins) {
    numOfGuestsArray = createNumGuestArray(
      cabins.find((cabin) => cabin._id === cabinId.at(0).value),
    );
  } else if (cabinId?.length > 1 && cabins) {
    numOfGuestsArray = createNumGuestArray(
      cabins
        .filter((cabin) => cabinId.map((el) => el.value).includes(cabin._id))
        .sort((a, b) => b.maxCapacity - a.maxCapacity)
        .at(0),
    );
  }

  if (isLodaing) return <Spinner />;

  let maxEndDate = null;

  const disabledDates =
    cabinOccupaidDays
      ?.flatMap((cod) =>
        daysNotAvaliableInTimeZone(
          cod.startDateUtc,
          cod.numNights,
          process.env.TZ,
        ),
      )
      .map((date) => new Date(date)) || [];

  if (startDate) {
    maxEndDate = disabledDates
      .sort((a, b) => a - b)
      .filter((date) => date > startDate)
      .at(0);
  }

  function onSubmit(data) {
    data.cabinId.length > 0
      ? setURLParams('cabinId', data.cabinId.map((el) => el.value).join('|'))
      : deleteURLParams('cabinId');
    data.startDate
      ? setURLParams('startDate', Math.floor(data.startDate.getTime() / 1000))
      : deleteURLParams('startDate');
    data.endDate
      ? setURLParams('endDate', Math.floor(data.endDate.getTime() / 1000))
      : deleteURLParams('endDate');
    data.numGuests
      ? setURLParams('numGuests', data.numGuests)
      : deleteURLParams('numGuests');
  }

  function reset() {
    resetURLParams();
    resetForm();
  }

  return (
    <SearchBox
      columns={isTabletorSmaller ? 'repeat(2,1fr)' : 'repeat(4,1fr)'}
      ref={closeRef}
      reset={reset}
      disabledCondition={anyOverLappingDays}
    >
      <SearchBox.Header>
        <Heading as="h4"> Search Cabins For New Booking</Heading>
      </SearchBox.Header>
      <SearchBox.Body>
        <SearchBox.Form onSubmit={handleSubmit(onSubmit)}>
          <SearchBox.FormGroup
            label="Bungalow"
            error={errors?.cabinId?.message}
          >
            <BungalowSelect
              control={control}
              setValue={setValue}
              name="cabinId"
            />
          </SearchBox.FormGroup>
          <SearchBox.FormGroup
            label="Date (from)"
            error={errors?.startDate?.message}
          >
            {isCabinOccupaidDaysLoading && <SpinnerMini />}
            {!isCabinOccupaidDaysLoading && (
              <Controller
                control={control}
                name="startDate"
                rules={{ required: 'This field is required' }}
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
                    minDate={new Date()}
                    startDate={startDate ? new Date(startDate) : null}
                    endDate={endDate ? new Date(endDate) : null}
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
          </SearchBox.FormGroup>
          <SearchBox.FormGroup
            label="Date (to)"
            error={errors?.endDate?.message}
          >
            {isCabinOccupaidDaysLoading && <SpinnerMini />}
            {!isCabinOccupaidDaysLoading && (
              <Controller
                control={control}
                name="endDate"
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
                    disabled={!startDate}
                    minDate={startDate ? new Date(startDate) : new Date()}
                    maxDate={maxEndDate}
                    startDate={startDate ? new Date(startDate) : null}
                    endDate={endDate ? new Date(endDate) : null}
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
          </SearchBox.FormGroup>
          <SearchBox.FormGroup
            label="Number of Guests"
            error={errors?.numGuests?.message}
          >
            {isCabinOccupaidDaysLoading && <SpinnerMini />}
            {!isCabinOccupaidDaysLoading && (
              <Controller
                control={control}
                name="numGuests"
                rules={{ required: 'This field is required.' }}
                render={({ field }) => (
                  <Select
                    {...field}
                    id="numGuests"
                    options={numOfGuestsArray}
                    disabled={numOfGuestsArray.length <= 0}
                  />
                )}
              />
            )}
          </SearchBox.FormGroup>
        </SearchBox.Form>
      </SearchBox.Body>
    </SearchBox>
  );
}

export default NewBookingSearchOperations;
