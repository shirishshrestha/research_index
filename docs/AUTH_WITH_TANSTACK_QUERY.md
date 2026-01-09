# Authentication with TanStack Query & Redux

## Architecture Overview

This authentication system combines:

- **Redux** - For storing auth state (user, tokens, isAuthenticated)
- **Redux Persist** - For persisting auth state across sessions
- **TanStack Query** - For handling API calls, loading states, and error handling
- **HTTP-only Cookies** - Backend provides additional security layer

## Key Design Principles

✅ **Redux stores ONLY auth state** (user, tokens, isAuthenticated)  
✅ **TanStack Query handles ALL API calls** (loading, error, success states)  
✅ **No loading/error in Redux** - TanStack Query manages these  
✅ **Tokens NOT in localStorage** - Redux Persist handles storage

## File Structure

```
features/auth/
├── authSlice.ts          # Redux slice (user, tokens, isAuthenticated)
├── authApi.ts            # Raw API functions
├── useAuthMutations.ts   # TanStack Query hooks
└── index.ts              # Exports

hooks/
└── useAuth.ts            # Convenience hook for common auth operations
```

## Usage Examples

### 1. Login

```tsx
import { useLogin } from "@/features/auth/useAuthMutations";

function LoginPage() {
  const loginMutation = useLogin();

  const handleSubmit = (values) => {
    loginMutation.mutate(values);
  };

  return (
    <>
      {loginMutation.isError && <div>Error: {loginMutation.error.message}</div>}

      <form onSubmit={handleSubmit}>
        <input name="email" />
        <input name="password" type="password" />
        <button type="submit" disabled={loginMutation.isPending}>
          {loginMutation.isPending ? "Logging in..." : "Login"}
        </button>
      </form>
    </>
  );
}
```

### 2. Register (Author)

```tsx
import { useRegisterAuthor } from "@/features/auth/useAuthMutations";

function AuthorSignup() {
  const registerMutation = useRegisterAuthor();

  const handleSubmit = (values) => {
    registerMutation.mutate({
      email: values.email,
      password: values.password,
      confirm_password: values.confirmPassword,
      title: values.title,
      full_name: values.fullName,
      institute: values.institute,
      designation: values.designation,
    });
  };

  return (
    <>
      {registerMutation.isError && <div>{registerMutation.error?.message}</div>}
      <form onSubmit={handleSubmit}>
        {/* form fields */}
        <button disabled={registerMutation.isPending}>
          {registerMutation.isPending ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </>
  );
}
```

### 3. Register (Institution)

```tsx
import { useRegisterInstitution } from "@/features/auth/useAuthMutations";

function InstitutionSignup() {
  const registerMutation = useRegisterInstitution();

  const handleSubmit = (values) => {
    registerMutation.mutate({
      email: values.email,
      password: values.password,
      confirm_password: values.confirmPassword,
      institution_name: values.institutionName,
    });
  };

  // Same pattern as author signup
}
```

### 4. Logout

```tsx
import { useAuth } from "@/hooks";

function LogoutButton() {
  const { logout, isLoggingOut } = useAuth();

  return (
    <button onClick={logout} disabled={isLoggingOut}>
      {isLoggingOut ? "Logging out..." : "Logout"}
    </button>
  );
}
```

### 5. Access Auth State

```tsx
import { useAppSelector } from "@/store/hooks";

function UserProfile() {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <div>Please login</div>;
  }

  return (
    <div>
      <h1>Welcome, {user?.full_name || user?.institution_name}</h1>
      <p>Email: {user?.email}</p>
      <p>Type: {user?.user_type}</p>
    </div>
  );
}
```

### 6. Protected Route

```tsx
"use client";

import { useAppSelector } from "@/store/hooks";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedPage() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      redirect("/login");
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) return null;

  return <div>Protected Content</div>;
}
```

## Available Hooks

### Auth Mutations (TanStack Query)

```tsx
import {
  useLogin,
  useRegisterAuthor,
  useRegisterInstitution,
  useLogout,
  useRefreshToken,
} from "@/features/auth/useAuthMutations";
```

Each mutation returns:

- `mutate(data)` - Execute the mutation
- `isPending` - Loading state
- `isError` - Error state
- `error` - Error object with message
- `isSuccess` - Success state
- `data` - Response data

### Auth Helper Hook

```tsx
import { useAuth } from "@/hooks";

const { user, isAuthenticated, logout, isLoggingOut } = useAuth();
```

