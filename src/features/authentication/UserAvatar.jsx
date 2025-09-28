import styled from 'styled-components';
import { useCurrentUser } from './useCurrentUser';
import { device } from '../../styles/bereakingPoints';

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);

  @media ${device.mobileL} {
    & span {
      display: none;
    }
  }
`;

const Avatar = styled.img`
  display: block;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--color-brand-600);
`;

const UserName = styled.span`
  font-size: 1.4rem;
`;

const UserRole = styled.span`
  text-transform: uppercase;
  font-size: 1rem;
  font-weight: 900;
  margin-top: -0.4rem;
`;

function UserAvatar() {
  const { user } = useCurrentUser();

  const avatarSrc = user?.avatar
    ? process.env.APP_URL + 'data' + user.avatar
    : process.env.APP_URL + 'data/public' + '/default-user.jpg';

  return (
    <StyledUserAvatar>
      <Avatar src={avatarSrc} alt={`Avatar of ${user?.fullname}`} />
      <UserDetails>
        <UserName>{user?.fullName}</UserName>
        <UserRole>{user?.role}</UserRole>
      </UserDetails>
    </StyledUserAvatar>
  );
}

export default UserAvatar;
