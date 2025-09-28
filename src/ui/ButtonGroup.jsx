import styled from 'styled-components';
import { device } from '../styles/bereakingPoints';

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: flex-end;

  @media ${device.tabletS} {
    width: 100%;
    flex-direction: column;
  }
`;

export default ButtonGroup;
