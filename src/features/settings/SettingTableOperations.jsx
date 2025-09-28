import Filter from "../../ui/Filter.jsx";

function SettingTableOperations() {
  return (
    <Filter
      filterField="status"
      options={[
        { value: "all", label: "All" },
        { value: "active", label: "Active" },
        { value: "passive", label: "Passive" },
      ]}
    />
  );
}

export default SettingTableOperations;
