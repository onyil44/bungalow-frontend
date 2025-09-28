import styled from 'styled-components';
import { device } from '../../styles/bereakingPoints';
import {
  HiMiniCurrencyDollar,
  HiOutlineHomeModern,
  HiUserGroup,
} from 'react-icons/hi2';
import { formatCurrency } from '../../utils/helpers';

const StyledBungalowDataBox = styled.section`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-brand-500);
  border-radius: var(--border-radius-md);

  overflow: hidden;
`;

const Header = styled.header`
  background-color: var(--color-grey-200);
  padding: 2rem 4rem;
  color: var(--color-brand-500);
  font-size: 1.6rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;

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
    margin-right: auto;
  }

  @media ${device.tabletS} {
    font-size: 1.4rem;

    svg {
      height: 2.4rem;
      width: 2.4rem;
    }
  }

  @media ${device.mobileL} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const HeaderBungalowName = styled.span`
  font-family: 'Sono';
  font-size: 2rem;
  margin-right: auto;

  @media ${device.tabletS} {
    font-size: 1.8rem;
  }
`;

const HeaderCapacityBox = styled.p`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media ${device.tablet} {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  @media ${device.mobileL} {
    flex-direction: row;
  }
`;

const HeaderPriceBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  .invalid {
    font-size: 1.2rem;
    font-style: italic;
    text-decoration: line-through;
    color: red;
  }
`;

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;
`;

function CabinDataBox({ cabin }) {
  return (
    <StyledBungalowDataBox>
      <Header>
        <div>
          <HiOutlineHomeModern />
          <HeaderBungalowName>{cabin.name}</HeaderBungalowName>
        </div>
        <HeaderCapacityBox>
          <HiUserGroup />
          <span>Up to {cabin.maxCapacity} people</span>
        </HeaderCapacityBox>
        <HeaderPriceBox>
          <HiMiniCurrencyDollar />
          {'Per night '}
          {cabin.discount ? (
            <>
              <span>{formatCurrency(cabin.regularPrice - cabin.discount)}</span>{' '}
              <span className="invalid">
                ({formatCurrency(cabin.regularPrice)})
              </span>{' '}
            </>
          ) : (
            <span>{formatCurrency(cabin.regularPrice)}</span>
          )}
        </HeaderPriceBox>
      </Header>
    </StyledBungalowDataBox>
  );
}

export default CabinDataBox;
