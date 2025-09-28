import styled from 'styled-components';
import Row from '../../ui/Row';
import Tag from '../../ui/Tag';
import { useMoveBack } from '../../hooks/useMoveBack';
import BookingDataBox from './BookingDataBox';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import Heading from '../../ui/Heading';
import Empty from '../../ui/Empty';
import ButtonText from '../../ui/ButtonText';
import Spinner from '../../ui/Spinner';
import { useURL } from '../../hooks/useURL';
import { useBookingWithPnr } from './useBookingWithPnr';

const StyledWebPageDetail = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 0 2rem;
`;

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function WebPageBookingDetail() {
  const { getURLParams } = useURL();
  const [urlPnrCode, email, nationalId] = [
    getURLParams('pnrCode'),
    getURLParams('email'),
    getURLParams('nationalId'),
  ];

  const { booking, isPnrBookingLoading } = useBookingWithPnr(
    urlPnrCode,
    email,
    nationalId,
  );

  const isLoading = isPnrBookingLoading;

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  const moveBack = useMoveBack();

  if (isLoading) return <Spinner />;
  if (!booking)
    return (
      <StyledWebPageDetail>
        <Empty resourceName="booking" />
        <ButtonGroup>
          <ButtonText onTap={moveBack}>&larr; Back</ButtonText>
        </ButtonGroup>
      </StyledWebPageDetail>
    );

  const { pnrCode, status } = booking;

  return (
    <StyledWebPageDetail>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking PNR Code {pnrCode}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
        </HeadingGroup>
        <ButtonText onTap={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Button $variation="secondary" onTap={moveBack} $size="medium">
          Back
        </Button>
      </ButtonGroup>
    </StyledWebPageDetail>
  );
}

export default WebPageBookingDetail;
