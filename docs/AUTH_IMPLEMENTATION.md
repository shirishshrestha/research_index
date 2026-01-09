# Authentication Implementation with Redux & Redux Persist

This project implements a complete authentication system using Redux Toolkit and Redux Persist, with HTTP-only cookie support from the backend.

## Features

✅ **Redux Toolkit** for state management  
✅ **Redux Persist** for persisting auth state (NO localStorage for tokens)  
✅ **HTTP-Only Cookies** for secure token storage  
✅ **Login & Registration** for Authors and Institutions  
✅ **Token Refresh** mechanism  
✅ **Logout** with cookie clearing

## Architecture

### Backend API Endpoints

- `POST /api/auth/login/` - Login with email/password
- `POST /api/auth/logout/` - Logout and clear cookies
- `POST /api/auth/token/refresh/` - Refresh access token
- `POST /api/auth/register/author/` - Register as author
- `POST /api/auth/register/institution/` - Register as institution

### Frontend Structure

```
frontend-research-index/
├── store/
│   ├── store.ts          # Redux store configuration with persist
│   ├── hooks.ts          # Typed Redux hooks
│   └── index.ts          # Store exports
├── features/
│   └── auth/
│       ├── authSlice.ts  # Auth state management
│       ├── authApi.ts    # Auth API calls
│       └── index.ts      # Auth exports
├── hooks/
│   ├── useAuth.ts        # Auth helper hook (logout, etc.)
│   └── index.ts
├── services/
│   └── api.ts            # Axios instance with Redux token interceptor
├── types/
│   └── auth.ts           # Auth TypeScript types
└── lib/
    └── providers.tsx     # Redux Provider & PersistGate wrapper
```

## How It Works

### 1. Redux State Structure

```typescript
interface AuthState {
  user: UserProfile | null;
  tokens: { access: string; refresh: string } | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}
```

### 2. Token Management

**Important:** Tokens are stored in Redux state (which is persisted), NOT directly in localStorage or sessionStorage.

- Redux Persist handles the storage automatically
- The backend sends tokens in response body AND sets HTTP-only cookies
- Axios interceptor reads tokens from Redux store and adds to Authorization header
- HTTP-only cookies provide additional security layer

### 3. Redux Persist Configuration

```typescript
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "tokens", "isAuthenticated"], // Only persist these
};
```

### 4. Using Authentication in Components

#### Login Example

```tsx
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCredentials, setError } from "@/features/auth/authSlice";
import { authApi } from "@/features/auth/authApi";

function LoginPage() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const handleLogin = async (email: string, password: string) => {
    try {
      dispatch(setLoading(true));
      const response = await authApi.login({ email, password });

      dispatch(
        setCredentials({
          user: response.user,
          tokens: response.tokens,
        })
      );

      router.push("/");
    } catch (err) {
      dispatch(setError(err.message));
    }
  };
}
```

#### Logout Example

```tsx
import { useAuth } from "@/hooks";

function Header() {
  const { logout } = useAuth();

  return <button onClick={logout}>Logout</button>;
}
```

#### Protected Route Example

```tsx
import { useAppSelector } from "@/store/hooks";
import { redirect } from "next/navigation";

function ProtectedPage() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    redirect("/login");
  }

  return <div>Protected Content</div>;
}
```

#### Accessing User Data

```tsx
import { useAppSelector } from "@/store/hooks";

function Profile() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div>
      <h1>Welcome, {user?.full_name || user?.institution_name}</h1>
      <p>Email: {user?.email}</p>
      <p>Type: {user?.user_type}</p>
    </div>
  );
}
```

## API Integration

### Making Authenticated Requests

The `api` service automatically includes the access token from Redux store:

```typescript
import { api } from "@/services/api";

// Token is automatically added from Redux store
const data = await api.get("/publications/");
const result = await api.post("/publications/", publicationData);
```

### Token Refresh

When the access token expires, call the refresh endpoint:

```typescript
import { authApi } from "@/features/auth/authApi";
import { updateAccessToken } from "@/features/auth/authSlice";

try {
  const response = await authApi.refreshToken();
  dispatch(updateAccessToken(response.access));
} catch (error) {
  // Token refresh failed, logout user
  dispatch(logout());
  router.push("/login");
}
```

## Security Notes

1. **HTTP-Only Cookies**: The backend sets tokens in HTTP-only cookies (can't be accessed by JavaScript)
2. **Redux State**: Tokens are also returned in response body and stored in Redux (for Authorization header)
3. **Redux Persist**: Uses localStorage internally but through Redux abstraction
4. **withCredentials**: All auth requests include `{ withCredentials: true }` to send cookies

## Auth Pages

- **Login**: `/login`
- **Author Signup**: `/signup/author`
- **Institution Signup**: `/signup/institution`

## Redux DevTools

Redux DevTools are enabled in development mode for debugging auth state.

## Environment Variables

Make sure to set:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## Testing

To test the auth flow:

1. Start the backend: `cd backend-research-index && python manage.py runserver`
2. Start the frontend: `cd frontend-research-index && pnpm dev`
3. Navigate to `/login` or `/signup/author`
4. Login/Register and check Redux DevTools for state changes

## Troubleshooting

### Tokens not persisting

- Check Redux DevTools to verify tokens are in state
- Check browser Application tab → Local Storage for `persist:auth` key

### 401 Unauthorized errors

- Verify token is in Redux state
- Check Network tab for Authorization header
- Try refreshing the token

### CORS issues

- Ensure backend allows credentials: `CORS_ALLOW_CREDENTIALS = True`
- Verify `withCredentials: true` in API calls