## Redux State Structure

```typescript
interface AuthState {
  user: UserProfile | null;
  tokens: {
    access: string;
    refresh: string;
  } | null;
  isAuthenticated: boolean;
}
```

**Note:** No `loading` or `error` in Redux! TanStack Query handles these.

## Redux Actions

```tsx
import {
  setCredentials, // Set user and tokens after login/register
  setTokens, // Update tokens only
  updateAccessToken, // Update access token (for refresh)
  logout, // Clear all auth state
} from "@/features/auth/authSlice";
```

## API Endpoints

All handled by `authApi.ts` and wrapped in TanStack Query hooks:

- `POST /api/auth/login/` - Login
- `POST /api/auth/logout/` - Logout
- `POST /api/auth/token/refresh/` - Refresh token
- `POST /api/auth/register/author/` - Register author
- `POST /api/auth/register/institution/` - Register institution

## Automatic Token Refresh

Token refresh is configured in `lib/tokenRefresh.ts` and automatically:

1. Intercepts 401 errors
2. Attempts to refresh the token
3. Retries the original request
4. Logs out if refresh fails

## Benefits of This Architecture

### ✅ Separation of Concerns

- Redux: State management only
- TanStack Query: API calls, loading, errors
- Clear responsibilities

### ✅ Better DX (Developer Experience)

- No manual loading/error state management
- Built-in retry, cache, deduplication
- TypeScript support
- DevTools for both Redux and TanStack Query

### ✅ Less Boilerplate

- No try/catch in components
- No dispatch(setLoading/setError)
- Declarative error/loading handling

### ✅ Optimistic Updates

- Can easily add optimistic updates
- TanStack Query handles rollback on errors

### ✅ Request Deduplication

- Multiple components can call same mutation
- TanStack Query deduplicates automatically

## Example: Full Login Flow

```tsx
import { useLogin } from "@/features/auth/useAuthMutations";
import { useForm } from "react-hook-form";

function LoginPage() {
  const loginMutation = useLogin();
  const form = useForm();

  const onSubmit = (values) => {
    loginMutation.mutate(values, {
      onSuccess: () => {
        console.log("Login successful!");
        // Automatically redirects to '/' via useLogin hook
      },
      onError: (error) => {
        console.error("Login failed:", error.message);
      },
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* Show error */}
      {loginMutation.isError && (
        <div className="error">
          {loginMutation.error?.message || "Login failed"}
        </div>
      )}

      <input {...form.register("email")} />
      <input {...form.register("password")} type="password" />

      <button type="submit" disabled={loginMutation.isPending}>
        {loginMutation.isPending ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
```

## Comparison: Before vs After

### Before (Redux only)

```tsx
const dispatch = useDispatch();
const { loading, error } = useSelector((state) => state.auth);

const handleLogin = async (values) => {
  try {
    dispatch(setLoading(true));
    dispatch(clearError());

    const response = await authApi.login(values);
    dispatch(setCredentials(response));
    router.push("/");
  } catch (err) {
    dispatch(setError(err.message));
  } finally {
    dispatch(setLoading(false));
  }
};
```

### After (TanStack Query + Redux)

```tsx
const loginMutation = useLogin();

const handleLogin = (values) => {
  loginMutation.mutate(values);
  // Loading: loginMutation.isPending
  // Error: loginMutation.error
  // Success: automatic redirect
};
```

Much cleaner! 🎉

## Testing

TanStack Query mutations are easier to test:

```tsx
import { renderHook, waitFor } from "@testing-library/react";
import { useLogin } from "@/features/auth/useAuthMutations";

test("login mutation", async () => {
  const { result } = renderHook(() => useLogin());

  result.current.mutate({ email: "test@test.com", password: "pass" });

  await waitFor(() => expect(result.current.isSuccess).toBe(true));
});
```

## Migration Guide

If you have existing code using the old pattern:

### Old:

```tsx
const { loading, error } = useAppSelector((state) => state.auth);
dispatch(setLoading(true));
dispatch(setError("message"));
```

### New:

```tsx
const loginMutation = useLogin();
// Use: loginMutation.isPending, loginMutation.error
```

## Environment Setup

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## Quick Start

1. Use the mutation hooks in your auth pages
2. Access auth state via `useAppSelector`
3. Use `useAuth()` for logout
4. Loading/error comes from TanStack Query, not Redux

That's it! Much simpler and more powerful. 🚀
