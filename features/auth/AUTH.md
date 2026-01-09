# Auth Feature Structure

## 📁 Folder Organization

```
features/auth/
├── api/                    # API layer
│   └── functions.ts        # Raw API functions
├── hooks/                  # React hooks
│   ├── mutations/          # TanStack Query mutations
│   │   └── index.ts        # useLoginMutation, useRegisterAuthorMutation, etc.
│   ├── query/              # TanStack Query queries
│   │   └── options.ts      # Query options for future use
│   └── index.ts            # Export all hooks
├── redux/                  # Redux state management
│   ├── authSlice.ts        # Auth slice (user, tokens, isAuthenticated)
│   └── index.ts            # Export reducer and actions
├── constants/              # Constants
│   └── index.ts            # AUTH_QUERY_KEYS, AUTH_ENDPOINTS
├── utils/                  # Utility functions
│   └── useAuth.ts          # Convenience hook
└── index.ts                # Main export file
```

## 🎯 Architecture Principles

### Separation of Concerns

1. **API Layer** (`api/`)

   - Pure functions that make API calls
   - Used by mutations/queries
   - No side effects

2. **Hooks Layer** (`hooks/`)

   - Uses `usePost`, `useGet` from `@/hooks/useApi`
   - Handles side effects (Redux dispatch, navigation)
   - Organized by type (mutations, queries)

3. **Redux Layer** (`redux/`)

   - Stores ONLY auth state (user, tokens, isAuthenticated)
   - No loading/error states (handled by TanStack Query)

4. **Constants** (`constants/`)

   - Query keys for TanStack Query
   - API endpoint constants

5. **Utils** (`utils/`)
   - Helper hooks and utilities

## 📝 Usage Examples

### Using Auth Mutations

```tsx
import { useLoginMutation } from "@/features/auth";

function LoginPage() {
  const loginMutation = useLoginMutation();

  const handleSubmit = (values) => {
    loginMutation.mutate(values);
  };

  return (
    <>
      {loginMutation.isError && <div>{loginMutation.error?.message}</div>}
      <button onClick={handleSubmit} disabled={loginMutation.isPending}>
        {loginMutation.isPending ? "Loading..." : "Login"}
      </button>
    </>
  );
}
```

### Using Auth State

```tsx
import { useAppSelector } from "@/store/hooks";
import { useAuth } from "@/features/auth";

function UserProfile() {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const { logout, isLoggingOut } = useAuth();

  if (!isAuthenticated) return <div>Please login</div>;

  return (
    <div>
      <h1>{user?.full_name}</h1>
      <button onClick={logout} disabled={isLoggingOut}>
        Logout
      </button>
    </div>
  );
}
```

## 🔑 Constants

### Query Keys

```typescript
export const AUTH_QUERY_KEYS = {
  currentUser: ["auth", "currentUser"],
  login: ["auth", "login"],
  register: ["auth", "register"],
  logout: ["auth", "logout"],
  refreshToken: ["auth", "refreshToken"],
} as const;
```

### Endpoints

```typescript
export const AUTH_ENDPOINTS = {
  LOGIN: "/auth/login/",
  LOGOUT: "/auth/logout/",
  REFRESH_TOKEN: "/auth/token/refresh/",
  REGISTER_AUTHOR: "/auth/register/author/",
  REGISTER_INSTITUTION: "/auth/register/institution/",
} as const;
```

## 🪝 Available Hooks

### Mutations

```typescript
import {
  useLoginMutation,
  useRegisterAuthorMutation,
  useRegisterInstitutionMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
} from "@/features/auth";
```

Each mutation returns:

- `mutate(data)` - Execute mutation
- `isPending` - Loading state
- `isError` - Error state
- `error` - Error object
- `isSuccess` - Success state
- `data` - Response data

### Utility Hooks

```typescript
import { useAuth } from "@/features/auth";

const { user, isAuthenticated, logout, isLoggingOut } = useAuth();
```

## 🏗️ Building Blocks

### API Functions (`api/functions.ts`)

Raw API functions that return Promises:

```typescript
export const loginFn = async (data: LoginRequest): Promise<LoginResponse> => {
  return api.post<LoginResponse>(AUTH_ENDPOINTS.LOGIN, data, {
    withCredentials: true,
  });
};
```

### Mutation Hooks (`hooks/mutations/`)

TanStack Query mutations using `usePost` from `@/hooks/useApi`:

