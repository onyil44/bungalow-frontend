import styled from 'styled-components';
import Table from '../../ui/Table';
import Tag from '../../ui/Tag';
import Menus from '../../ui/Menus';
import { HiPencilSquare } from 'react-icons/hi2';
import Modal from '../../ui/Modal';
import CreateUserForm from './CreateUserForm';
import { useRef } from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { device } from '../../styles/bereakingPoints';

const FullName = styled.div`
  font-size: 1.6rem;
  color: var(--color-grey-600);
`;

const Email = styled.div`
  word-break: break-all;
`;

function UserRow({ user }) {
  const isMobileLorSmaller = useMediaQuery(device.mobileL);

  const { _id: userId, fullName, email, role, isActive } = user;
  const closeModal = useRef();

  return (
    <Table.Row>
      <FullName>{fullName}</FullName>
      <Email>{email}</Email>
      {isMobileLorSmaller ? null : <div>{role}</div>}
      <Tag type={isActive ? 'green' : 'silver'}>
        {isActive ? 'Active' : 'Passive'}
      </Tag>

      <Modal ref={closeModal}>
        <Menus.Menu>
          <Menus.Toogle id={userId} />
          <Menus.List id={userId}>
            <Modal.Open opens="update-user">
              <Menus.Button icon={<HiPencilSquare />}>Edit</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="update-user">
          <CreateUserForm userToUpdate={user} />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default UserRow;
