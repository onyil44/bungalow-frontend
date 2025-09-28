import styled from 'styled-components';

import Heading from '../../ui/Heading';
import Spinner from '../../ui/Spinner';
import { useCabins } from './useCabins';
import WebPageBungalowCard from '../../ui/WebPageBungalowCard';
import { device } from '../../styles/bereakingPoints';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useLocation } from 'react-router';
import { createRef, useEffect, useMemo, useState } from 'react';

const StyledWebPageBungalowsDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  h2 {
    padding: 0.5rem 2rem;
  }
`;

const BungalowsCardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4rem;
  margin-bottom: 2rem;
  padding: 0 2rem;
  align-items: stretch;

  @media ${device.tabletL} {
    grid-template-columns: repeat(3, 1fr);
  }

  @media ${device.tabletS} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${device.mobileL} {
    grid-template-columns: repeat(1, 1fr);
  }
`;

function WebPageBungalowsDetail() {
  const { cabins: bungalows, isPending: isCabinsLoading } = useCabins();
  const location = useLocation();
  const [renderCount, setRenderCount] = useState(0);

  useEffect(function () {
    setRenderCount((renderCount) => renderCount + 1);
  }, []);

  const isLoading = isCabinsLoading;

  const nodeRefs = useMemo(() => {
    return bungalows?.reduce((acc, bungalow) => {
      acc[bungalow._id] = createRef();
      return acc;
    }, {});
  }, [bungalows]);

  return (
    <>
      {isLoading && <Spinner />}

      <StyledWebPageBungalowsDetail>
        <Heading as="h2">Bungalows</Heading>
        <BungalowsCardsContainer>
          <TransitionGroup component={null} key={location.key}>
            {bungalows?.map((bungalow) => (
              <CSSTransition
                key={`${bungalow._id}-${renderCount}`}
                nodeRef={nodeRefs[bungalow._id]}
                timeout={500}
                classNames="card"
                appear
                enter={true}
                exit={false}
              >
                <WebPageBungalowCard
                  bungalow={bungalow}
                  ref={nodeRefs[bungalow._id]}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </BungalowsCardsContainer>
      </StyledWebPageBungalowsDetail>
    </>
  );
}

export default WebPageBungalowsDetail;
