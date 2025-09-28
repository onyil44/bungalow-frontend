import { useEffect, useMemo } from 'react';
import Select from 'react-select';
import { Controller } from 'react-hook-form';
import { customStyles } from '../styles/ReactSelectStyles';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { device } from '../styles/bereakingPoints';
import { useCabins } from '../features/cabins/useCabins';
import { useURL } from '../hooks/useURL';
import { useLocation } from 'react-router';

function BungalowSelect({ control, name, setValue }) {
  const isLaptopLorSmaller = useMediaQuery(device.laptopL);
  const { cabins, isPending: isBungalowsLoading } = useCabins();
  const { getURLParams } = useURL();
  const { search } = useLocation();

  const cabinsOptions = useMemo(
    () =>
      cabins
        ?.map((cabin) => {
          return { label: cabin.name, value: cabin._id };
        })
        .sort((a, b) => {
          const nameA = a.label.toUpperCase();
          const nameB = b.label.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          return 0;
        }),
    [cabins],
  );

  const cabinIdsFromUrl = useMemo(
    () => (getURLParams('cabinId') ? getURLParams('cabinId').split('|') : []),
    [search],
  );

  useEffect(
    function () {
      if (cabinsOptions?.length > 0 && cabinIdsFromUrl.length > 0) {
        const cabinOptionsFromUrl = cabinsOptions.filter((cabin) =>
          cabinIdsFromUrl.includes(cabin.value),
        );

        setValue('cabinId', cabinOptionsFromUrl);
      } else {
        setValue('cabinId', []);
      }
    },

    [cabinsOptions, cabinIdsFromUrl, setValue],
  );

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
      control={control}
      name={name}
      render={({ field }) => (
        <Select
          {...field}
          styles={reactSelectCustomStyles}
          isMulti={true}
          id={name}
          options={cabinsOptions}
          isLoading={isBungalowsLoading}
          isClearable
          placeholder="Bungalow(s)"
          menuShouldScrollIntoView={false}
        />
      )}
    />
  );
}

export default BungalowSelect;
