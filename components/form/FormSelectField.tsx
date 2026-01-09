import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Control, FieldPath, FieldValues } from "react-hook-form";

interface FormSelectFieldProps<TFieldValues extends FieldValues = FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  placeholder?: string;
  label?: string;
  description?: string;
  form_classname?: string;
  options: { value: string; label: string }[];
  disabled?: boolean;
}

/**
 * Renders a form select field integrated with React Hook Form.
 *
 * @template TFieldValues - The type of the form values managed by React Hook Form.
 * @param props - The props for the FormSelectField component.
 * @param props.control - The control object from React Hook Form for managing form state.
 * @param props.name - The name of the field in the form.
 * @param props.placeholder - Placeholder text displayed when no option is selected.
 * @param props.label - Optional label displayed above the select field.
 * @param props.description - Optional description displayed below the select field.
 * @param props.form_classname - Optional additional class name(s) for the form item container.
 * @param props.options - Array of options to display in the select dropdown. Each option should have a `value` and `label`.
 * @param props.disabled - If true, disables the select field.
 * @returns A form select field component with label, description, validation message, and options.
 */
export const FormSelectField = <
  TFieldValues extends FieldValues = FieldValues
>({
  control,
  name,
  placeholder,
  label,
  description,
  form_classname = "",
  options,
  disabled = false,
}: FormSelectFieldProps<TFieldValues>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={form_classname}>
          {label && <FormLabel className="">{label}</FormLabel>}
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            disabled={disabled}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage className="text-destructive" />
        </FormItem>
      )}
    />
  );
};
