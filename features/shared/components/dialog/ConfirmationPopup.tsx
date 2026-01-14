"use client";

import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ConfirmationPopupProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  cancelText?: string;
  confirmText?: string;
  onConfirm: () => void;
  isPending?: boolean;
  isSuccess?: boolean;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  variant?: "danger" | "primary" | "warning";
  autoClose?: boolean;
  loadingText?: string;
  triggerButton?: React.ReactNode;
}

export const ConfirmationPopup: React.FC<ConfirmationPopupProps> = ({
  title = "Confirm Action",
  description = "Are you sure you want to proceed?",
  icon,
  cancelText = "Cancel",
  confirmText = "Confirm",
  onConfirm,
  isPending = false,
  isSuccess = false,
  onOpenChange,
  open,
  variant = "danger",
  autoClose = true,
  loadingText = "Processing...",
  triggerButton,
}) => {
  useEffect(() => {
    if (isSuccess && autoClose) {
      const timer = setTimeout(() => {
        onOpenChange?.(false);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, onOpenChange, autoClose]);

  const getConfirmButtonStyles = () => {
    const baseStyles =
      "rounded-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed";

    switch (variant) {
      case "danger":
        return `${baseStyles} bg-red-500 hover:bg-red-600`;
      case "primary":
        return `${baseStyles} bg-primary text-primary-foreground shadow-xs hover:bg-primary/90`;
      case "warning":
        return `${baseStyles} bg-yellow-600 hover:bg-yellow-700`;
      default:
        return `${baseStyles} bg-red-500 hover:bg-red-600`;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="bg-card flex flex-col items-center gap-2"
      >
        {icon && <div className="shrink-0">{icon}</div>}
        <div className="flex items-center">
          <DialogTitle className="text-lg font-semibold leading-6">
            {title}
          </DialogTitle>
        </div>

        <DialogDescription className="mb-2 text-sm text-center leading-5 max-w-[80%]">
          {description}
        </DialogDescription>

        <div className="flex justify-end gap-3">
          <Button
            onClick={() => onOpenChange?.(false)}
            type="button"
            variant="outline"
            className="px-4 py-2 rounded-sm font-medium disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={isPending || isSuccess}
          >
            {cancelText}
          </Button>

          <Button
            type="button"
            className={getConfirmButtonStyles()}
            disabled={isPending || isSuccess}
            onClick={onConfirm}
          >
            {isPending ? (
              <div className="flex items-center">
                <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                {loadingText}
              </div>
            ) : (
              confirmText
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
