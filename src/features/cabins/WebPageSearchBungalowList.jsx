import styled from 'styled-components';
import Spinner from '../../ui/Spinner';
import { useCabins } from './useCabins';
import WebPageSearchBungalowItem from './WebPageSearchBungalowItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { createRef, useEffect, useMemo, useState } from 'react';
import { useSettings } from '../settings/useSettings';
import { useURL } from '../../hooks/useURL';
import { fromUnixTime } from 'date-fns';
import { calculateDayCount } from '../../utils/helpers';

const StyledWebPageSearchBungalowList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 2rem;
`;

function WebPageSearchBungalowList() {
  const [renderCount, setRenderCount] = useState(0);

  useEffect(function () {
    setRenderCount((renderCount) => renderCount + 1);
  }, []);

  const { cabins, isPending: isCabinsLoading } = useCabins();
  const { settings, isPending: isSettingsLoading } = useSettings();
  const { getURLParams } = useURL();

  const [startDate, endDate, numGuests] = [
    getURLParams('startDate') ? fromUnixTime(getURLParams('startDate')) : null,
    getURLParams('endDate') ? fromUnixTime(getURLParams('endDate')) : null,
    +getURLParams('numGuests'),
  ];

  const isLoading = isCabinsLoading || isSettingsLoading;

  const nodeRefs = useMemo(() => {
    return cabins?.reduce((acc, cabin) => {
      acc[cabin._id] = createRef();
      return acc;
    }, {});
  }, [cabins]);

  const setting = settings?.find((setting) => setting.isActive);

  const dayCount = calculateDayCount(startDate, endDate);

  return (
    <>
      {isLoading && <Spinner />}

      <StyledWebPageSearchBungalowList>
        <TransitionGroup component={null} key={location.key}>
          {cabins?.map((cabin, index) => (
            <CSSTransition
              key={`${cabin._id}-${renderCount}`}
              nodeRef={nodeRefs[cabin._id]}
              timeout={500}
              classNames="bungalowitem"
              appear
              enter={true}
              exit={false}
            >
              <WebPageSearchBungalowItem
                cabin={cabin}
                ref={nodeRefs[cabin._id]}
                index={index}
                setting={setting}
                pickedStart={startDate}
                pickedEnd={endDate}
                numGuests={numGuests}
                dayCount={dayCount}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </StyledWebPageSearchBungalowList>
    </>
  );
}

export default WebPageSearchBungalowList;
