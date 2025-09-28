export const customStyles = {
  control: (base) => ({
    ...base,
    backgroundColor: 'var(--color-grey-0)',
    border: '1px solid var(--color-grey-300)',
    borderRadius: 'var(--border-radius-sm)',
    fontWeight: '500',
    boxShadow: 'none',
    '&:hover': {
      border: '1px solid var(--color-brand-600)',
    },
    width: '100%',
    minHeight: '3.8rem',
    height: '4.2rem',
  }),
  valueContainer: (base) => ({
    ...base,
    padding: '0.2rem 0.6rem',
    minHeight: '4rem',
    flexWrap: 'wrap',
    overflowY: 'auto',
    height: '4rem',
    overflow: 'auto',
  }),
  input: (base) => ({
    ...base,
    margin: 0,
    padding: 0,
    lineHeight: '1.4rem',
    fontSize: '16px',
  }),
  indicatorsContainer: (base) => ({
    ...base,
    height: '100%',
    margin: 'auto',
  }),
  dropdownIndicator: (base) => ({
    ...base,
    padding: '0 4px',
  }),
  clearIndicator: (base) => ({
    ...base,
    padding: '0 4px',
  }),
  container: (base) => ({ ...base, width: '100%' }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? 'var(--color-brand-200)'
      : 'var(--color-grey-0)',
    '&:hover': {
      backgroundColor: 'var(--color-brand-200)',
    },
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: 'var(--color-brand-200)',
  }),
};
