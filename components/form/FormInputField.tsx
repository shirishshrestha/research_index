import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { ReactNode } from "react";

interface FormInputFieldProps<TFieldValues extends FieldValues = FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  placeholder?: string;
  label?: string;
  className?: string;
  description?: string;
  form_classname?: string;
  maxLength?: number;
  type?: string;
  children?: ReactNode;
}

export const FormInputField = <TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  placeholder,
  label,
  className = "",
  description,
  form_classname = "",
  maxLength,
  children,
  ...props
}: FormInputFieldProps<TFieldValues>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={form_classname}>
          {label && <FormLabel className="">{label}</FormLabel>}
          <FormControl>
            <div className="relative">
              <Input
                placeholder={placeholder}
                className={`${className} `}
                maxLength={maxLength}
                {...field}
                {...props}
              />
              {children}
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage className="text-destructive" />
        </FormItem>
      )}
    />
  );
};
