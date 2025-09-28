import AddCabin from '../features/cabins/AddCabin';
import CabinTable from '../features/cabins/CabinTable';
import CabinTableOperations from '../features/cabins/CabinTableOperations';
import Heading from '../ui/Heading';
import Row from '../ui/Row';

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All bungalows</Heading>
        <CabinTableOperations />
      </Row>
      <Row type="vertical">
        <CabinTable />
      </Row>
      <Row type="vertical">
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
