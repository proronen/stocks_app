import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const InputField = ({
  name,
  label,
  placeholder,
  type = "text",
  register,
  error,
  validation,
  disabled,
  value,
}: FormInputProps) => {
  return (
    <div className="my-4">
      <Label htmlFor={name} className="form-label">
        {label}
      </Label>
      <Input
        type={type}
        id={name}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        className={cn('form-input', {'opacity-50 cursor-not-allowed': disabled})}
        {...register(name, validation)}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
    </div>
  );
};

export default InputField;
