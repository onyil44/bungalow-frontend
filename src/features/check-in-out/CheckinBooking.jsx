import styled from 'styled-components';
import BookingDataBox from '../../features/bookings/BookingDataBox';

import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';
import Checkbox from '../../ui/Checkbox';

import { useMoveBack } from '../../hooks/useMoveBack';
import { useBooking } from '../bookings/useBooking';
import Spinner from '../../ui/Spinner';
import { useEffect, useState } from 'react';
import { useUpdateBooking } from '../bookings/useUpdateBooking';
import { useSettings } from '../settings/useSettings';
import { formatCurrency } from '../../utils/helpers';
import { useNavigate } from 'react-router';

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const { booking, isLoading } = useBooking();
  const { updateBooking, isUpdating } = useUpdateBooking();
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { settings, isLoading: isSettingsLoading } = useSettings(true);

  useEffect(
    function () {
      setConfirmPaid(booking?.isPaid ?? false);
    },
    [booking?.isPaid],
  );

  useEffect(
    function () {
      setAddBreakfast(booking?.hasBreakfast ?? false);
    },
    [booking?.hasBreakfast],
  );

  useEffect(function () {
    if (booking?.status === 'checked-in')
      navigate(`/admin/bookings/${bookingId}`);
  });

  if (isLoading || isSettingsLoading) return <Spinner />;

  const {
    _id: bookingId,
    guestId,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  let calculatedTotalPrice = totalPrice;
  const currentBreakfastPrice =
    parseFloat(booking?.extraPrice?.toString()) ||
    parseFloat(settings?.at(0).breakfastPrice?.toString()) *
      numGuests *
      numNights;

  if (hasBreakfast && !addBreakfast)
    calculatedTotalPrice =
      parseFloat(totalPrice.toString()) - currentBreakfastPrice;
  if (!hasBreakfast && addBreakfast)
    calculatedTotalPrice =
      parseFloat(totalPrice.toString()) + currentBreakfastPrice;

  function handleCheckin() {
    if (!confirmPaid) return;
    const dataObj = {
      bookingId,
      status: 'checked-in',
      isPaid: confirmPaid,
      extraPrice: addBreakfast ? currentBreakfastPrice : null,
      hasBreakfast: addBreakfast,
    };
    updateBooking(dataObj, {
      onSuccess: () => {
        navigate(`/admin/bookings/${bookingId}`, { replace: true });
      },
    });
  }

  function handleAddRemoveBreakfast() {
    if (booking.isPaid) return;
    setAddBreakfast((addBreakfast) => !addBreakfast);
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onTap={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <Checkbox
          checked={addBreakfast}
          onChange={handleAddRemoveBreakfast}
          disabled={booking.isPaid || isSettingsLoading}
          id="breakfast"
        >
          Want to add breakfast for {formatCurrency(currentBreakfastPrice)}{' '}
          (Total Price:
          {formatCurrency(calculatedTotalPrice)})?
        </Checkbox>
      </Box>

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirmPaid) => !confirmPaid)}
          disabled={booking?.isPaid}
          id="checkin"
        >
          {guestId.fullName} has paid the all amount.
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button
          onTap={handleCheckin}
          $variation="blue"
          $size="medium"
          disabled={!booking?.isPaid && !confirmPaid}
        >
          {isUpdating ? 'Chechking in...' : 'Check in'} booking #{bookingId}
        </Button>
        <Button $variation="secondary" $size="medium" onTap={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
