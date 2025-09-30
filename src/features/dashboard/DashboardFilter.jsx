import { ENV } from '../../../config/env';
import Filter from '../../ui/Filter';

function DashboardFilter() {
  const filterOptions = ENV.DASHBOARD_DAYS_ARR.split(',').map((day) => {
    return { value: day, label: `Last ${day} days` };
  });

  return <Filter filterField="last" options={filterOptions} />;
}

export default DashboardFilter;
