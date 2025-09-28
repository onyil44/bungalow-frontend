import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import { useForm } from 'react-hook-form';
import Spinner from '../../ui/Spinner';
import FormRow from '../../ui/FormRow';
import { useCreateCabin } from './useCreateCabin';
import { useUpdateCabin } from './useUpdateCabin';
import FormButtonRow from '../../ui/FormButtonRow';

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { _id: editId, ...editValues } = cabinToEdit;
  const isEditingSesion = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditingSesion ? { editId, ...editValues } : {},
  });

  const { errors } = formState;

  const { isCreating, createCabin } = useCreateCabin();
  const { isUpdating, updateCabin } = useUpdateCabin();

  function onSubmit(data) {
    const formData = new FormData();
    if (data.editId) formData.append('cabinId', data.editId);
    if (data.name) formData.append('name', data.name);
    if (data.maxCapacity) formData.append('maxCapacity', data.maxCapacity);
    if (data.regularPrice) formData.append('regularPrice', data.regularPrice);
    if (data.discount) formData.append('discount', data.discount);
    if (data.description) formData.append('description', data.description);
    if (data.images instanceof FileList && data.images.length > 0) {
      Array.from(data.images).forEach((el) => formData.append('images', el));
    }

    if (isEditingSesion) {
      updateCabin(formData, {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      });
    } else {
      createCabin(formData, {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      });
    }
  }

  const isWorking = isCreating || isUpdating;

  if (isWorking) {
    return <Spinner />;
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? 'modal' : 'regular'}
    >
      {isEditingSesion && (
        <Input type="hidden" id="editId" {...register(editId)} />
      )}
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register('name', { required: 'This field is required.' })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register('maxCapacity', {
            required: 'This field is required.',
            min: { value: 1, message: 'The capacity should be at least 1.' },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register('regularPrice', {
            required: 'This field is required.',
            min: {
              value: 1,
              message: 'The regular price should be at least 1.',
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isWorking}
          {...register('discount', {
            required: 'This field is required.',
            validate: (value) =>
              Number(value) <= Number(getValues().regularPrice) ||
              'Discount should be less than regular price.',
          })}
        />
      </FormRow>

      <FormRow
        label="Description for web site"
        error={errors?.description?.message}
      >
        <Textarea
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register('description', { required: 'This field is required.' })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.images?.message}>
        <FileInput
          id="images"
          accept="image/*"
          disabled={isWorking}
          multiple
          {...register('images', {
            required: isEditingSesion ? false : 'This field is required.',
          })}
        />
      </FormRow>

      <FormButtonRow>
        {/* type is an HTML attribute! */}
        <Button
          $variation="secondary"
          $size="medium"
          type="reset"
          onTap={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button $variation="primary" $size="medium">
          {isEditingSesion ? 'Edit Cabin' : 'Create Cabin'}
        </Button>
      </FormButtonRow>
    </Form>
  );
}

export default CreateCabinForm;
