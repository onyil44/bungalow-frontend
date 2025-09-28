import styled from 'styled-components';
import WebPageSearchBungalowForm from './WebPageSearchBungalowForm';
import WebPageSearchBungalowList from './WebPageSearchBungalowList';

const StyledWebPageSearchBungalowDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const WebPageSearchBoxContainer = styled.div`
  background-color: var(--color-background-hover);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-lg);
`;

const WebPageSearchBoxHeader = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  background-color: var(--color-background);
  color: var(--color-brand-500);
  font-weight: 600;
  font-size: 1.6rem;
  padding: 1.6rem;
`;

function WebPageSearchBungalowDetail() {
  return (
    <StyledWebPageSearchBungalowDetail>
      <WebPageSearchBoxContainer>
        <WebPageSearchBoxHeader>Search Bungalows</WebPageSearchBoxHeader>
        <WebPageSearchBungalowForm />
      </WebPageSearchBoxContainer>
      <WebPageSearchBungalowList />
    </StyledWebPageSearchBungalowDetail>
  );
}

export default WebPageSearchBungalowDetail;
