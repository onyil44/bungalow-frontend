import styled from 'styled-components';
import Button from './Button';
import Heading from './Heading';

const StyledConfirmAction = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 100%;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
  & h3 {
    text-transform: capitalize;
  }

  & Button {
    text-transform: capitalize;
  }
`;

function ConfirmAction({
  action,
  resourceName,
  onConfirm,
  disabled,
  onCloseModal,
}) {
  return (
    <StyledConfirmAction>
      <Heading as="h3">
        {action} {resourceName}
      </Heading>
      <p>
        Are you sure you want to {action} this {resourceName}{' '}
        {action === 'delete' && 'permanently'}?{' '}
        {action === 'delete' && 'This action cannot be undone.'}
      </p>

      <div>
        <Button
          $variation="secondary"
          $size="medium"
          disabled={disabled}
          onTap={onCloseModal}
        >
          Cancel
        </Button>
        <Button
          $variation={action === 'delete' ? 'danger' : 'primary'}
          $size="medium"
          disabled={disabled}
          onTap={onConfirm}
        >
          {action}
        </Button>
      </div>
    </StyledConfirmAction>
  );
}

export default ConfirmAction;
