import Button from '../ui/Button';

import { useRestoreGuests } from '../features/guests/useRestoreGuests.js';
import Spinner from '../ui/Spinner.jsx';
import { useRestoreCabins } from '../features/cabins/useRestoreCabins.js';
import { useRestoreBokings } from '../features/bookings/useRestoreBookings.js';

function Uploader() {
  const { restoreGuests, isGuestsRestoring } = useRestoreGuests();
  const { restoreCabins, isCabinsRestoring } = useRestoreCabins();
  const { restoreBookings, isBookinngsRestoring } = useRestoreBokings();

  const isLoading =
    isGuestsRestoring || isCabinsRestoring || isBookinngsRestoring;

  if (isLoading) return <Spinner />;

  return (
    <div
      style={{
        marginTop: 'auto',
        backgroundColor: '#e0e7ff',
        padding: '8px',
        borderRadius: '5px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
      <h3>SAMPLE DATA</h3>

      <Button
        $variation="blue"
        $size="medium"
        onTap={restoreBookings}
        disabled={isLoading}
      >
        Upload bookings ONLY
      </Button>

      <Button
        $variation="blue"
        $size="medium"
        onTap={restoreGuests}
        disabled={isLoading}
      >
        Upload guests ONLY
      </Button>

      <Button
        $variation="blue"
        $size="medium"
        onTap={restoreCabins}
        disabled={isLoading}
      >
        Upload cabins ONLY
      </Button>
    </div>
  );
}

export default Uploader;
