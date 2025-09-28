import styled from 'styled-components';
import { formatCurrency } from '../../utils/helpers';

import {
  HiMiniMoon,
  HiOutlineCurrencyDollar,
  HiUserGroup,
} from 'react-icons/hi2';
import { PiBreadFill } from 'react-icons/pi';
import { device } from '../../styles/bereakingPoints';
import { useMediaQuery } from '../../hooks/useMediaQuery';

const BungalowDetails = styled.div`
  background-color: var(--color-background-surface);
  max-height: 16rem;
  overflow: auto;

  @media ${device.tabletL} {
    max-width: 1000px;
  }

  @media ${device.tabletL} {
    max-height: 1000px;
  }
`;

const BungalowDetailsBody = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 2rem 2rem;

  gap: 2rem;

  overflow: auto;

  @media ${device.tabletS} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const BungalowDetailsBodyInfo = styled.div`
  grid-column: span ${(props) => props.$gridspan};

  display: flex;
  align-items: center;
  gap: 1rem;

  .label {
    font-weight: 600;
    word-wrap: normal;
  }

  .invalid {
    font-size: 1.2rem;
    font-style: italic;
    text-decoration: line-through;
    color: red;
  }
`;

function WebPageBungalowDataBox({ bungalow, setting }) {
  const isTabletSorSmaller = useMediaQuery(device.tabletS);
  const descriptonSpan = isTabletSorSmaller ? 2 : 4;
  return (
    <BungalowDetails>
      <BungalowDetailsBody>
        <BungalowDetailsBodyInfo $gridspan={1}>
          <span className="label">Capacity</span>
          <HiUserGroup />
          <span>Up to {bungalow.maxCapacity} guests</span>
        </BungalowDetailsBodyInfo>

        <BungalowDetailsBodyInfo $gridspan={1}>
          <span className="label">Price</span>
          <HiOutlineCurrencyDollar />
          <span>
            {bungalow.discount ? (
              <>
                {formatCurrency(bungalow.regularPrice - bungalow.discount)}{' '}
                <span className="invalid">
                  {formatCurrency(bungalow.regularPrice)}
                </span>
              </>
            ) : (
              formatCurrency(bungalow.regularPrice)
            )}
          </span>
        </BungalowDetailsBodyInfo>

        <BungalowDetailsBodyInfo $gridspan={1}>
          <span className="label">Minimum Nights</span>
          <HiMiniMoon />
          <span>{setting.minBookingLength} nights</span>
        </BungalowDetailsBodyInfo>

        <BungalowDetailsBodyInfo $gridspan={1}>
          <span className="label">Breakfast</span>
          <PiBreadFill />
          <span>{formatCurrency(setting.breakfastPrice)}</span>
        </BungalowDetailsBodyInfo>

        <BungalowDetailsBodyInfo
          $gridspan={descriptonSpan}
          style={{ alignItems: 'flex-start' }}
        >
          <span className="label">Description</span>
          <span>{bungalow.description}</span>
        </BungalowDetailsBodyInfo>
      </BungalowDetailsBody>
    </BungalowDetails>
  );
}

export default WebPageBungalowDataBox;
