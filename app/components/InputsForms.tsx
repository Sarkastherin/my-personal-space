import {
  Checkbox,
  Label,
  Select,
  TextInput,
  ToggleSwitch,
} from "flowbite-react";
import type {
  TextInputProps,
  SelectProps,
  CheckboxProps,
  ToggleSwitchProps,
} from "flowbite-react";
import { useEffect, useState, type InputHTMLAttributes } from "react";
import { FaMoneyBillAlt } from "react-icons/fa";
function SpanError({ error }: { error: string }) {
  return (
    <span className="block text-red-600 dark:text-red-400 text-xs">
      {error}
    </span>
  );
}
function LabelComponent({
  htmlFor,
  label,
}: {
  htmlFor?: string;
  label?: string;
}) {
  return (
    <Label
      htmlFor={htmlFor}
      className={`${!label ? "sr-only" : "block text-gray-600 dark:text-gray-300 font-semibold"}`}
    >
      {label}
    </Label>
  );
}
type CommonInputsProps = { label?: string; error?: string };
type InputsFormsProps = TextInputProps & CommonInputsProps;
type SelectInputsProps = SelectProps & CommonInputsProps;
type CurrencyInputProps = {
  label: string;
  value?: number;
  onChange: (value: number | "") => void;
  error?: string;
  [key: string]: any;
};
export const Input = ({ id, label, error, type = "text", ...props }: InputsFormsProps) => {
  return (
    <div className="space-y-1.5">
      <LabelComponent htmlFor={id} label={label} />
      <TextInput id={id} type={type} {...props} />
      {error && <SpanError error={error} />}
    </div>
  );
};
export const InputWithIcon = ({
  id,
  label,
  error,
  icon: Icon,
  ...props
}: InputsFormsProps & {
  icon: React.ComponentType<{ className?: string }>;
}) => {
  return (
    <div className="space-y-1.5">
      <LabelComponent htmlFor={id} label={label} />
      <div className="relative">
        <TextInput id={id} type="number" {...props} />
        <div className="absolute inset-y-0 end-0 top-0 flex items-center px-3 pointer-events-none border-l border-gray-300 dark:border-gray-600 bg-gray-300/50 dark:bg-gray-700/50 rounded-tr-md rounded-br-md text-gray-500 dark:text-gray-400">
          <Icon className="size-5" />
        </div>
      </div>
      {error && <SpanError error={error} />}
    </div>
  );
};
export const SelectInput = ({
  id,
  label,
  error,
  ...props
}: SelectInputsProps) => {
  return (
    <div className="space-y-1.5">
      <LabelComponent htmlFor={id} label={label} />
      <Select id={id} {...props}>
        {props.children}
      </Select>
      {error && <SpanError error={error} />}
    </div>
  );
};
export const CurrencyInput = ({
  label,
  value,
  onChange,
  error,
  ...props
}: CurrencyInputProps) => {
  const [displayValue, setDisplayValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const formatCurrency = (value: number | string | undefined): string => {
    if (!value) return "";
    const numericValue = parseFloat(value.toString());
    if (isNaN(numericValue)) return "";

    return new Intl.NumberFormat("es-AR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numericValue);
  };

  const parseCurrency = (formattedValue: string): string => {
    return formattedValue.replace(/\./g, "").replace(/,/g, ".");
  };

  useEffect(() => {
    if (value !== undefined && !isFocused) {
      setDisplayValue(formatCurrency(value));
    }
  }, [value, isFocused]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Solo permitir números, punto y coma
    if (/^[\d.,]*$/.test(inputValue) || inputValue === "") {
      setDisplayValue(inputValue);

      if (inputValue === "") {
        onChange("");
      } else {
        const numericValue = parseCurrency(inputValue);
        const parsedValue = parseFloat(numericValue);
        if (!isNaN(parsedValue)) {
          onChange(parsedValue);
        }
      }
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    // Al enfocar, mostrar solo números sin formato para facilitar edición
    if (value) {
      setDisplayValue(value.toString());
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (displayValue) {
      const numericValue = parseFloat(parseCurrency(displayValue));
      if (!isNaN(numericValue)) {
        setDisplayValue(formatCurrency(numericValue));
        onChange(numericValue);
      }
    } else {
      setDisplayValue("");
      onChange("");
    }
  };
  return (
    <InputWithIcon
      id={props.id}
      label={label}
      error={error}
      type="text"
      value={displayValue}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...props}
      icon={FaMoneyBillAlt}
    />
  );
};
export const ToggleCheckbox = ({ checked, onChange, label }: ToggleSwitchProps & { label: string }) => {
  const handleChange = (checked: boolean) => {
    onChange?.(checked);
  };
  return (
    <div className="flex items-center gap-2 mb-4">
      <ToggleSwitch checked={checked} color="blue" onChange={handleChange} />
      <LabelComponent label={label} />
    </div>
  );
};
