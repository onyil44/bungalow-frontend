import { useSelector } from 'react-redux';
import { getDarkMode } from './themeSlice';
import { useEffect } from 'react';

function ThemeEffect() {
  const darkMode = useSelector(getDarkMode);

  useEffect(
    function () {
      const htmlDocument = document.documentElement;

      if (darkMode) {
        htmlDocument.classList.add('dark-mode');
      } else {
        htmlDocument.classList.remove('dark-mode');
      }
    },
    [darkMode],
  );
  return null;
}

export default ThemeEffect;
