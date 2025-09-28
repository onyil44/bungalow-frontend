import _ from 'lodash';

import { useForm } from 'react-hook-form';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import styled from 'styled-components';
import toast from 'react-hot-toast';
import { useCreateSettings } from './useCreateSettings';

import Button from '../../ui/Button';

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;
const StyledButton = styled.button`
  line-height: inherit;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.2rem 0.5rem;
`;

function UpdateSettingsForm({ setting = {}, onCloseModal }) {
  const { _id: settingId, isActive, createdAt, ...settingData } = setting;

  const { register, handleSubmit, reset, formState, getValues } = useForm({
    defaultValues: settingData,
  });
  const { createSettings, isCreating } = useCreateSettings();

  const { errors } = formState;

  function onSubmit(data) {
    if (_.isEqual(data, settingData)) return toast.error('Same settings.');
    createSettings(data, {
      onSuccess: () => {
        reset();
        onCloseModal();
      },
    });
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? 'modal' : 'regular'}
    >
      <FormRow
        label="Minimum nights/booking"
        error={errors?.minBookingLength?.message}
      >
        <Input
          disabled={isCreating}
          type="number"
          id="min-nights"
          {...register('minBookingLength', {
            required: 'This field is required.',
          })}
        />
      </FormRow>
      <FormRow
        label="Maximum nights/booking"
        error={errors?.maxBookingLength?.message}
      >
        <Input
          disabled={isCreating}
          type="number"
          id="max-nights"
          {...register('maxBookingLength', {
            required: 'This field is required.',
            validate: (value) =>
              Number(value) >= Number(getValues().minBookingLength) ||
              'Maximum nights should be more than minimum nights.',
          })}
        />
      </FormRow>
      <FormRow
        label="Maximum guests/booking"
        error={errors?.maxGuestsPerBooking?.message}
      >
        <Input
          disabled={isCreating}
          type="number"
          id="max-guests"
          {...register('maxGuestsPerBooking', {
            required: 'This field is required.',
          })}
        />
      </FormRow>
      <FormRow label="Breakfast price" error={errors?.breakfastPrice?.message}>
        <Input
          disabled={isCreating}
          type="number"
          id="breakfast-price"
          {...register('breakfastPrice', {
            required: 'This field is required.',
          })}
        />
      </FormRow>
      <ButtonContainer>
        <Button $size="medium" $variation="primary" disabled={isCreating}>
          <span>Create</span>
        </Button>
        <Button
          $size="medium"
          $variation="secondary"
          type="button"
          onTap={onCloseModal}
        >
          <span>Cancel</span>
        </Button>
      </ButtonContainer>
    </Form>
  );
}

export default UpdateSettingsForm;
