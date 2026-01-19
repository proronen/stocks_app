import { Controller } from "react-hook-form";
import { Label } from "../ui/label";
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
  SelectLabel,
} from "../ui/select";

const SelectField = ({
  name,
  label,
  placeholder,
  options,
  control,
  error,
  required = false,
}: SelectFieldProps) => {

  return (
    <div className="my-2">
      <Label htmlFor={name} className="form-label">
        {label}
      </Label>

      <Controller
        name={name}
        control={control}
        rules={{
          required: required ? `Please select ${label.toLowerCase()}` : false,
        }}
        render={({ field }) => (
           <>
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger className="select-trigger">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="mt-10 bg-gray-800  border=gray-600 text-white">
              {options.map((option) => (
                <SelectItem value={option.value} key={option.label} className="focus:bg-gray-500 focus:text-white">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
        </>
        )}
      />
    </div>
  );
};

export default SelectField;
