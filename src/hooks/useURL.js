import { useSearchParams } from 'react-router';

export function useURL() {
  const [searchParams, setSearchParams] = useSearchParams();

  function getURLParams(field) {
    return searchParams.get(field);
  }

  function setURLParams(field, value) {
    searchParams.set(field, value);
    setSearchParams(searchParams);
  }

  function deleteURLParams(field) {
    searchParams.delete(field);
    setSearchParams(searchParams);
  }

  function resetURLParams() {
    setSearchParams({});
  }

  return { getURLParams, setURLParams, resetURLParams, deleteURLParams };
}
