import styled from 'styled-components';

import BookingDataBox from './BookingDataBox';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Tag from '../../ui/Tag';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';

import { useMoveBack } from '../../hooks/useMoveBack';
import { useBooking } from './useBooking';
import Spinner from '../../ui/Spinner';
import { useNavigate } from 'react-router';
import Modal from '../../ui/Modal';
import ConfirmAction from '../../ui/ConfirmAction';
import { useUpdateBooking } from './useUpdateBooking';
import { useRef } from 'react';
import { useDeleteBooking } from './useDeleteBooking';
import UpdateBookingForm from './UpdateBookingForm';
import Empty from '../../ui/Empty';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useBooking();
  const { updateBooking, isUpdating } = useUpdateBooking();
  const { deleteBooking, isDeleting } = useDeleteBooking();
  const navigate = useNavigate();
  const { closeModal } = useRef();

  const moveBack = useMoveBack();

  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resourceName="booking" />;

  const { status, _id: bookingId, pnrCode } = booking;

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  function handleCheckOut() {
    if (status !== 'checked-in') return;
    updateBooking(
      { bookingId, status: 'checked-out' },
      {
        onSuccess: () => {
          closeModal?.current?.close();
        },
      },
    );
  }

  function handleDeleteBooking() {
    deleteBooking(bookingId, {
      onSuccess: () => {
        navigate('/admin/bookings');
      },
    });
  }

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking PNR Code {pnrCode}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
        </HeadingGroup>
        <ButtonText onTap={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Modal ref={closeModal}>
          {status === 'checked-in' && (
            <>
              <Modal.Open opens="checked-out-modal">
                <Button $variation="blue" $size="medium">
                  Checked Out
                </Button>
              </Modal.Open>
              <Modal.Window name="checked-out-modal">
                <ConfirmAction
                  action="checking-out"
                  onConfirm={handleCheckOut}
                  resourceName={bookingId}
                  disabled={isUpdating}
                />
              </Modal.Window>
            </>
          )}
          {status === 'unconfirmed' && (
            <Button
              $variation="blue"
              $size="medium"
              disabled={status === 'checked-in'}
              onTap={() => navigate(`/admin/checkin/${bookingId}`)}
            >
              Check In
            </Button>
          )}

          <Modal.Open opens="update-booking">
            <Button $variation="edit" $size="medium">
              Edit
            </Button>
          </Modal.Open>
          <Modal.Window name="update-booking">
            <UpdateBookingForm bookingToUpdate={booking} />
          </Modal.Window>

          <Modal.Open opens="delete-booking">
            <Button $variation="danger" $size="medium">
              Delete
            </Button>
          </Modal.Open>
          <Modal.Window name="delete-booking">
            <ConfirmAction
              action="delete"
              onConfirm={handleDeleteBooking}
              resourceName={bookingId}
              disabled={isDeleting}
            />
          </Modal.Window>

          <Button $variation="secondary" onTap={moveBack} $size="medium">
            Back
          </Button>
        </Modal>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
