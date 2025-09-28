import jsValidator from 'validator';
import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormButtonBox from '../../ui/FormButtonBox';
import FormGroup from '../../ui/FormGroup';
import Input from '../../ui/Input';
import { useNavigate } from 'react-router';

function WebPageSearchBookingForm() {
  const navigate = useNavigate();
  const { register, formState, handleSubmit, reset } = useForm({
    pnrCode: null,
    email: null,
    nationalId: null,
  });

  const { errors } = formState;

  function onSubmit(data) {
    navigate(
      `/web/booking?pnrCode=${data.pnrCode}&email=${data.email}&nationalId=${data.nationalId}`,
    );
  }
  return (
    <Form
      columns="repeat(3, 1fr)"
      type="webPageSearchForm"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormGroup label="PNR Code" error={errors?.pnrCode?.message}>
        <Input
          type="text"
          id="pnrCode"
          placeholder="PNR Code"
          {...register('pnrCode', { required: 'This field is required.' })}
        />
      </FormGroup>
      <FormGroup label="E mail" error={errors?.email?.message}>
        <Input
          type="text"
          id="email"
          placeholder="Email address"
          {...register('email', {
            required: 'This field is required.',
            validate: (v) =>
              jsValidator.isEmail(v) || 'Please submit valid email address.',
          })}
        />
      </FormGroup>
      <FormGroup label="National ID Number" error={errors?.nationalId?.message}>
        <Input
          type="text"
          id="nationalId"
          placeholder="National Id Number"
          {...register('nationalId', { required: 'This field is required' })}
        />
      </FormGroup>
      <FormButtonBox>
        <Button
          $variation="secondary"
          $size="mediumSmall"
          type="button"
          onTap={reset}
        >
          Reset
        </Button>
        <Button $variation="primary" $size="mediumSmall">
          Search
        </Button>
      </FormButtonBox>
    </Form>
  );
}

export default WebPageSearchBookingForm;
