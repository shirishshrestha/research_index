"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormInputField } from "@/components/form";
import { useChangePasswordMutation } from "../hooks";
import type { ChangePasswordRequest } from "../types";
import { Card } from "@/components/ui/card";
import { changePasswordSchema } from "../schema";

export function ChangePasswordForm() {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<ChangePasswordRequest>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      old_password: "",
      new_password: "",
      confirm_new_password: "",
    },
  });

  const changePasswordMutation = useChangePasswordMutation(form);

  function onSubmit(values: ChangePasswordRequest) {
    changePasswordMutation.mutate(values);
  }

  return (
    <Card className="px-6">
      <h3 className="text-xl font-semibold ">Change Password</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormInputField
            control={form.control}
            name="old_password"
            type={showOldPassword ? "text" : "password"}
            label="Current Password"
            placeholder="Enter your current password"
            className="pr-10"
            form_classname="relative"
          >
            <button
              type="button"
              onClick={() => setShowOldPassword(!showOldPassword)}
              className="absolute right-3 top-3.75 text-gray-500 hover:text-gray-700"
            >
              {showOldPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </FormInputField>

          <FormInputField
            control={form.control}
            name="new_password"
            type={showNewPassword ? "text" : "password"}
            label="New Password"
            placeholder="Enter your new password"
            className="pr-10"
            form_classname="relative"
          >
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-3.75 text-gray-500 hover:text-gray-700"
            >
              {showNewPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </FormInputField>

          <FormInputField
            control={form.control}
            name="confirm_new_password"
            type={showConfirmPassword ? "text" : "password"}
            label="Confirm New Password"
            placeholder="Confirm your new password"
            className="pr-10"
            form_classname="relative"
          >
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3.75 text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </FormInputField>

          <Button
            type="submit"
            disabled={changePasswordMutation.isPending}
            className="w-full sm:w-auto"
          >
            {changePasswordMutation.isPending
              ? "Changing Password..."
              : "Change Password"}
          </Button>
        </form>
      </Form>
    </Card>
  );
}
