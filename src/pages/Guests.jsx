import GuestSearchOperations from '../features/guests/GuestSearchoperations';
import GuestsTable from '../features/guests/GuestsTable';
import GuestsTableOperations from '../features/guests/GuestsTableOperations';
import Heading from '../ui/Heading';
import Row from '../ui/Row';

function Guests() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Guests</Heading>
        <GuestsTableOperations />
      </Row>
      <Row type="horizantal">
        <GuestSearchOperations />
      </Row>
      <Row type="vertical">
        <GuestsTable />
      </Row>
    </>
  );
}

export default Guests;
