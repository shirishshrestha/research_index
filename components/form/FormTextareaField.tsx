import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
  FormDescription,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Control, FieldPath, FieldValues } from "react-hook-form";

interface FormTextareaFieldProps<
  TFieldValues extends FieldValues = FieldValues
> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  placeholder?: string;
  label?: string;
  className?: string;
  description?: string;
  form_classname?: string;
  maxLength?: number;
  showCounter?: boolean;
}

export const FormTextareaField = <
  TFieldValues extends FieldValues = FieldValues
>({
  control,
  name,
  placeholder,
  label,
  className = "",
  description,
  form_classname = "",
  maxLength,
  showCounter = false,
  ...props
}: FormTextareaFieldProps<TFieldValues>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={`${form_classname}`}>
          {label && <FormLabel className="mb-3.75">{label}</FormLabel>}
          <FormControl>
            <div className="relative">
              <Textarea
                placeholder={placeholder}
                className={`${className} min-h-[200px] ${
                  showCounter && maxLength ? "pr-16" : ""
                }`}
                maxLength={maxLength}
                {...field}
                {...props}
              />
              {showCounter && maxLength && (
                <span className="absolute right-3 top-3 bg-primary text-white text-xs font-medium px-2 py-1 rounded">
                  {maxLength - (field.value?.length || 0)}
                </span>
              )}
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage className="text-destructive" />
        </FormItem>
      )}
    />
  );
};
