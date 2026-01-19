import { countries } from "countries-list";
import { useMemo, useState } from "react";
import SelectWithSearch from "./forms/SelectWithSearch";

const CountriesList = ({
  name,
  label,
  placeholder,
  error,
  control,
}: Omit<SelectFieldProps, "options">) => {
  const options = useMemo(() => {
    const countryCodes = Object.keys(countries);
    return Object.values(countries).map((item, i) => ({
      label: item.name,
      value: countryCodes[i],
    }));
  }, []);

  const getFlagEmoji = (countryCode: string) => {
    if(!countryCode) return;
    console.log('====================================');
    console.log(countryCode);
    console.log('====================================');
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints)  as unknown as void;
};

  return (
    <SelectWithSearch
      name={name}
      label={label}
      placeholder={placeholder}
      options={options}
      control={control}
      error={error}
    />
  );
};

export default CountriesList;
