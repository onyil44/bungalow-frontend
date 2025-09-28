import { useMoveBack } from '../../hooks/useMoveBack';
import ButtonText from '../../ui/ButtonText';
import Empty from '../../ui/Empty';
import Heading from '../../ui/Heading';
import Row from '../../ui/Row';
import Spinner from '../../ui/Spinner';
import GuestDataBox from './GuestDataBox';
import { useGuest } from './useGuest';

function GuestDetail() {
  const { guest, isLoading: isGuestLoading } = useGuest();
  const moveBack = useMoveBack();

  if (isGuestLoading) return <Spinner />;
  if (!guest) return <Empty resourceName="guest" />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Guest Detail</Heading>
        <ButtonText onTap={moveBack}>&larr; Back</ButtonText>
      </Row>
      <GuestDataBox guest={guest} />
    </>
  );
}

export default GuestDetail;
