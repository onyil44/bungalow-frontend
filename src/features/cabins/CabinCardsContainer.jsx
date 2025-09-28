import styled from 'styled-components';
import { device } from '../../styles/bereakingPoints';
import { useURL } from '../../hooks/useURL';
import { useCabins } from './useCabins';
import Spinner from '../../ui/Spinner';
import CabinCard from '../../ui/CabinCard';

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4rem;
  margin-bottom: 2rem;
  padding: 0 2rem;
  align-items: stretch;

  @media ${device.laptop} {
    grid-template-columns: repeat(3, 1fr);
  }

  @media ${device.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${device.mobileL} {
    grid-template-columns: repeat(1, 1fr);
  }
`;

function CabinCardsContainer() {
  const { getURLParams } = useURL();
  const cabinIdsFromUrl = getURLParams('cabinId');
  const startDateFromUrl = getURLParams('startDate');
  const endDateFromUrl = getURLParams('endDate');
  const isDatesSubmitted = Boolean(startDateFromUrl && endDateFromUrl);

  const { cabins: bungalows, isPending: isBungalowsLoading } =
    useCabins(cabinIdsFromUrl);

  const sortedBungalows = bungalows?.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    return 0;
  });

  const isLoading = isBungalowsLoading;

  if (isLoading) return <Spinner />;

  return (
    <CardsContainer>
      {!isDatesSubmitted && <span>Please submit dates. 📅</span>}
      {isDatesSubmitted &&
        sortedBungalows.map((bungalow) => (
          <CabinCard bungalow={bungalow} key={bungalow._id} />
        ))}
    </CardsContainer>
  );
}

export default CabinCardsContainer;
