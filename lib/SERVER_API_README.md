# Server-Side API Utility Documentation

## Overview

The `server-api.ts` module provides a centralized, type-safe HTTP client for Next.js Server Components and Server Actions. It follows Next.js 16+ best practices and is optimized for server-side rendering.

## Key Features

### 🔄 Request Deduplication

- Uses React's `cache()` function to automatically deduplicate GET requests
- Multiple identical requests in the same render pass are merged into one
- Improves performance and reduces unnecessary API calls

### 🔒 Authentication

- Automatically extracts `access_token` from HTTP-only cookies
- Sets proper `Authorization` and `Cookie` headers on all requests
- Works seamlessly with the Django backend authentication system

### 📦 FormData Support

- Automatically detects FormData payloads
- Properly handles multipart/form-data for file uploads
- Sets correct Content-Type headers based on payload type

### 🎯 Type Safety

- Full TypeScript support with generics
- Type-safe responses with `Promise<T>`
- Better IDE autocomplete and error checking

### 🛡️ Server-Only

- Imports `server-only` package to prevent client-side usage
- Prevents accidental exposure of server-side logic to the browser
- Ensures security best practices

## Available Functions

### `serverGet<T>(endpoint, config?)`

Fetches data from the API with automatic request memoization.

**Parameters:**

- `endpoint` - API endpoint path (e.g., "/api/users/profile/")
- `config` - Optional axios configuration

**Returns:** `Promise<T>`

**Example:**

```typescript
import { serverGet } from "@/lib/server-api";

interface User {
  id: number;
  name: string;
  email: string;
}

export async function getUserProfile() {
  const user = await serverGet<User>("/api/users/profile/");
  return user;
}
```

### `serverPost<T>(endpoint, data?, config?)`

Creates a new resource. Automatically handles JSON and FormData.

**Parameters:**

- `endpoint` - API endpoint path
- `data` - Request payload (JSON object or FormData)
- `config` - Optional axios configuration

**Returns:** `Promise<T>`

**Example:**

```typescript
import { serverPost } from "@/lib/server-api";

// JSON payload
const newUser = await serverPost<User>("/api/users/", {
  name: "John Doe",
  email: "john@example.com",
});

// FormData with file upload
const formData = new FormData();
formData.append("name", "John Doe");
formData.append("avatar", avatarFile);
const user = await serverPost<User>("/api/users/", formData);
```

### `serverPatch<T>(endpoint, data?, config?)`

Partially updates an existing resource.

**Parameters:**

- `endpoint` - API endpoint path
- `data` - Partial update payload (JSON object or FormData)
- `config` - Optional axios configuration

**Returns:** `Promise<T>`

**Example:**

```typescript
import { serverPatch } from "@/lib/server-api";

// Update user name (JSON)
const updated = await serverPatch<User>("/api/users/1/", {
  name: "Jane Doe",
});

// Update with file upload (FormData)
const formData = new FormData();
formData.append("profile_picture", imageFile);
const user = await serverPatch<User>("/api/users/1/", formData);
```

### `serverPut<T>(endpoint, data, config?)`

Replaces an entire resource.

**Parameters:**

- `endpoint` - API endpoint path
- `data` - Complete resource data
- `config` - Optional axios configuration

**Returns:** `Promise<T>`

**Example:**

```typescript
import { serverPut } from "@/lib/server-api";

const replaced = await serverPut<User>("/api/users/1/", {
  name: "Jane Doe",
  email: "jane@example.com",
  bio: "Software engineer",
});
```

### `serverDelete<T>(endpoint, config?)`

Deletes a resource.

**Parameters:**

- `endpoint` - API endpoint path
- `config` - Optional axios configuration

**Returns:** `Promise<T>`

**Example:**

```typescript
import { serverDelete } from "@/lib/server-api";

await serverDelete("/api/users/1/");
```

### `createPreload<T>(fn)`

Creates a preload function for eager data fetching.

**Parameters:**

- `fn` - Async function that returns a Promise

**Returns:** `() => void`

