import { useParams } from 'react-router';
import CabinDataBox from './CabinDataBox';
import CabinEventCalendar from './CabinEventCalendar';
import { useCabin } from './useCabin';
import Spinner from '../../ui/Spinner';
import Modal from '../../ui/Modal';
import CreateNewBokingForm from '../bookings/CreateNewBokingForm';
import { useRef, useState } from 'react';
import Button from '../../ui/Button';
import { differenceInDays } from 'date-fns';
import { useSettings } from '../settings/useSettings';

function CabinDetail() {
  const { cabinId } = useParams();
  const { cabin, isCabinLoading } = useCabin(cabinId);
  const { settings, isPending: isSettingsLoading } = useSettings();

  const [newBookingStartDate, setNewBookingStartDate] = useState(null);
  const [newBookingEndDate, setNewBookingEndDate] = useState(null);
  const newBookingNumNights =
    newBookingStartDate &&
    newBookingEndDate &&
    differenceInDays(newBookingEndDate, newBookingStartDate) > 0
      ? differenceInDays(newBookingEndDate, newBookingStartDate)
      : null;

  const closeModalRef = useRef();

  const isLoading = isCabinLoading || isSettingsLoading;

  if (isLoading) return <Spinner />;

  const setting = settings.find((setting) => setting.isActive);

  return (
    <>
      <CabinDataBox cabin={cabin} />
      <CabinEventCalendar
        cabinId={cabinId}
        setNewBookingEndDate={setNewBookingEndDate}
        setNewBookingStartDate={setNewBookingStartDate}
      />
      <Modal ref={closeModalRef}>
        <Modal.Open opens="create-new-booking">
          <Button
            $variation="brand-soft"
            $size="medium"
            type="button"
            disabled={
              !newBookingNumNights ||
              newBookingNumNights < setting.minBookingLength
            }
          >
            {!newBookingNumNights && 'Please select dates. '}
            {newBookingNumNights < setting.minBookingLength &&
              `Minimum booking ${setting.minBookingLength} nights.`}
            {newBookingNumNights >= setting.minBookingLength &&
              `Create New Booking (${newBookingNumNights} nights)`}
          </Button>
        </Modal.Open>
        <Modal.Window name="create-new-booking">
          <CreateNewBokingForm
            bungalow={cabin}
            bookingData={{
              cabinId: cabin._id,
              pickedStart: newBookingStartDate,
              pickedEnd: newBookingEndDate,
              numNights: newBookingNumNights,
            }}
          />
        </Modal.Window>
      </Modal>
    </>
  );
}

export default CabinDetail;
