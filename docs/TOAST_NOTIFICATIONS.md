# Toast Notifications Implementation

## Overview

Implemented Sonner toast notifications for all authentication pages, replacing error divs with elegant toast messages.

## Setup

### 1. Installation

```bash
pnpm add sonner
```

### 2. Add Toaster to Layout

[app/layout.tsx](../app/layout.tsx):

```tsx
import { Toaster } from "sonner";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
```

## Features

### ✅ Field-Specific Errors

Backend validation errors are automatically mapped to form fields:

```typescript
// Backend returns:
{
  "email": ["This email is already registered"],
  "password": ["Password is too weak"]
}

// Automatically shown as form field errors
```

### ✅ General Error Messages

Non-field errors are shown as toast notifications:

```typescript
// If no field errors, show general toast
toast.error("Registration failed. Please try again.");
```

### ✅ Success Messages

Success toasts appear on successful operations:

```typescript
toast.success("Login successful! Redirecting...");
toast.success("Registration successful! Welcome aboard!");
toast.success("Logged out successfully");
```

## Implementation Details

### Mutation Hooks

All auth mutation hooks now accept an optional `form` parameter:

[features/auth/hooks/mutations/index.ts](../features/auth/hooks/mutations/index.ts):

```typescript
export function useLoginMutation(form?: FormWithSetError) {
  return usePost<LoginResponse, LoginRequest>(AUTH_ENDPOINTS.LOGIN, {
    onSuccess: (data) => {
      // Dispatch Redux action
      dispatch(setCredentials({ user: data.user, tokens: data.tokens }));
      // Show success toast
      toast.success("Login successful! Redirecting...");
      // Navigate
      router.push("/");
    },
    onError: (error) => {
      const axiosError = error as AxiosError<Record<string, string[]>>;
      const data = axiosError?.response?.data;

      if (data && typeof data === "object" && form) {
        let hasFieldError = false;

        // Map errors to form fields
        Object.entries(data).forEach(([field, messages]) => {
          if (Array.isArray(messages)) {
            form.setError(field, { message: messages.join(" ") });
            hasFieldError = true;
          }
        });

        // If no field errors, show general toast
        if (!hasFieldError) {
          toast.error("Login failed. Please check your credentials.");
        }
      } else {
        toast.error("Login failed. Please try again.");
      }
    },
  });
}
```

### Field Name Mapping

Backend field names are mapped to frontend form field names:

```typescript
const fieldMap: Record<string, string> = {
  full_name: "fullName",
  confirm_password: "confirmPassword",
  institution_name: "institutionName",
};
const formField = fieldMap[field] || field;
form.setError(formField, { message: messages.join(" ") });
```

### Usage in Components

[app/(auth)/login/page.tsx](<../app/(auth)/login/page.tsx>):

```tsx
export default function LoginPage() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  // Pass form to mutation hook
  const loginMutation = useLoginMutation(form);

  function onSubmit(values) {
    loginMutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* No error div needed - errors shown as toasts */}
        <FormInputField control={form.control} name="email" />
        <FormInputField control={form.control} name="password" />
        <Button type="submit" disabled={loginMutation.isPending}>
          {loginMutation.isPending ? "Logging in..." : "Login"}
        </Button>
      </form>
    </Form>
  );
}
```

## Error Handling Flow

```
┌─────────────────────────────────────┐
│  Backend API Error Response         │
│  {                                  │
│    "email": ["Already exists"],     │
│    "password": ["Too weak"]         │
│  }                                  │
└────────────────┬────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────┐
│  Mutation onError Handler           │
│  - Parse error response             │
│  - Check if field-specific          │
└────────────────┬────────────────────┘
                 │
          ┌──────┴──────┐
          │             │
          ▼             ▼
┌──────────────┐ ┌─────────────┐
│ Field Errors │ │ General     │
│              │ │ Errors      │
│ form.setError│ │ toast.error │
│ (shows under │ │ (shows as   │
│  input)      │ │  toast)     │
└──────────────┘ └─────────────┘
```

## Pages Updated

### ✅ Login Page

- [app/(auth)/login/page.tsx](<../app/(auth)/login/page.tsx>)
- Shows field errors + success toast

### ✅ Author Signup

- [app/(auth)/signup/author/page.tsx](<../app/(auth)/signup/author/page.tsx>)
- Maps backend field names (full_name → fullName)
- Shows field errors + success toast

### ✅ Institution Signup

- [app/(auth)/signup/institution/page.tsx](<../app/(auth)/signup/institution/page.tsx>)
- Maps backend field names (institution_name → institutionName)
- Shows field errors + success toast

## Toast Types

### Success Toasts (Green)

```typescript
toast.success("Operation successful!");
```

### Error Toasts (Red)

```typescript
toast.error("Operation failed!");
```

## Customization

### Toaster Props

```tsx
<Toaster
  position="top-right" // Position on screen
  richColors // Use semantic colors
  closeButton // Show close button
  duration={4000} // Auto-dismiss after 4s
  expand={true} // Stack toasts
/>
```

### Manual Toast Triggers

```typescript
import { toast } from "sonner";

// Success
toast.success("Success message", { duration: 3000 });

// Error
toast.error("Error message", { duration: 5000 });

// Info
toast.info("Info message");

// Warning
toast.warning("Warning message");

// Loading
const toastId = toast.loading("Loading...");
// Later...
toast.success("Done!", { id: toastId }); // Updates the loading toast
```

## Benefits

### ✅ User Experience

- Non-intrusive notifications
- Auto-dismiss (doesn't block UI)
- Stackable messages
- Semantic colors (red=error, green=success)

### ✅ Developer Experience

- Simple API (`toast.success()`, `toast.error()`)
- Automatic field error mapping
- TypeScript support
- Consistent across all auth pages

### ✅ Clean UI

- No error divs cluttering the layout
- Form fields show inline validation errors
- General errors as elegant toasts
- Success feedback without page reloads

## Type Safety

```typescript
// Form type helper
type FormWithSetError = Pick<UseFormReturn<any>, "setError">;

// Axios error typing
const axiosError = error as AxiosError<Record<string, string[]>>;
```

## Testing

### Manual Testing Checklist

- [x] Login with invalid credentials → Toast error
- [x] Login with valid credentials → Toast success + redirect
- [x] Register with existing email → Field error under email input
- [x] Register with weak password → Field error under password input
- [x] Register successfully → Toast success + redirect
- [x] Logout → Toast success + redirect to login
- [x] Multiple errors → Multiple field errors (no toast)
- [x] General API error → Toast error

### Error Scenarios

1. **Field-specific errors**: Shown under input fields
2. **Non-field errors**: Shown as toast
3. **Network errors**: Shown as toast
4. **Success responses**: Shown as toast

## Future Enhancements

- [ ] Add toast for email verification
- [ ] Add toast for password reset
- [ ] Add toast for profile updates
- [ ] Add loading toasts for long operations
- [ ] Add promise toasts for async operations

## Related Files

- [app/layout.tsx](../app/layout.tsx) - Toaster setup
- [features/auth/hooks/mutations/index.ts](../features/auth/hooks/mutations/index.ts) - Mutation hooks with toast
- [app/(auth)/login/page.tsx](<../app/(auth)/login/page.tsx>) - Login page
- [app/(auth)/signup/author/page.tsx](<../app/(auth)/signup/author/page.tsx>) - Author signup
- [app/(auth)/signup/institution/page.tsx](<../app/(auth)/signup/institution/page.tsx>) - Institution signup
