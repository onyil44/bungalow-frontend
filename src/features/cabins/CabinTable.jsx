import Spinner from '../../ui/Spinner.jsx';
import CabinRow from './CabinRow.jsx';
import { useCabins } from './useCabins.js';
import Table from '../../ui/Table.jsx';
import Menus from '../../ui/Menus.jsx';
import { useMediaQuery } from '../../hooks/useMediaQuery.js';
import { useURL } from '../../hooks/useURL.js';
import Empty from '../../ui/Empty.jsx';
import { device } from '../../styles/bereakingPoints.js';

function CabinTable() {
  const { isPending, cabins } = useCabins();
  const { getURLParams } = useURL();
  const isMobileLorSmaller = useMediaQuery(device.mobileL);

  // 1)Filter cabins
  const filterValue = getURLParams('discount') || 'all';

  let filteredCabins;

  if (filterValue === 'all') {
    filteredCabins = cabins;
  } else if (filterValue === 'no-discount') {
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  } else if (filterValue === 'with-discount') {
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  }

  // 2)Sort cabins
  const sortBy = getURLParams('sortBy') || 'name-asc';

  const [sortField, direction] = sortBy.split('-');
  const directionModifier = direction === 'asc' ? 1 : -1;

  let sortedCabins = filteredCabins?.sort((a, b) => {
    let sortData;

    if (typeof a[sortField] === 'string') {
      sortData =
        a[sortField === 'name' ? 'nameLowerCase' : sortField] <
        b[sortField === 'name' ? 'nameLowerCase' : sortField]
          ? -1
          : 1;
    } else if (typeof a[sortField] === 'number') {
      sortData = a[sortField] - b[sortField];
    }
    return sortData * directionModifier;
  });

  if (isPending) return <Spinner />;

  if (!cabins.length) return <Empty resourceName="cabins" />;

  let tableColumns = '0.6fr 1.8fr 2.2fr 1fr 1fr 1fr';

  if (isMobileLorSmaller) tableColumns = '0.6fr 1.8fr 2.2fr 1fr';

  return (
    <Menus>
      <Table columns={tableColumns}>
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          {isMobileLorSmaller ? null : (
            <>
              <div>Price</div>
              <div>Discount</div>
            </>
          )}
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin._id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
