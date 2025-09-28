import { formatCurrency } from '../../utils/helpers.js';
import Table from '../../ui/Table.jsx';
import { useURL } from '../../hooks/useURL.js';
import Empty from '../../ui/Empty.jsx';

function SettingsTable({ settings }) {
  const { getURLParams } = useURL();
  const filteredValue = getURLParams('status') || 'all';

  let filteredSettings;

  if (filteredValue === 'all') filteredSettings = settings;
  if (filteredValue === 'active')
    filteredSettings = settings.filter((setting) => setting.isActive);
  if (filteredValue === 'passive')
    filteredSettings = settings.filter((setting) => !setting.isActive);

  if (!settings.length) return <Empty resourceName="settings" />;

  return (
    <Table columns="repeat(5, minmax(0,2fr)) minmax(0,1fr)">
      <Table.Header role="row">
        <div>Minimum Nights</div>
        <div>Maximum Nights</div>
        <div>Maximum Guests</div>
        <div>Breakfast Price</div>
        <div>Date</div>
        <div>Status</div>
      </Table.Header>
      <Table.Body
        data={filteredSettings?.sort((a, b) => b.isActive - a.isActive)}
        render={(setting) => (
          <Table.Row
            role="row"
            key={setting._id}
            variation={setting.isActive ? 'active' : 'passive'}
          >
            <Table.Cell>{setting.minBookingLength}</Table.Cell>
            <Table.Cell>{setting.maxBookingLength}</Table.Cell>
            <Table.Cell>{setting.maxGuestsPerBooking}</Table.Cell>
            <Table.Cell>{formatCurrency(setting.breakfastPrice)}</Table.Cell>
            <Table.Cell>
              {new Date(setting.createdAt).toLocaleDateString('fr-FR')}
            </Table.Cell>
            <Table.Cell>{setting.isActive ? 'Active' : 'Passive'}</Table.Cell>
          </Table.Row>
        )}
      />
    </Table>
  );
}

export default SettingsTable;
