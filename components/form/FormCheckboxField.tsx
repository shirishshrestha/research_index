import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormDescription,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Control, FieldPath, FieldValues } from "react-hook-form";

interface FormCheckboxFieldProps<
  TFieldValues extends FieldValues = FieldValues,
> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label?: string;
  description?: string;
  className?: string;
}

export const FormCheckboxField = <
  TFieldValues extends FieldValues = FieldValues,
>({
  control,
  name,
  label,
  description,
  className = "",
}: FormCheckboxFieldProps<TFieldValues>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={`flex flex-row items-start space-x-3 space-y-0 ${className}`}
        >
          <FormControl>
            <Checkbox
              checked={field.value as boolean}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            {label && <FormLabel>{label}</FormLabel>}
            {description && <FormDescription>{description}</FormDescription>}
          </div>
        </FormItem>
      )}
    />
  );
};
