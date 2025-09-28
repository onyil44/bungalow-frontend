import styled from 'styled-components';
import { format, isToday } from 'date-fns';

import Tag from '../../ui/Tag';
import Table from '../../ui/Table';

import { formatCurrency } from '../../utils/helpers';
import { formatDistanceFromNow } from '../../utils/helpers';
import Menus from '../../ui/Menus';
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiPencilSquare,
  HiTrash,
} from 'react-icons/hi2';
import { useNavigate } from 'react-router';
import Modal from '../../ui/Modal';
import ConfirmAction from '../../ui/ConfirmAction';
import { useUpdateBooking } from './useUpdateBooking';
import { useRef } from 'react';
import { useDeleteBooking } from './useDeleteBooking';
import UpdateBookingForm from './UpdateBookingForm';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { device } from '../../styles/bereakingPoints';

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';

  /* for long texts */
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    word-break: break-all;
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
`;

function BookingRow({ booking }) {
  const navigate = useNavigate();
  const closeModal = useRef();

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  const { updateBooking, isUpdating } = useUpdateBooking();
  const { deleteBooking, isDeleting } = useDeleteBooking();

  const isTabletorSmaller = useMediaQuery(device.tablet);
  const isMobileLorSmaller = useMediaQuery(device.mobileL);
  const {
    _id: bookingId,
    startYmd_user,
    endYmd_user,
    numNights,
    totalPrice,
    status,
    guestId: { fullName: guestName, email },
    cabinId: { name: cabinName },
  } = booking;

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
        closeModal?.current?.close();
      },
    });
  }

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startYmd_user))
            ? 'Today'
            : formatDistanceFromNow(startYmd_user)}{' '}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startYmd_user), 'MMM dd yyyy')} &mdash;{' '}
          {format(new Date(endYmd_user), 'MMM dd yyyy')}
        </span>
      </Stacked>

      {isMobileLorSmaller ? null : (
        <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
      )}

      {isTabletorSmaller ? null : <Amount>{formatCurrency(totalPrice)}</Amount>}
      <Modal ref={closeModal}>
        <Menus.Menu>
          <Menus.Toogle id={bookingId} />
          <Menus.List id={bookingId}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/admin/bookings/${bookingId}`)}
            >
              Details
            </Menus.Button>

            {status === 'unconfirmed' && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/admin/checkin/${bookingId}`)}
              >
                Check in
              </Menus.Button>
            )}

            {status === 'checked-in' && (
              <Modal.Open opens="checked-out-modal">
                <Menus.Button icon={<HiArrowUpOnSquare />}>
                  Check out
                </Menus.Button>
              </Modal.Open>
            )}

            <Modal.Open opens="delete-booking">
              <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
            </Modal.Open>

            <Modal.Open opens="update-booking">
              <Menus.Button icon={<HiPencilSquare />}>Edit</Menus.Button>
            </Modal.Open>
          </Menus.List>

          <Modal.Window name="checked-out-modal">
            <ConfirmAction
              action="checking-out"
              resourceName={bookingId}
              onConfirm={handleCheckOut}
              disabled={isUpdating}
            />
          </Modal.Window>

          <Modal.Window name="delete-booking">
            <ConfirmAction
              action="delete"
              onConfirm={handleDeleteBooking}
              disabled={isDeleting}
              resourceName={bookingId}
            />
          </Modal.Window>

          <Modal.Window name="update-booking">
            <UpdateBookingForm bookingToUpdate={booking} />
          </Modal.Window>
        </Menus.Menu>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
