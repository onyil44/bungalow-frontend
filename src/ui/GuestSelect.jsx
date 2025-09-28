import { useMemo, useState } from 'react';
import { useGuestDropdown } from '../features/guests/useGuestDropdown';
import Select from 'react-select';
import { Controller } from 'react-hook-form';
import { customStyles } from '../styles/ReactSelectStyles';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { device } from '../styles/bereakingPoints';

function GuestSelect({ defaultValue, control, name }) {
  const isLaptopLorSmaller = useMediaQuery(device.laptopL);
  const [inputValue, setInputValue] = useState('');
  const { guests, isGuestDropdownLoading } = useGuestDropdown(inputValue);

  const options =
    guests?.map((guest) => ({
      label: guest.fullName,
      value: guest._id,
    })) || [];

  // react-select styling
  const reactSelectCustomStyles = useMemo(
    () => ({
      ...customStyles,
      control: (base, state) => {
        const styles = customStyles.control
          ? customStyles.control(base, state)
          : base;
        return {
          ...styles,
          height: isLaptopLorSmaller ? '4.8rem' : '4.2rem',
        };
      },
      valueContainer: (base, state) => {
        const styles = customStyles.valueContainer
          ? customStyles.valueContainer(base, state)
          : base;
        return {
          ...styles,
          padding: '0.2rem 0.6rem',
          minHeight: isLaptopLorSmaller ? '4.5rem' : '4rem',
          height: isLaptopLorSmaller ? '4.5rem' : '4rem',
        };
      },
    }),
    [isLaptopLorSmaller],
  );

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || []}
      render={({ field }) => (
        <Select
          {...field}
          styles={reactSelectCustomStyles}
          isMulti
          options={options}
          isLoading={isGuestDropdownLoading}
          isClearable
          placeholder="Select guest(s)..."
          onInputChange={(value) => setInputValue(value)}
          onChange={(selected) => field.onChange(selected)}
          value={field.value}
          // menuPortalTarget={document.body}
          // menuPosition="fixed"
          menuShouldScrollIntoView={false}
        />
      )}
    />
  );
}

export default GuestSelect;
