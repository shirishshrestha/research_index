import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TagInput } from "@/components/ui/tag-input";

interface FormTagInputFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  description?: string;
  className?: string;
  maxLength?: number;
  disabled?: boolean;
}

export function FormTagInputField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  description,
  className,
  maxLength = 50,
  disabled = false,
}: FormTagInputFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <TagInput
              value={field.value || []}
              onChange={field.onChange}
              placeholder={placeholder}
              maxLength={maxLength}
              disabled={disabled}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
