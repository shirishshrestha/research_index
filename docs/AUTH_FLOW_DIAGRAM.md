# Auth Flow Diagram

## Complete Authentication Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER ACTION                               │
│                    (Login/Register/Logout)                       │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   COMPONENT LAYER                                │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Login/Signup Component                                   │  │
│  │  - Uses: useLogin(), useRegisterAuthor(), etc.          │  │
│  │  - Accesses: loginMutation.isPending, .error, .isSuccess│  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                  TANSTACK QUERY LAYER                            │
│                (features/auth/useAuthMutations.ts)               │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  useMutation hooks:                                       │  │
│  │  - useLogin()                                            │  │
│  │  - useRegisterAuthor()                                   │  │
│  │  - useRegisterInstitution()                              │  │
│  │  - useLogout()                                           │  │
│  │  - useRefreshToken()                                     │  │
│  │                                                          │  │
│  │  Provides: isPending, isError, error, isSuccess, data   │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ├──────────────────┬─────────────────────┐
                         ▼                  ▼                     ▼
┌────────────────────────────┐  ┌──────────────────┐  ┌─────────────────┐
│     API CALLS              │  │   REDUX STORE    │  │  SIDE EFFECTS   │
│  (features/auth/authApi.ts)│  │   (authSlice)    │  │  (Navigation)   │
│                            │  │                  │  │                 │
│  - authApi.login()         │  │  setCredentials()│  │  router.push()  │
│  - authApi.registerAuthor()│  │  logout()        │  │                 │
│  - authApi.logout()        │  │  updateAccessToken│  │                 │
└────────────────┬───────────┘  └──────────────────┘  └─────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                      BACKEND API                                 │
│                                                                  │
│  POST /api/auth/login/                                          │
│  POST /api/auth/register/author/                                │
│  POST /api/auth/register/institution/                           │
│  POST /api/auth/logout/                                         │
│  POST /api/auth/token/refresh/                                  │
│                                                                  │
│  Returns: { tokens, user } + HTTP-only cookies                  │
└─────────────────────────────────────────────────────────────────┘
```

## State Management Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                      REDUX STORE                                 │
│                   (Persisted to Storage)                         │
│                                                                  │
│  {                                                               │
│    user: UserProfile | null,                                    │
│    tokens: { access, refresh } | null,                          │
│    isAuthenticated: boolean                                     │
│  }                                                               │
│                                                                  │
│  ✅ Persisted by Redux Persist                                  │
│  ✅ NO loading or error state                                   │
└─────────────────────────────────────────────────────────────────┘
                         ▲
                         │ setCredentials() / logout()
                         │
┌─────────────────────────────────────────────────────────────────┐
│                 TANSTACK QUERY STATE                             │
│                  (Per-mutation state)                            │
│                                                                  │
│  {                                                               │
│    isPending: boolean,    ← Loading state                       │
│    isError: boolean,      ← Error state                         │
│    error: Error | null,   ← Error details                       │
│    isSuccess: boolean,    ← Success state                       │
│    data: Response         ← Response data                       │
│  }                                                               │
│                                                                  │
│  ✅ Managed by TanStack Query                                   │
│  ✅ Automatic cache & retry                                     │
│  ✅ Request deduplication                                       │
└─────────────────────────────────────────────────────────────────┘
```

## Example: Login Flow

```
USER CLICKS LOGIN BUTTON
         │
         ▼
┌─────────────────────────┐
│ Component calls:        │
│ loginMutation.mutate()  │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│ TanStack Query:                     │
│ - Sets isPending = true             │
│ - Calls authApi.login()             │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│ API Call:                           │
│ POST /api/auth/login/               │
│ { email, password }                 │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│ Backend Response:                   │
│ - Sets HTTP-only cookies            │
│ - Returns { tokens, user }          │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│ TanStack Query onSuccess:           │
│ - dispatch(setCredentials())        │
│ - router.push('/')                  │
│ - Sets isSuccess = true             │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│ Redux Store Updated:                │
│ {                                   │
│   user: { ... },                    │
│   tokens: { access, refresh },      │
│   isAuthenticated: true             │
│ }                                   │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│ Redux Persist:                      │
│ - Saves to localStorage             │
│ - User stays logged in              │
└─────────────────────────────────────┘
```

## Error Flow

```
API CALL FAILS
     │
     ▼
┌─────────────────────────────────────┐
│ TanStack Query:                     │
│ - Sets isError = true               │
│ - Sets error = Error object         │
│ - isPending = false                 │
│ - Retries if configured             │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│ Component:                          │
│ {loginMutation.isError && (         │
│   <div>{loginMutation.error}</div>  │
│ )}                                  │
└─────────────────────────────────────┘
```

## Logout Flow

```
USER CLICKS LOGOUT
         │
         ▼
┌─────────────────────────┐
│ useAuth() hook:         │
│ logout()                │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│ useLogout mutation:                 │
│ - Calls authApi.logout()            │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│ Backend:                            │
│ - Clears HTTP-only cookies          │
│ - Blacklists refresh token          │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│ useLogout onSuccess/onError:        │
│ - dispatch(logout())                │
│ - router.push('/login')             │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│ Redux Store:                        │
│ {                                   │
│   user: null,                       │
│   tokens: null,                     │
│   isAuthenticated: false            │
│ }                                   │
└─────────────────────────────────────┘
```

## Token Refresh Flow

```
API CALL RETURNS 401
         │
         ▼
┌─────────────────────────────────────┐
│ Axios Interceptor:                  │
│ - Detects 401 error                 │
│ - Calls authApi.refreshToken()      │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│ Backend:                            │
│ - Validates refresh token (cookie)  │
│ - Returns new access token          │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│ Interceptor:                        │
│ - Updates Redux: updateAccessToken()│
│ - Retries original request          │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│ Original Request Succeeds           │
│ User doesn't notice anything        │
└─────────────────────────────────────┘
```

## Component Integration

```tsx
// Read auth state
const { user, isAuthenticated } = useAppSelector((state) => state.auth);

// Login
const loginMutation = useLogin();
loginMutation.mutate({ email, password });

// Show loading
{
  loginMutation.isPending && <Spinner />;
}

// Show error
{
  loginMutation.isError && <Error>{loginMutation.error?.message}</Error>;
}

// Logout
const { logout, isLoggingOut } = useAuth();
<button onClick={logout} disabled={isLoggingOut}>
  Logout
</button>;
```

## Key Takeaways

1. **Redux** = State storage only (user, tokens, isAuthenticated)
2. **TanStack Query** = API calls, loading, errors
3. **Redux Persist** = Automatic persistence
4. **HTTP-only Cookies** = Additional security
5. **Automatic Token Refresh** = Seamless UX
6. **Type Safe** = Full TypeScript support
7. **Testable** = Clean separation of concerns
