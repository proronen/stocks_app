import { Button } from "../ui/button";
import { Controller } from "react-hook-form";
import { Label } from "../ui/label";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useState } from "react";
import { ChevronsUpDown } from "lucide-react";

const SelectWithSearch = ({
  name,
  label,
  placeholder,
  options,
  control,
  error,
  required = false,
  noResults = "No results found",
}: SelectFieldProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="my-2">
      <Label htmlFor={name} className="form-label">
        {label}
      </Label>

      <Controller
        name={name}
        control={control}
        rules={{
          required: required ? `Please select ${label.toLowerCase}` : false,
        }}
        render={({ field }) => (
          <>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="country-select-trigger"
                >
                  {field.value ? (
                    <span className="flex items-center gap-2">
                      {/* <span>{getFlagEmoji(field.)}</span> */}
                      <span>
                        {options.find((c) => c.value === field.value)?.label}
                      </span>
                    </span>
                  ) : placeholder }
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-[485px] p-0">
                <Command>
                  <CommandInput placeholder={placeholder} className="w-full" />
                  <CommandList>
                    <CommandEmpty>{noResults}</CommandEmpty>
                    {options.map((option) => (
                      <CommandItem
                        onSelect={() => {
                          field.onChange(option.value);
                          setOpen(false);
                        }}
                        value={option.value}
                        key={option.label}
                        className="focus:bg-gray-500 focus:text-white"
                      >
                        {option.label}
                      </CommandItem>
                    ))}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </>
        )}
      />
    </div>
  );
};

export default SelectWithSearch;
