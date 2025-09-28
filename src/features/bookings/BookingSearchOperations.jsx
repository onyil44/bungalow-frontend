import Heading from '../../ui/Heading';
import SearchBox from '../../ui/SearchBox';

import DatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import { HiCalendarDays } from 'react-icons/hi2';
import { useURL } from '../../hooks/useURL';
import { useEffect, useMemo, useRef } from 'react';
import GuestSelect from '../../ui/GuestSelect';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { device } from '../../styles/bereakingPoints';
import BungalowSelect from '../../ui/BungalowSelect';
import { useLocation } from 'react-router';
import { fromUnixTime } from 'date-fns';
import { getUserTimeZone, userPickToHotelUtcMidnight } from '../../utils/time';

function BookingSearchOperations() {
  const isTabletSorSmaller = useMediaQuery(device.tabletS);
  const closeSearchBox = useRef();
  const { search } = useLocation();

  const {
    formState,
    watch,
    handleSubmit,
    control,
    reset: resetForm,
    setValue,
  } = useForm({
    defaultValues: { cabinId: [], startDate: null, endDate: null, guestId: [] },
  });

  const { setURLParams, deleteURLParams, getURLParams, resetURLParams } =
    useURL();
  const isTabletLorSmaller = useMediaQuery(device.tabletL);

  const startDateFromUrl = useMemo(
    () =>
      getURLParams('startDateUtc[gte]')
        ? fromUnixTime(
            Math.floor(Number(getURLParams('startDateUtc[gte]')) / 1000),
          )
        : null,
    [search],
  );

  const endDateFromUrl = useMemo(
    () =>
      getURLParams('endDateUtc[lte]')
        ? fromUnixTime(
            Math.floor(Number(getURLParams('endDateUtc[lte]')) / 1000),
          )
        : null,
    [search],
  );

  useEffect(
    function () {
      startDateFromUrl
        ? setValue('startDateUtc', startDateFromUrl)
        : setValue('startDateUtc', null);

      endDateFromUrl
        ? setValue('endDateUtc', endDateFromUrl)
        : setValue('endDateUtc', null);
    },

    [startDateFromUrl, endDateFromUrl, setValue],
  );

  const { errors } = formState;

  function onSubmit(data) {
    data.cabinId.length > 0
      ? setURLParams('cabinId', data.cabinId?.map((el) => el.value).join('|'))
      : deleteURLParams('cabinId');

    data.startDate
      ? setURLParams(
          'startDateUtc[gte]',
          userPickToHotelUtcMidnight(
            data.startDate,
            getUserTimeZone(),
            process.env.TZ,
          ).getTime(),
        )
      : deleteURLParams('startDateUtc[gte]');

    data.endDate
      ? setURLParams(
          'endDateUtc[lte]',
          userPickToHotelUtcMidnight(
            data.endDate,
            getUserTimeZone(),
            process.env.TZ,
          ).getTime(),
        )
      : deleteURLParams('endDateUtc[lte]');

    data.guestId.length > 0
      ? setURLParams('guestId', data.guestId?.map((g) => g.value).join('|'))
      : deleteURLParams('guestId');

    closeSearchBox.current.close();
  }

  let grid = {
    searchBoxColumns: 'repeat(5,1fr)',
    cabinSpan: 1,
    startDateSpan: 1,
    endDateSpan: 1,
    guestSpan: 2,
  };

  if (isTabletLorSmaller)
    grid = {
      searchBoxColumns: 'repeat(2,1fr)',
      cabinSpan: 1,
      startDateSpan: 1,
      endDateSpan: 1,
      guestSpan: 1,
    };

  function reset() {
    resetURLParams();
    resetForm();
  }

  return (
    <SearchBox
      columns={grid.searchBoxColumns}
      dropDownOption={true}
      ref={closeSearchBox}
      reset={reset}
    >
      <SearchBox.Header>
        <Heading as="h4">Search Bookings</Heading>
      </SearchBox.Header>

      <SearchBox.Body>
        <SearchBox.Form onSubmit={handleSubmit(onSubmit)}>
          <SearchBox.FormGroup
            label="Bungalow"
            gridspan={grid.cabinSpan}
            error={errors?.cabinId?.message}
          >
            <BungalowSelect
              control={control}
              setValue={setValue}
              name="cabinId"
            />
          </SearchBox.FormGroup>

          <SearchBox.FormGroup label="Guest Name" gridspan={grid.guestSpan}>
            <GuestSelect name="guestId" control={control} />
          </SearchBox.FormGroup>

          <SearchBox.FormGroup
            label="Date (from)"
            error={errors?.startDate?.message}
            gridspan={grid.startDateSpan}
          >
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
              }}
              render={({ field }) => (
                <DatePicker
                  showIcon
                  selectsStart
                  maxDate={watch().endDate}
                  icon={<HiCalendarDays />}
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  dateFormat="dd/MM/yyyy"
                  popperPlacement="bottom"
                  withPortal={isTabletSorSmaller}
                  popperProps={{ strategy: 'fixed' }}
                  shouldCloseOnScroll={false}
                  portalId={isTabletSorSmaller ? 'app-portal' : ''}
                />
              )}
            />
          </SearchBox.FormGroup>

          <SearchBox.FormGroup
            label="Date (to)"
            error={errors?.endDate?.message}
            gridspan={grid.endDateSpan}
          >
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
              }}
              render={({ field }) => (
                <DatePicker
                  showIcon
                  selectsEnd
                  minDate={watch().startDate}
                  icon={<HiCalendarDays />}
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  dateFormat="dd/MM/yyyy"
                  popperPlacement="bottom"
                  withPortal={isTabletSorSmaller}
                  popperProps={{ strategy: 'fixed' }}
                  shouldCloseOnScroll={false}
                  portalId={isTabletSorSmaller ? 'app-portal' : ''}
                />
              )}
            />
          </SearchBox.FormGroup>
        </SearchBox.Form>
      </SearchBox.Body>
    </SearchBox>
  );
}

export default BookingSearchOperations;
