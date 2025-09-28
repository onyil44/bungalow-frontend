import {
  cloneElement,
  createContext,
  useContext,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { HiChevronDown, HiChevronLeft } from 'react-icons/hi2';
import styled from 'styled-components';
import Button from './Button';
import { CSSTransition } from 'react-transition-group';
import { device } from '../styles/bereakingPoints';

const StyledSearchBox = styled.div`
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);

  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  justify-content: space-between;
  text-align: center;
`;

const SearchBoxHeader = styled.div`
  display: flex;
  gap: 2rem;
  width: 100%;
  justify-content: space-between;
  align-items: center;

  padding: 1rem 2rem;

  background-color: var(--color-grey-100);
  border-bottom: 1px solid var(--color-grey-100);
  border-top-right-radius: var(--border-radius-md);
  border-top-left-radius: var(--border-radius-md);

  color: var(--color-brand-700);
`;

const StyledDropDownButton = styled.button`
  text-align: left;
  background: none;
  border: none;
  font-size: 1.4rem;
  padding: 0.3rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;
  white-space: nowrap;
  margin-left: auto;

  border-radius: 7px;

  &:active,
  &:focus {
    outline: none;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      outline: none;
      background-color: var(--color-grey-100);
    }
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-brand-700);
    transition: all 0.3s;
  }
`;

const SearchBoxBodyWrapper = styled.div`
  width: 100%;

  &.searchbox-enter {
    max-height: 0;
    opacity: 0;
    overflow: hidden;
  }

  &.searchbox-enter-active {
    max-height: 500px;
    opacity: 1;
    transition: all 400ms ease-in-out;
  }

  &.searchbox-exit {
    max-height: 500px;
    opacity: 1;
    overflow: hidden;
  }

  &.searchbox-exit-active {
    max-height: 0;
    opacity: 0;
    transition: all 400ms ease-in-out;
  }
`;

const SearchBoxForm = styled.form`
  margin: 1rem;
  padding: 1.2rem 2rem;

  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  display: grid;
  grid-template-columns: ${(props) => props?.$columns};
  column-gap: 2.4rem;
  align-items: start;
  transition: none;

  @media ${device.mobileL} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const SearchBoxFormGroup = styled.div`
  grid-column: ${(props) => `span ${props?.$gridspan}`};

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  overflow: visible;

  width: 100%;

  padding: 1.2rem 0;

  & > input,
  & > select,
  & > textarea {
    width: 100%;
  }
`;

const Label = styled.label`
  margin-left: 1rem;
  margin-bottom: 0.5rem;
  color: var(--color-brand-500);
  font-weight: 500;
  font-size: 1.4rem;
`;

const Error = styled.span`
  margin-left: 1rem;
  margin-top: 0.5rem;
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  grid-column: 1 / -1;
  width: 100%;
`;

const SearchBoxContext = createContext();

function SearchBox({
  children,
  columns,
  dropDownOption = false,
  ref,
  reset = null,
  disabledCondition = null,
}) {
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);

  const close = () => setIsSearchBoxOpen(false);
  useImperativeHandle(ref, () => {
    return { close };
  });
  return (
    <SearchBoxContext.Provider
      value={{
        columns,
        dropDownOption,
        isSearchBoxOpen,
        setIsSearchBoxOpen,
        reset,
        disabledCondition,
      }}
    >
      <StyledSearchBox>{children}</StyledSearchBox>
    </SearchBoxContext.Provider>
  );
}

function Header({ children }) {
  const { dropDownOption, isSearchBoxOpen, setIsSearchBoxOpen } =
    useContext(SearchBoxContext);
  return (
    <SearchBoxHeader>
      {cloneElement(children, { $variation: 'searchBox' })}
      {dropDownOption && (
        <StyledDropDownButton
          type="button"
          onClick={() => setIsSearchBoxOpen(!isSearchBoxOpen)}
          aria-label={
            isSearchBoxOpen ? 'Collapse search box' : 'Expand search box'
          }
        >
          {!isSearchBoxOpen ? <HiChevronLeft /> : <HiChevronDown />}
        </StyledDropDownButton>
      )}
    </SearchBoxHeader>
  );
}

function Body({ children }) {
  const { dropDownOption, isSearchBoxOpen } = useContext(SearchBoxContext);
  const nodeRef = useRef();

  return (
    <CSSTransition
      in={!dropDownOption || isSearchBoxOpen}
      timeout={400}
      classNames="searchbox"
      unmountOnExit
      nodeRef={nodeRef}
    >
      <SearchBoxBodyWrapper ref={nodeRef}>{children}</SearchBoxBodyWrapper>
    </CSSTransition>
  );
}

function Form({ children, ...props }) {
  const { columns, reset, disabledCondition } = useContext(SearchBoxContext);

  return (
    <SearchBoxForm $columns={columns} {...props}>
      {children}
      <SearchBox.ButtonBox>
        <Button
          $variation="primary"
          $size="mediumSmall"
          disabled={disabledCondition}
        >
          Submit
        </Button>
        <Button
          $variation="secondary"
          $size="mediumSmall"
          type="button"
          onClick={() => reset()}
        >
          Reset
        </Button>
      </SearchBox.ButtonBox>
    </SearchBoxForm>
  );
}

function FormGroup({ children, error, label, gridspan = 1 }) {
  return (
    <SearchBoxFormGroup $gridspan={gridspan}>
      {label && <Label htmlFor={children.props?.id || null}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </SearchBoxFormGroup>
  );
}

SearchBox.Header = Header;
SearchBox.Body = Body;
SearchBox.Form = Form;
SearchBox.FormGroup = FormGroup;
SearchBox.ButtonBox = ButtonBox;

export default SearchBox;
