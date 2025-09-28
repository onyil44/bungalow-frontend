import styled from 'styled-components';
import { useRecentBookings } from './useRecentBookings';
import { useCabins } from '../cabins/useCabins';
import Spinner from '../../ui/Spinner';
import { useRecentStays } from './useRecentStays';
import Stats from './Stats';
import SalesChart from './SalesChart';
import { useDailyBookingStats } from './useDailyBookingStats';
import DurationChart from './DurationChart';
import TodayActivity from '../check-in-out/TodayActivity';
import { device } from '../../styles/bereakingPoints';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;

  @media ${device.tabletL} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-rows: none;
  }
`;

function DashboardLayout() {
  const { bookings, isRecentBookingsLoading } = useRecentBookings();
  const { confirmedStays, isStaysLoading, numDays } = useRecentStays();
  const { cabins, isPending: isCabinsLoading } = useCabins();
  const { stats, isDailyBookingStatsLoading } = useDailyBookingStats();

  const isLoading =
    isRecentBookingsLoading ||
    isStaysLoading ||
    isCabinsLoading ||
    isDailyBookingStatsLoading;

  if (isLoading) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart stats={stats} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
