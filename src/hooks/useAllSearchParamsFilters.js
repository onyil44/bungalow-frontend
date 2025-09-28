import { useLocation } from 'react-router';

export function useAllSearchParamsFilter() {
  // all search params in URL copied to search variable (with ?) as a String
  const { search } = useLocation();

  // (?) excluded from search params String and String value converted an array splitted from (&)
  const allParamsArr = search.substring(1).split('&');

  // params which started with 'sortBy, page, limit' filtered from array as these params are not related with filtering. An filters array was created. the filters array consists of filter objects {filter, value, method}

  const excludedFields = ['sortBy', 'page', 'limit'];

  const filtersArr = allParamsArr
    ?.map((param) => {
      const splitFromEq = param.split('=');
      if (excludedFields.includes(splitFromEq[0])) return null;
      const value =
        splitFromEq[0].includes('startDate') ||
        splitFromEq[0].includes('endDate')
          ? new Date(+splitFromEq[1]).toISOString()
          : splitFromEq[1];
      let filter = null;
      let method = null;

      if (splitFromEq[0].includes('[')) {
        filter = splitFromEq[0].split('[')[0];
        method = splitFromEq[0].split('[')[1].replaceAll(']', '');
      } else {
        filter = splitFromEq[0];
      }

      return { filter, value, method };
    })
    .filter((param) => param !== null);
  // filters array converted to sitring like status=...&totalPrice[gte]=...
  const filter =
    filtersArr
      ?.map((filterObj) => {
        if (!filterObj.filter) return null;
        return filterObj.value !== 'all'
          ? filterObj.method
            ? `${filterObj.filter}[${filterObj.method}]=${filterObj.value}`
            : `${filterObj.filter}=${filterObj.value}`
          : '';
      })
      .filter((el) => el !== null)
      .join('&') || '';

  return { filter };
}