**Example:**

```typescript
import { serverGet, createPreload } from "@/lib/server-api";

// Create a preload function
const preloadUser = createPreload(() => serverGet<User>("/api/users/1/"));

// In your page component
export default async function Page() {
  // Start loading early (non-blocking)
  preloadUser();

  // Do other async work
  const otherData = await someOtherAsyncTask();

  // When you actually need the user, it will use the cached result
  const user = await serverGet<User>("/api/users/1/");

  return <div>{user.name}</div>;
}
```

## Usage in Server Components

Server Components are async by default and can directly call server API functions:

```typescript
// app/profile/page.tsx
import { serverGet } from "@/lib/server-api";
import { AuthorProfile } from "@/features/panel/author/profile/types";

export default async function ProfilePage() {
  const profile = await serverGet<AuthorProfile>("/api/auth/profile/author/");

  return (
    <div>
      <h1>
        {profile.first_name} {profile.last_name}
      </h1>
      <p>{profile.bio}</p>
    </div>
  );
}
```

## Usage in Server Actions

Server Actions use the "use server" directive and can perform mutations:

```typescript
// features/panel/author/profile/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { serverPatch } from "@/lib/server-api";
import { AuthorProfile, AuthorProfileUpdatePayload } from "./types";

export async function updateAuthorProfileAction(
  data: AuthorProfileUpdatePayload
): Promise<{ success: boolean; data?: AuthorProfile; error?: string }> {
  try {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value instanceof File ? value : String(value));
      }
    });

    const updated = await serverPatch<AuthorProfile>(
      "/api/auth/profile/author/",
      formData
    );

    // Revalidate the profile page to reflect changes
    revalidatePath("/author/profile");

    return { success: true, data: updated };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Update failed",
    };
  }
}
```

## Error Handling

All functions automatically catch axios errors and extract the `detail` field from Django backend responses:

```typescript
try {
  const user = await serverGet<User>("/api/users/nonexistent/");
} catch (error) {
  // Error message will be the 'detail' from Django response
  console.error(error.message); // "User not found"
}
```

## Environment Variables

The API base URL is configured via environment variable:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

## Best Practices

### ✅ DO

- Use `serverGet` for all data fetching in Server Components
- Use `serverPost`, `serverPatch`, `serverPut`, `serverDelete` in Server Actions
- Always specify TypeScript generics for type safety: `serverGet<User>(...)`
- Use `createPreload` for eager data fetching to improve performance
- Call `revalidatePath()` or `revalidateTag()` after mutations in Server Actions

### ❌ DON'T

- Don't use these functions in Client Components (they're server-only)
- Don't manually handle cookies or authentication headers
- Don't manually set Content-Type for FormData (it's automatic)
- Don't catch errors just to re-throw them (let them bubble up)

## Migration Guide

If you have existing API functions using axios directly, here's how to migrate:

**Before:**

```typescript
import { cookies } from "next/headers";
import axios from "axios";

export async function getProfile(): Promise<Profile> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  const response = await axios.get<Profile>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/profile/`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Cookie: cookieStore.toString(),
      },
      withCredentials: true,
    }
  );

  return response.data;
}
```

**After:**

```typescript
import { serverGet } from "@/lib/server-api";

export async function getProfile(): Promise<Profile> {
  return serverGet<Profile>("/api/profile/");
}
```

## Architecture Comparison

### Client-Side API (`services/api.ts`)

- For Client Components
- Uses Redux store for access tokens
- Interceptor-based authentication
- No cookie handling
- Not cached

### Server-Side API (`lib/server-api.ts`)

- For Server Components and Server Actions
- Uses HTTP-only cookies
- Direct authentication headers
- Automatic cookie extraction
- Request memoization with `cache()`

## Related Documentation

- [Next.js Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [React cache() function](https://react.dev/reference/react/cache)
- [Server Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- [Server Actions](https://nextjs.org/docs/app/getting-started/updating-data)
- [Cookies in Next.js](https://nextjs.org/docs/app/api-reference/functions/cookies)
