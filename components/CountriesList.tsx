import { countries } from "countries-list";
import SelectWithSearch from "./forms/SelectWithSearch";

const countryCodes = Object.keys(countries);
const COUNTRY_OPTIONS = Object.values(countries).map((item, i) => ({
  label: item.name,
  value: countryCodes[i],
}));

const CountriesList = ({
  name,
  label,
  placeholder,
  error,
  control,
}: Omit<SelectFieldProps, "options">) => {
  return (
    <SelectWithSearch
      name={name}
      label={label}
      placeholder={placeholder}
      options={COUNTRY_OPTIONS}
      control={control}
      error={error}
    />
  );
};

export default CountriesList;