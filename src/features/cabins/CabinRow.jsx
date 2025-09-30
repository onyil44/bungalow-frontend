import { useRef } from 'react';

import styled from 'styled-components';
import {
  HiMiniCalendarDateRange,
  HiMiniEye,
  HiPencil,
  HiTrash,
} from 'react-icons/hi2';

import { useDeleteCabin } from './useDeleteCabin.js';
import { formatCurrency } from '../../utils/helpers.js';

import Modal from '../../ui/Modal.jsx';
import ConfirmAction from '../../ui/ConfirmAction.jsx';
import CreateCabinForm from './CreateCabinForm.jsx';
import Table from '../../ui/Table.jsx';
import Menus from '../../ui/Menus.jsx';
import { useNavigate } from 'react-router';
import { useMediaQuery } from '../../hooks/useMediaQuery.js';
import { device } from '../../styles/bereakingPoints.js';
import { ENV } from '../../../config/env.js';

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const navigate = useNavigate();
  const duplicateModalCloseRef = useRef();

  const { isDeleting, deleteCabin } = useDeleteCabin();
  const isMobileLorSmaller = useMediaQuery(device.mobileL);

  const {
    _id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;

  function handleDeleteCabin() {
    deleteCabin(cabinId);
  }

  return (
    <>
      <Table.Row>
        <Img src={ENV.APP_URL + 'data' + image} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        {isMobileLorSmaller ? null : (
          <>
            {' '}
            <Price>{formatCurrency(regularPrice)}</Price>
            {discount ? (
              <Discount>{formatCurrency(discount)}</Discount>
            ) : (
              <span>&mdash;</span>
            )}
          </>
        )}

        <Modal ref={duplicateModalCloseRef}>
          <Menus.Menu>
            <Menus.Toogle id={cabinId} />

            <Menus.List id={cabinId}>
              <Menus.Button
                icon={<HiMiniEye />}
                onClick={() => navigate(`/admin/cabins/${cabinId}`)}
              >
                Details
              </Menus.Button>

              <Modal.Open opens="edit-cabin">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Menus.Button
                icon={<HiMiniCalendarDateRange />}
                onClick={() => {
                  navigate(`/admin/bookings?cabinId=${cabinId}`);
                }}
              >
                Bookings
              </Menus.Button>

              <Modal.Open opens="delete-cabin">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit-cabin">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            <Modal.Window name="delete-cabin">
              <ConfirmAction
                action="delete"
                resourceName={cabin.name}
                onConfirm={handleDeleteCabin}
                disabled={isDeleting}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </Table.Row>
    </>
  );
}

export default CabinRow;
