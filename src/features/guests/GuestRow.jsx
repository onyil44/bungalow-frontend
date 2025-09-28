import styled from 'styled-components';

import Table from '../../ui/Table';

import Menus from '../../ui/Menus';
import { HiEye, HiOutlineCalendarDays, HiPencilSquare } from 'react-icons/hi2';
import { useNavigate } from 'react-router';
import Modal from '../../ui/Modal';
import { useRef } from 'react';
import CreateGuestForm from './CreateGuestForm';

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

const Nationality = styled.div`
  text-transform: capitalize;
`;

function GuestRow({ guest }) {
  const navigate = useNavigate();
  const closeModal = useRef();

  const {
    _id: guestId,
    created_at,
    fullName,
    email,
    nationality,
    nationalId,
  } = guest;

  return (
    <Table.Row>
      <Stacked>
        <span>{fullName}</span>
        <span>{email}</span>
      </Stacked>
      <Nationality>{nationality}</Nationality>
      <div>{nationalId}</div>

      <Modal ref={closeModal}>
        <Menus.Menu>
          <Menus.Toogle id={guestId} />
          <Menus.List id={guestId}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/admin/guests/${guestId}`)}
            >
              Details
            </Menus.Button>

            <Modal.Open opens="update-guest">
              <Menus.Button icon={<HiPencilSquare />}>Edit</Menus.Button>
            </Modal.Open>

            <Menus.Button
              icon={<HiOutlineCalendarDays />}
              onClick={() => navigate(`/admin/bookings?guestId=${guestId}`)}
            >
              Bookings
            </Menus.Button>
          </Menus.List>

          <Modal.Window name="update-guest">
            <CreateGuestForm guestToUpdate={guest} />
          </Modal.Window>
        </Menus.Menu>
      </Modal>
    </Table.Row>
  );
}

export default GuestRow;
