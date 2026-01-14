"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormInputField } from "@/components/form";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDeactivateAccountMutation } from "../hooks";
import type { DeactivateAccountRequest } from "../types";
import { deactivateAccountSchema } from "../schema";

export function DeactivateAccountForm() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<DeactivateAccountRequest>({
    resolver: zodResolver(deactivateAccountSchema),
    defaultValues: {
      password: "",
      confirm_deactivation: false,
    },
  });

  const deactivateMutation = useDeactivateAccountMutation(form);

  function onSubmit(values: DeactivateAccountRequest) {
    deactivateMutation.mutate(values);
  }

  return (
    <Card className="border-yellow-200 ">
      <CardHeader>
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-yellow-600" />
          <CardTitle className="text-yellow-600">Deactivate Account</CardTitle>
        </div>
        <CardDescription>
          Temporarily deactivate your account. You can reactivate it by
          contacting support.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                When you deactivate your account:
              </p>
              <ul className="list-disc list-inside text-sm text-yellow-800 mt-2 space-y-1">
                <li>You will be logged out immediately</li>
                <li>Your profile will no longer be visible</li>
                <li>Your data will be preserved</li>
                <li>Contact support to reactivate your account</li>
              </ul>
            </div>

            <FormInputField
              control={form.control}
              name="password"
              type={showPassword ? "text" : "password"}
              label="Confirm Password"
              placeholder="Enter your password to confirm"
              className="pr-10"
              form_classname="relative"
            >
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.75 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </FormInputField>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="confirm_deactivation"
                checked={form.watch("confirm_deactivation")}
                onCheckedChange={(checked) =>
                  form.setValue("confirm_deactivation", checked as boolean)
                }
              />
              <label
                htmlFor="confirm_deactivation"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I understand that my account will be deactivated
              </label>
            </div>
            {form.formState.errors.confirm_deactivation && (
              <p className="text-sm text-destructive">
                {form.formState.errors.confirm_deactivation.message}
              </p>
            )}

            <Button
              type="submit"
              variant="destructive"
              disabled={deactivateMutation.isPending}
              className="w-full sm:w-auto bg-yellow-600 hover:bg-yellow-700"
            >
              {deactivateMutation.isPending
                ? "Deactivating..."
                : "Deactivate Account"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
