import styled, { css } from 'styled-components';
import { useURL } from '../hooks/useURL';
import Button from '../ui/Button.jsx';

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.$active === 'true' &&
    css`
      background-color: var(--color-brand-500);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  @media (hover: hover) and (pointer: fine) {
    &:hover:not(:disabled) {
      background-color: var(--color-brand-500);
      color: var(--color-brand-50);
    }
  }
`;

function Filter({ filterField, options }) {
  const { getURLParams, setURLParams } = useURL();

  const activeFilter = getURLParams(filterField) || options.at(0).value;

  function handleClickFilter(value) {
    if (value === activeFilter) return;
    requestAnimationFrame(() => setURLParams(filterField, value));
  }

  return (
    <StyledFilter>
      {options.map((option) => (
        <Button
          $variation="filter-button"
          key={option.value}
          value={option.value}
          onTap={() => handleClickFilter(option.value)}
          $active={(activeFilter === option.value).toString()}
          disabled={activeFilter === option.value}
        >
          {option.label}
        </Button>
      ))}
    </StyledFilter>
  );
}

export default Filter;
