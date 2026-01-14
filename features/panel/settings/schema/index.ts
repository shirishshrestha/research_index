import { z } from "zod";

export const changePasswordSchema = z
  .object({
    old_password: z
      .string()
      .min(1, { message: "Current password is required" }),
    new_password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirm_new_password: z.string(),
  })
  .refine((data) => data.new_password === data.confirm_new_password, {
    message: "Passwords do not match",
    path: ["confirm_new_password"],
  })
  .refine((data) => data.new_password !== data.old_password, {
    message: "New password must be different from current password",
    path: ["new_password"],
  });

export const deactivateAccountSchema = z.object({
  password: z.string().min(1, { message: "Password is required" }),
  confirm_deactivation: z.boolean().refine((val) => val === true, {
    message: "You must confirm account deactivation",
  }),
});

export const deleteAccountSchema = z.object({
  password: z.string().min(1, { message: "Password is required" }),
  confirm_deletion: z.string().refine((val) => val === "DELETE MY ACCOUNT", {
    message: 'You must type "DELETE MY ACCOUNT" to confirm',
  }),
});