```typescript
export function useLoginMutation() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return usePost<LoginResponse, LoginRequest>(AUTH_ENDPOINTS.LOGIN, {
    onSuccess: (data) => {
      dispatch(setCredentials({ user: data.user, tokens: data.tokens }));
      router.push("/");
    },
  });
}
```

### Redux Slice (`redux/authSlice.ts`)

Redux slice with ONLY state management:

```typescript
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    tokens: null,
    isAuthenticated: false,
  },
  reducers: {
    setCredentials: (state, action) => {
      /* ... */
    },
    logout: (state) => {
      /* ... */
    },
    // No loading/error reducers
  },
});
```

## 🎨 Query Options (Future Use)

For GET requests, create query options:

```typescript
import { queryOptions } from "@tanstack/react-query";
import { AUTH_QUERY_KEYS } from "../constants";
import { getCurrentUserFn } from "../api/functions";

export const createCurrentUserQueryOptions = queryOptions({
  queryKey: AUTH_QUERY_KEYS.currentUser,
  queryFn: getCurrentUserFn,
  staleTime: 5 * 60 * 1000,
  gcTime: 10 * 60 * 1000,
});
```

## 🔄 Data Flow

```
Component
    ↓
  Hook (useLoginMutation)
    ↓
  usePost from @/hooks/useApi
    ↓
  API Function (loginFn)
    ↓
  Axios Instance
    ↓
  Backend API
    ↓
  onSuccess callback
    ↓
  Redux dispatch (setCredentials)
    ↓
  Router navigation
```

## 🧪 Testing

Each layer can be tested independently:

```typescript
// Test API function
import { loginFn } from "@/features/auth/api/functions";

test("loginFn calls correct endpoint", async () => {
  // Mock api.post
  // Call loginFn
  // Assert
});

// Test mutation hook
import { useLoginMutation } from "@/features/auth";

test("useLoginMutation dispatches on success", async () => {
  // Render hook with providers
  // Call mutate
  // Assert dispatch was called
});
```

## 📦 Imports

### From Components

```typescript
// Get mutations
import { useLoginMutation, useLogoutMutation } from "@/features/auth";

// Get utility hook
import { useAuth } from "@/features/auth";

// Get Redux actions (rarely needed directly)
import { setCredentials, logout } from "@/features/auth";

// Get constants
import { AUTH_ENDPOINTS, AUTH_QUERY_KEYS } from "@/features/auth";
```

### From Other Features

```typescript
// If you need auth state in another feature
import { useAppSelector } from "@/store/hooks";

const { user, isAuthenticated } = useAppSelector((state) => state.auth);
```

## 🚀 Benefits of This Structure

### ✅ Organized

- Clear separation of concerns
- Easy to find files
- Scalable structure

### ✅ Reusable

- API functions can be used anywhere
- Hooks use generic `usePost`/`useGet`
- Constants are centralized

### ✅ Testable

- Each layer can be tested independently
- Mock at any level

### ✅ Type-Safe

- Full TypeScript support
- Proper type inference

### ✅ Maintainable

- Changes localized to specific files
- Clear dependencies
- Easy to understand

## 🔧 Adding New Features

### Add a new mutation

1. Add API function in `api/functions.ts`:

```typescript
export const verifyEmailFn = async (token: string) => {
  return api.post("/auth/verify-email/", { token });
};
```

2. Add endpoint constant in `constants/index.ts`:

```typescript
VERIFY_EMAIL: '/auth/verify-email/',
```

3. Create hook in `hooks/mutations/index.ts`:

```typescript
export function useVerifyEmailMutation() {
  return usePost(AUTH_ENDPOINTS.VERIFY_EMAIL, {
    onSuccess: () => {
      /* ... */
    },
  });
}
```

### Add a new query

1. Add API function in `api/functions.ts`
2. Create query option in `hooks/query/options.ts`
3. Use `useGet` from `@/hooks/useApi` or use the query option directly

## 📚 Related Documentation

- [useApi.ts](../../hooks/useApi.ts) - Generic TanStack Query hooks
- [AUTH_WITH_TANSTACK_QUERY.md](../../docs/AUTH_WITH_TANSTACK_QUERY.md) - Complete guide
- [AUTH_FLOW_DIAGRAM.md](../../docs/AUTH_FLOW_DIAGRAM.md) - Visual flow diagrams
