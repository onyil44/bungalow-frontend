import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';
import ButtonIcon from './ButtonIcon';
import { useDispatch, useSelector } from 'react-redux';
import { getDarkMode, toggleDarkMode } from '../features/themes/themeSlice';

function DarkModeToggle() {
  const dispatch = useDispatch();
  const darkMode = useSelector(getDarkMode);

  function handleOnClick() {
    dispatch(toggleDarkMode());
  }
  return (
    <ButtonIcon type="button" onTap={handleOnClick}>
      {darkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}

export default DarkModeToggle;
