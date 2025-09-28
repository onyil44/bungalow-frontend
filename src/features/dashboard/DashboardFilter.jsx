import Filter from '../../ui/Filter';

function DashboardFilter() {
  const filterOptions = process.env.DASHBOARD_DAYS_ARR.split(',').map((day) => {
    return { value: day, label: `Last ${day} days` };
  });

  return <Filter filterField="last" options={filterOptions} />;
}

export default DashboardFilter;
