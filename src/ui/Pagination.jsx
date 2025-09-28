import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import styled from 'styled-components';
import { useURL } from '../hooks/useURL';
import Select from './Select';
import { useEffect, useMemo } from 'react';
import { PAGE_SIZE } from '../utils/config';
import { device } from '../styles/bereakingPoints';

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media ${device.mobileL} {
    flex-direction: column;
    align-items: flex-end;
  }
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? ' var(--color-brand-600)' : 'var(--color-grey-50)'};
  color: ${(props) => (props.active ? ' var(--color-brand-50)' : 'inherit')};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover:not(:disabled) {
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    }
  }
`;

const StyledSelectBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

function Pagination({ count }) {
  const { getURLParams, setURLParams } = useURL();

  const currentPage = +getURLParams('page') || 1;
  const limit = +getURLParams('limit') || PAGE_SIZE;
  const lastPage = useMemo(() => Math.ceil(count / limit), [count, limit]);

  const isLastPage = currentPage === lastPage;
  const isFirstPage = currentPage === 1;
  const isBiggerThanLastPage = currentPage > lastPage;

  const selectOptions = [10, 20, 50, 100]
    .filter((el) => el < count)
    .map((el) => {
      return { value: el, label: el };
    });

  const isThereSelectOptions = selectOptions.length > 0;
  const selectOptionLastValue = selectOptions?.at(-1)?.value;
  const isLimitBiggerThanLastSelectOption = selectOptionLastValue
    ? limit > selectOptionLastValue
    : false;

  useEffect(
    function () {
      if (isBiggerThanLastPage && currentPage !== lastPage)
        setURLParams('page', lastPage);
    },
    [isBiggerThanLastPage, setURLParams, lastPage, currentPage],
  );

  useEffect(
    function () {
      isLimitBiggerThanLastSelectOption &&
        setURLParams('limit', selectOptionLastValue);
    },
    [isLimitBiggerThanLastSelectOption, setURLParams, selectOptionLastValue],
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  function handleSelectOnChange(e) {
    setURLParams('limit', e.target.value);
  }

  function handleClickNextPage() {
    isLastPage
      ? setURLParams('page', lastPage)
      : setURLParams('page', currentPage + 1);
  }
  function handleClickNPreviousPage() {
    isFirstPage
      ? setURLParams('page', 1)
      : setURLParams('page', currentPage - 1);
  }

  return (
    <StyledPagination>
      <P>
        <span>{(currentPage - 1) * limit + 1}</span> to{' '}
        <span>{currentPage * limit < count ? currentPage * limit : count}</span>{' '}
        of <span>{count}</span>
      </P>

      <Buttons>
        {isThereSelectOptions && (
          <StyledSelectBox>
            <span>Items per page</span>
            <Select
              options={selectOptions}
              value={limit}
              type="white"
              onChange={handleSelectOnChange}
            />
          </StyledSelectBox>
        )}

        <PaginationButton
          disabled={isFirstPage}
          onClick={handleClickNPreviousPage}
        >
          <HiChevronLeft />
          <span>Previous</span>
        </PaginationButton>

        <PaginationButton disabled={isLastPage} onClick={handleClickNextPage}>
          <span>Next</span>
          <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}

export default Pagination;
