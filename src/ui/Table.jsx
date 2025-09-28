import { createContext, useContext } from 'react';
import styled, { css } from 'styled-components';

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props?.$columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;

  /* Hinder text overflow */

  > * {
    min-width: 0; /* must for long text / text-overflow */
  }
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);

  & > div {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const rowVariations = {
  active: css`
    color: var(--color-green-700);
  `,
  passive: css`
    color: var(--color-grey-400);
  `,
};

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  ${(props) => rowVariations[props.variation]}
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;
  border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
`;

const Cell = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  text-align: center;

  /* for-long-text */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

const TableContext = createContext();

function Table({ children, columns }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { columns } = useContext(TableContext);

  return (
    <StyledHeader role="row" $columns={columns} as="header">
      {children}
    </StyledHeader>
  );
}

function Row({ children, variation }) {
  const { columns } = useContext(TableContext);

  return (
    <StyledRow role="row" $columns={columns} variation={variation}>
      {children}
    </StyledRow>
  );
}

function Body({ data, render }) {
  if (!data.length) return <Empty>There is no data to show.</Empty>;
  return <StyledBody>{data.map(render)}</StyledBody>;
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;

Table.Footer = Footer;
Table.Cell = Cell;

export default Table;
