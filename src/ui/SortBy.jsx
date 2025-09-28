import { useURL } from "../hooks/useURL";
import Select from "./Select";

function SortBy({ options, type }) {
  const { getURLParams, setURLParams } = useURL();

  const sortValue = getURLParams("sortBy") || options.at(0)["value"];

  function handleOnChange(e) {
    setURLParams("sortBy", e.target.value);
  }

  return (
    <Select
      onChange={handleOnChange}
      options={options}
      value={sortValue}
      type={type}
    />
  );
}

export default SortBy;
