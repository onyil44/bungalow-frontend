import jsValidator from 'validator';

import { countryList } from '../../utils/countryList.js';

import Heading from '../../ui/Heading';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useForm } from 'react-hook-form';
import Form from '../../ui/Form';
import FormButtonRow from '../../ui/FormButtonRow';
import Button from '../../ui/Button';
import Select from '../../ui/Select';
import { useUpdateGuests } from './useUpdateGuest.js';
import { useCreateGuest } from './useCreateGuest.js';

function CreateGuestForm({ guestToUpdate = {}, onCloseModal }) {
  const { register, formState, handleSubmit } = useForm({
    defaultValues: guestToUpdate,
  });
  const { updateGuest, isUpdating } = useUpdateGuests();
  const { createGuest, isCreating } = useCreateGuest();

  const { errors } = formState;

  const isLoading = isUpdating || isCreating;

  const { _id: guestId, fullName, email } = guestToUpdate;
  const isEdittingSession = Boolean(guestId);

  function onSubmit(data) {
    if (isEdittingSession) {
      const submitData = { guestId: data._id, ...data, countryFlag: '' };
      if (submitData._id) delete submitData._id;
      updateGuest(submitData, {
        onSuccess: () => {
          onCloseModal();
        },
      });
    } else {
      createGuest(data, {
        onSuccess: () => {
          onCloseModal();
        },
      });
    }
  }

  return (
    <>
      <Heading as="h2" $variation={onCloseModal ? 'modal' : ''}>
        Update Guest
      </Heading>
      <Form
        type={onCloseModal ? 'modal' : 'regular'}
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormRow label="Full Name" error={errors?.fullName?.message}>
          <Input
            type="text"
            id="fullName"
            {...register('fullName', { required: 'Thids filed is required.' })}
          />
        </FormRow>
        <FormRow label="Email" error={errors?.email?.message}>
          <Input
            type="text"
            {...register('email', {
              required: 'This field is required',
              validate: (val) =>
                jsValidator.isEmail(val) ||
                'Please submit a valid email address.',
            })}
          />
        </FormRow>
        <FormRow label="Nationality" error={errors?.nationality?.message}>
          <Select
            id="nationality"
            {...register('nationality', {
              required: 'This field is required.',
            })}
            options={countryList}
          />
        </FormRow>
        <FormRow label="Nationa ID" error={errors?.nationalId?.message}>
          <Input
            type="text"
            id="nationalId"
            {...register('nationalId', {
              required: 'This fieled is required.',
            })}
          ></Input>
        </FormRow>
        <FormButtonRow>
          <Button
            $variation="danger"
            $size="medium"
            type="button"
            onTap={onCloseModal}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button $variation="primary" $size="medium" disabled={isLoading}>
            {isEdittingSession ? 'Update' : 'Create'}
          </Button>
        </FormButtonRow>
      </Form>
    </>
  );
}

export default CreateGuestForm;
