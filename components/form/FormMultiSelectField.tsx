import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
  FormDescription,
} from "@/components/ui/form";
import {
  MultiSelect,
  MultiSelectTrigger,
  MultiSelectValue,
  MultiSelectContent,
  MultiSelectItem,
} from "@/components/ui/multi-select";
import { Control, FieldPath, FieldValues } from "react-hook-form";

interface FormMultiSelectFieldProps<
  TFieldValues extends FieldValues = FieldValues,
> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  placeholder?: string;
  label?: string;
  description?: string;
  form_classname?: string;
  options: { value: string; label: string }[];
  disabled?: boolean;
  search?: boolean | { placeholder?: string; emptyMessage?: string };
}

/**
 * Renders a form multi-select field integrated with React Hook Form.
 */
export const FormMultiSelectField = <
  TFieldValues extends FieldValues = FieldValues,
>({
  control,
  name,
  placeholder,
  label,
  description,
  form_classname = "",
  options,
  disabled = false,
  search = true,
}: FormMultiSelectFieldProps<TFieldValues>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={form_classname}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <MultiSelect
              values={field.value as string[] | undefined}
              onValuesChange={(values) => field.onChange(values)}
              single={false}
            >
              <MultiSelectTrigger>
                <MultiSelectValue placeholder={placeholder} />
              </MultiSelectTrigger>
              <MultiSelectContent search={search}>
                {options.map((option) => (
                  <MultiSelectItem key={option.value} value={option.value}>
                    {option.label}
                  </MultiSelectItem>
                ))}
              </MultiSelectContent>
            </MultiSelect>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage className="text-destructive" />
        </FormItem>
      )}
    />
  );
};
