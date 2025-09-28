import styled from 'styled-components';

import * as locales from 'date-fns/locale';
import { dateFnsLocalizer } from 'react-big-calendar';
import { format, getDay, parse, startOfWeek } from 'date-fns';
import { useCabinOccupaidDays } from '../bookings/useCabinOccupaidDays';
import Spinner from '../../ui/Spinner';
import { useNavigate } from 'react-router';
import TwoMonthCalendar from '../../ui/TwoMounthCalender';
import { device } from '../../styles/bereakingPoints';
import { useMediaQuery } from '../../hooks/useMediaQuery.js';

const EventCalendarContainer = styled.div`
  min-height: 1px;
`;

function CabinEventCalendar({
  cabinId,
  setNewBookingStartDate,
  setNewBookingEndDate,
}) {
  const isTabletorSmaller = useMediaQuery(device.tablet);
  const navigate = useNavigate();
  const { cabinOccupaidDays, isLoading: isCabinOccupaidDaysLoading } =
    useCabinOccupaidDays(cabinId);

  const userLang = navigator.language || 'en-US';
  const localeKey = userLang.split('-')[0];
  const locale = locales[localeKey] || locales.enUS;
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { locale }),
    getDay,
    locales: { [localeKey]: locale },
  });

  const events = cabinOccupaidDays?.map((booking) => {
    return {
      bookingId: booking._id,
      title: booking.guestId.fullName,
      start: new Date(booking.startYmd_user),
      end: new Date(booking.endYmd_user),
      allDay: false,
    };
  });

  const isLoading = isCabinOccupaidDaysLoading;

  if (isLoading) return <Spinner />;

  function handleSelectSlot(slotInfo) {
    setNewBookingStartDate(slotInfo?.start);
    setNewBookingEndDate(slotInfo?.end);
  }

  return (
    <EventCalendarContainer>
      <TwoMonthCalendar
        events={events || []}
        localizer={localizer}
        onDoubleClickEvent={function (event) {
          navigate(`/admin/bookings/${event.bookingId}`);
        }}
        selectionMode="range"
        onChange={handleSelectSlot}
        style={{ minHeight: '65rem' }}
        layout={isTabletorSmaller ? 'row' : 'cols'}
      />
    </EventCalendarContainer>
  );
}

export default CabinEventCalendar;
