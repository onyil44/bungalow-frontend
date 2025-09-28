import { createContext, useContext, useState } from 'react';
import { HiChevronDown, HiChevronLeft } from 'react-icons/hi2';
import styled from 'styled-components';
import { useOutsideClick } from '../hooks/useOutsideClick';

const Menu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      outline: none;

      & svg {
        color: var(--color-brand-700);
      }
    }
  }

  &:active,
  &:visited,
  &:focus {
    outline: none;

    & svg {
      color: var(--color-brand-700);
    }
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: var(--color-grey-100);
    }
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: absolute;
  z-index: 1;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.$position.x}px;
  top: ${(props) => props.$position.y}px;
`;

const StyledHiChevronDown = styled(HiChevronDown)`
  z-index: 1;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  color: var(--color-brand-700);
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;
  white-space: nowrap;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: var(--color-grey-50);
    }
  }
`;

const IconBox = styled.div`
  width: 1.6rem;
  height: 1.6rem;

  & svg {
    width: 100%;
    height: 100%;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState('');
  const [position, setPosition] = useState(null);

  const close = () => setOpenId('');
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, open, close, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toogle({ id }) {
  const { openId, open, close, setPosition } = useContext(MenusContext);

  function handleClick(e) {
    const rect = e.target.closest('button').getBoundingClientRect();

    setPosition({
      x: -8,
      y: rect.height - 1,
    });

    openId === '' || openId !== id ? open(id) : close();
  }

  return (
    <StyledToggle onClick={(e) => handleClick(e)}>
      {openId === id ? <StyledHiChevronDown /> : <HiChevronLeft />}
    </StyledToggle>
  );
}

function List({ id, children }) {
  const { openId, position, close } = useContext(MenusContext);

  const { ref } = useOutsideClick(close);

  if (openId !== id) return null;
  return (
    <StyledList ref={ref} $position={position}>
      {children}
    </StyledList>
  );
}

function Button({ children, icon, onClick }) {
  const { close } = useContext(MenusContext);

  function handleClick() {
    onClick?.();
    close();
  }
  return (
    <li>
      <StyledButton onClick={handleClick}>
        <IconBox>{icon}</IconBox> <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toogle = Toogle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
