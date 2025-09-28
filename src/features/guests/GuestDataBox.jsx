import styled from 'styled-components';
import { HiMiniUserGroup } from 'react-icons/hi2';

import Modal from '../../ui/Modal';
import Button from '../../ui/Button';
import CreateGuestForm from './CreateGuestForm';
import { useNavigate } from 'react-router';

const StyledGuestDataBox = styled.section`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  overflow: hidden;
`;

const Header = styled.header`
  background-color: var(--color-brand-500);
  padding: 1.5rem 3rem;
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    height: 3.2rem;
    width: 3.2rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.8rem;
  }

  & span {
    font-family: 'Sono';
    font-size: 2rem;
    margin-left: 4px;
  }
`;

const Section = styled.section`
  padding: 2.4rem;
  display: flex;
  flex-direction: column;
`;

const SectionRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
    padding-bottom: 1.2rem;
  }

  &:not(:first-child) {
    padding-top: 1.2rem;
  }
`;

const HeaderButtons = styled.div`
  display: flex;
  gap: 1.2rem;
`;

const Label = styled.p`
  font-weight: 500;
`;

const Info = styled.p`
  font-weight: 400;
`;

const NationalityInfo = styled.p`
  font-weight: 400;
  text-transform: capitalize;
`;

// A purely presentational component
function GuestDataBox({ guest }) {
  const {
    _id: guestId,
    fullName,
    email,
    nationality,
    nationalId,
    createdAt,
  } = guest;

  const navigate = useNavigate();

  return (
    <StyledGuestDataBox>
      <Header>
        <div>
          <HiMiniUserGroup />
          <p>Guest Info</p>
        </div>
        <HeaderButtons>
          <Modal>
            <Modal.Open opens="update-guest">
              <Button $size="mediumSmall" $variation="edit">
                Edit
              </Button>
            </Modal.Open>
            <Modal.Window name="update-guest">
              <CreateGuestForm guestToUpdate={guest} />
            </Modal.Window>
          </Modal>
          <Button
            $size="mediumSmall"
            $variation="secondary"
            type="button"
            onTap={() => navigate(`/admin/bookings?guestId=${guestId}`)}
          >
            Bookings
          </Button>
        </HeaderButtons>
      </Header>

      <Section>
        <SectionRow>
          <Label>Full Name</Label>
          <Info>{fullName}</Info>
        </SectionRow>
        <SectionRow>
          <Label>Email</Label>
          <Info>{email}</Info>
        </SectionRow>
        <SectionRow>
          <Label>Nationality</Label>
          <NationalityInfo>{nationality}</NationalityInfo>
        </SectionRow>
        <SectionRow>
          <Label>National Id</Label>
          <Info>{nationalId}</Info>
        </SectionRow>
      </Section>
    </StyledGuestDataBox>
  );
}

export default GuestDataBox;
