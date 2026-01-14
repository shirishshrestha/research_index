"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormInputField } from "@/components/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDeleteAccountMutation } from "../hooks";
import type { DeleteAccountRequest } from "../types";
import { deleteAccountSchema } from "../schema";

export function DeleteAccountForm() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<DeleteAccountRequest>({
    resolver: zodResolver(deleteAccountSchema),
    defaultValues: {
      password: "",
      confirm_deletion: "",
    },
  });

  const deleteMutation = useDeleteAccountMutation(form);

  function onSubmit(values: DeleteAccountRequest) {
    deleteMutation.mutate(values);
  }

  return (
    <Card className="border-red-200">
      <CardHeader>
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          <CardTitle className="text-destructive">Delete Account</CardTitle>
        </div>
        <CardDescription>
          Permanently delete your account and all associated data. This action
          cannot be undone!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-destructive">
                Warning: This action is irreversible!
              </p>
              <ul className="list-disc list-inside text-sm text-destructive mt-2 space-y-1">
                <li>Your account will be permanently deleted</li>
                <li>All your data will be removed from our servers</li>
                <li>This action cannot be undone</li>
                <li>
                  You will need to create a new account if you want to use our
                  services again
                </li>
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

            <FormInputField
              control={form.control}
              name="confirm_deletion"
              type="text"
              label='Type "DELETE MY ACCOUNT" to confirm'
              placeholder="DELETE MY ACCOUNT"
            />

            <Button
              type="submit"
              variant="destructive"
              disabled={deleteMutation.isPending}
              className="w-full sm:w-auto"
            >
              {deleteMutation.isPending
                ? "Deleting Account..."
                : "Delete Account Permanently"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
