import { useRef } from 'react';
import SearchBox from '../../ui/SearchBox';
import Heading from '../../ui/Heading';
import { useForm } from 'react-hook-form';
import { countryList } from '../../utils/countryList';
import Select from '../../ui/Select';
import { useURL } from '../../hooks/useURL';
import GuestSelect from '../../ui/GuestSelect';

function GuestSearchOperations() {
  const closeSearchBox = useRef();
  const { register, handleSubmit, formState, reset, control } = useForm({
    defaultValues: { guestId: null, nationality: null },
  });
  const { deleteURLParams, setURLParams } = useURL();

  const { errors } = formState;

  function onSubmit(data) {
    const submitData = {
      _id: data.guestId?.map((guest) => guest.value).join('|'),
      nationality: data.nationality || '',
    };

    const submitDataEntries = Object.entries(submitData);

    submitDataEntries.forEach(([key, value]) => {
      if (!value) {
        deleteURLParams(key);
      } else {
        setURLParams(key, value);
      }
    });

    closeSearchBox.current.close();
  }

  return (
    <SearchBox
      columns="repeat(2,1fr)"
      dropDownOption={true}
      ref={closeSearchBox}
      reset={reset}
    >
      <SearchBox.Header>
        <Heading as="h4">Search Guests</Heading>
      </SearchBox.Header>

      <SearchBox.Body>
        <SearchBox.Form onSubmit={handleSubmit(onSubmit)}>
          <SearchBox.FormGroup label="Guest Name">
            <GuestSelect name="guestId" control={control} />
          </SearchBox.FormGroup>

          <SearchBox.FormGroup label="Nationality">
            <Select
              id="nationality"
              options={countryList}
              defaultValue=""
              placeholder="Please select country"
              {...register('nationality')}
            />
          </SearchBox.FormGroup>
        </SearchBox.Form>
      </SearchBox.Body>
    </SearchBox>
  );
}

export default GuestSearchOperations;
