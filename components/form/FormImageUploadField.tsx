"use client";

import { useRef, useState } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Upload, X, ImageIcon } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { toast } from "sonner";

interface FormImageUploadFieldProps<
  TFieldValues extends FieldValues = FieldValues,
> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  description?: string;
  currentImageUrl?: string;
  aspectRatio?: "square" | "circle" | "wide";
  maxSize?: number; // in MB
  accept?: string;
}

export function FormImageUploadField<
  TFieldValues extends FieldValues = FieldValues,
>({
  control,
  name,
  label,
  description,
  currentImageUrl,
  aspectRatio = "square",
  maxSize = 5,
  accept = "image/jpeg,image/png,image/jpg,image/webp",
}: FormImageUploadFieldProps<TFieldValues>) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (file: File | null) => void,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      toast.error(`File size must be less than ${maxSize}MB`);
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    onChange(file);
  };

  const handleRemove = (onChange: (file: File | null) => void) => {
    setPreview(null);
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getAspectClasses = () => {
    switch (aspectRatio) {
      case "circle":
        return "w-32 h-32 rounded-full";
      case "wide":
        return "w-full h-40 rounded-lg";
      default:
        return "w-32 h-32 rounded-lg";
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { onChange, ...field } }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="space-y-4">
              {/* Preview */}
              <div className="flex items-start gap-4">
                {(preview || currentImageUrl) && (
                  <div
                    className={cn(
                      "relative overflow-hidden bg-gray-100",
                      getAspectClasses(),
                    )}
                  >
                    <Image
                      src={preview || currentImageUrl || ""}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                    {!currentImageUrl && (
                      <button
                        type="button"
                        onClick={() => handleRemove(onChange)}
                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )}

                {/* Upload Button */}
                {!preview && !currentImageUrl && (
                  <div
                    className={cn(
                      "flex flex-col items-center justify-center border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors cursor-pointer bg-gray-50",
                      getAspectClasses(),
                    )}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-xs text-gray-500 text-center px-2">
                      Click to upload
                    </span>
                  </div>
                )}
              </div>

              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept={accept}
                onChange={(e) => handleFileSelect(e, onChange)}
                className="hidden"
              />

              {/* Upload/Change Button */}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-4 h-4 mr-2" />
                {preview || currentImageUrl ? "Change Image" : "Upload Image"}
              </Button>
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
