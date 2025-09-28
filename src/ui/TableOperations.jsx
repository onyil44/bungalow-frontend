import styled from 'styled-components';
import { device } from '../styles/bereakingPoints';

const TableOperations = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;

  @media ${device.tablet} {
    flex-direction: column;
    align-items: flex-end;
    gap: 1rem;
  }
`;

export default TableOperations;
