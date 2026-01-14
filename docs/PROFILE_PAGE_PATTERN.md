# Profile Page Pattern: Server Components + TanStack Query

## Architecture Overview

This document explains the **correct pattern** for implementing a profile page with:

1. **Server Component** fetching data with Next.js `fetch()` and cache tags
2. **Client Component** form using TanStack Query mutations
3. **Server Action** for cache revalidation (no full page reload)

## Why This Pattern?

### ❌ Common Mistakes

1. **Using `revalidate = 0` disables caching completely**

   ```tsx
   export const revalidate = 0; // ❌ Defeats the purpose of Next.js caching
   ```

2. **Using `queryClient.invalidateQueries()` alone doesn't work**

   - TanStack Query client cache ≠ Next.js Server Component cache
   - Client-side invalidation doesn't update Server Component data
   - Requires full page reload to refetch Server Component

3. **Mixing server-only and client libraries**
   - Can't use axios in Server Components (client-side library)
   - Must use native `fetch()` for Server Components

### ✅ Correct Approach

1. **Server Component uses Next.js `fetch()`** with cache tags
2. **Client mutation calls Server Action** which uses `revalidateTag()`
3. **Next.js automatically refetches** Server Component data on revalidation
4. **No full page reload** - only Server Component re-renders

## Implementation

### 1. Server-Side API Layer (`lib/server-api.ts`)

```typescript
import { cache } from "react";
import "server-only";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Get authentication cookies for server-side requests
 * Django backend uses httpOnly cookies for JWT tokens
 */
async function getAuthCookie() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  // Return formatted cookie string for fetch() headers
  return {
    Cookie: cookieStore.toString(),
    Authorization: accessToken ? `Bearer ${accessToken}` : "",
  };
}

/**
 * Type-safe GET request with cache tags
 * Uses React cache() for request deduplication within same render pass
 * Uses Next.js cache tags for revalidation across requests
 */
export const serverGet = cache(
  async <T = any>(
    endpoint: string,
    options?: {
      tags?: string[];
      revalidate?: number | false;
    }
  ): Promise<T> => {
    const authHeaders = await getAuthCookie();
    const url = `${API_BASE_URL}${endpoint}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders,
      },
      credentials: "include", // Send cookies
      // Next.js caching configuration
      next: {
        tags: options?.tags || [], // Cache tags for revalidation
        revalidate: options?.revalidate, // Optional: time-based revalidation
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.detail || error.message || "Failed to fetch data");
    }

    return response.json();
  }
);

/**
 * Type-safe PATCH request (no caching)
 * Used by Server Actions to update data
 */
export async function serverPatch<T = any>(
  endpoint: string,
  data: any
): Promise<T> {
  const authHeaders = await getAuthCookie();
  const url = `${API_BASE_URL}${endpoint}`;

  const isFormData = data instanceof FormData;

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      ...(!isFormData && { "Content-Type": "application/json" }),
      ...authHeaders,
    },
    body: isFormData ? data : JSON.stringify(data),
    credentials: "include",
    cache: "no-store", // Never cache mutations
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || error.message || "Failed to update");
  }

  return response.json();
}
```

### 2. Profile API Functions (`features/panel/author/profile/api.ts`)

```typescript
import { serverGet, serverPatch } from "@/lib/server-api";
import { AuthorProfile, AuthorProfileUpdatePayload } from "./types";

/**
 * Fetch author profile with cache tag
 * Tag: "author-profile" - will be used for revalidation
 */
export async function getAuthorProfile(): Promise<AuthorProfile> {
  return serverGet<AuthorProfile>("/api/auth/profile/author/", {
    tags: ["author-profile"], // ✅ Cache tag for revalidation
    revalidate: 300, // Optional: revalidate every 5 minutes
  });
}

/**
 * Update author profile (called by Server Action)
 * This function runs server-side within a Server Action
 */
export async function updateAuthorProfile(
  data: AuthorProfileUpdatePayload
): Promise<AuthorProfile> {
  const hasFiles =
    data.profile_picture instanceof File || data.cv instanceof File;

  if (hasFiles) {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, String(value));
        }
      }
    });
    return serverPatch<AuthorProfile>("/api/auth/profile/author/", formData);
  }

  return serverPatch<AuthorProfile>("/api/auth/profile/author/", data);
}
```

### 3. Server Action (`features/panel/author/profile/actions.ts`)

```typescript
"use server";

import { revalidateTag } from "next/cache";
import { updateAuthorProfile } from "./api";
import { AuthorProfileUpdatePayload, AuthorProfile } from "./types";

/**
 * Server Action: Update profile and revalidate cache
 *
 * This function:
 * 1. Receives form data from client mutation
 * 2. Calls Django API via serverPatch()
 * 3. Revalidates "author-profile" cache tag
 * 4. Returns updated profile data
 *
 * Next.js will automatically refetch the Server Component
 * without requiring a full page reload
 */
export async function updateAuthorProfileAction(
  data: AuthorProfileUpdatePayload
): Promise<
  { success: true; profile: AuthorProfile } | { success: false; error: string }
> {
  try {
    const profile = await updateAuthorProfile(data);

    // ✅ Revalidate cache tags - triggers Server Component refetch
    revalidateTag("author-profile");

    // Optional: revalidate related pages
    // revalidatePath("/author/dashboard");

    return { success: true, profile };
  } catch (error) {
    console.error("Failed to update profile:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update profile",
    };
  }
}
```

### 4. Server Component Page (`app/(panel)/author/profile/page.tsx`)

```tsx
import { Suspense } from "react";
import { getAuthorProfile } from "@/features/panel/author/profile/api";
import { PanelContainer, PanelLoadingSkeleton } from "@/features/shared";
import { AuthorProfileView } from "@/features/panel/author/profile/components/AuthorProfileView";

// ✅ Remove these lines - they disable caching
// export const dynamic = "force-dynamic";
// export const revalidate = 0;

// Optional: Set page-level revalidation (but tags are preferred)
// export const revalidate = 300; // 5 minutes

export default async function AuthorProfilePage() {
  return (
    <Suspense
      fallback={
        <PanelLoadingSkeleton
          title="Author Profile"
          description="View and manage your research profile"
          statsCount={0}
        />
      }
    >
      <AuthorProfileContent />
    </Suspense>
  );
}

/**
 * Server Component that fetches profile data
 * Uses Next.js fetch() with cache tags
 * Automatically refetches when cache is revalidated
 */
async function AuthorProfileContent() {
  // ✅ This uses fetch() with tag "author-profile"
  const profile = await getAuthorProfile();

  if (!profile) {
    return (
      <PanelContainer>
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary">Author Profile</h1>
          <p className="mt-2 text-text-gray">
            View and manage your research profile
          </p>
        </div>
        <div className="rounded-xl bg-destructive/10 p-6 text-destructive">
          Unable to load profile. Please try refreshing the page.
        </div>
      </PanelContainer>
    );
  }

  // Pass profile to Client Component for editing
  return (
    <PanelContainer>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary">Author Profile</h1>
        <p className="mt-2 text-text-gray">
          View and manage your research profile
        </p>
      </div>

      <AuthorProfileView profile={profile} />
    </PanelContainer>
  );
}
```

### 5. Client Component Form (`features/panel/author/profile/components/AuthorProfileView.tsx`)

```tsx
"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { AuthorProfile, AuthorProfileUpdatePayload } from "../types";
import { updateAuthorProfileAction } from "../actions";
import { Button } from "@/components/ui/button";
import { Pencil, Save, X } from "lucide-react";
import { toast } from "sonner";

interface AuthorProfileViewProps {
  profile: AuthorProfile;
}

export function AuthorProfileView({ profile }: AuthorProfileViewProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<AuthorProfileUpdatePayload>({
    title: profile.title || "",
    full_name: profile.full_name || "",
    institute: profile.institute || "",
    designation: profile.designation || "",
    degree: profile.degree || "",
    gender: profile.gender || "",
    bio: profile.bio || "",
    research_interests: profile.research_interests || "",
    orcid: profile.orcid || "",
    google_scholar: profile.google_scholar || "",
    researchgate: profile.researchgate || "",
    linkedin: profile.linkedin || "",
    website: profile.website || "",
  });

  /**
   * TanStack Query mutation
   * Calls Server Action which handles:
   * 1. API request to Django
   * 2. Cache revalidation with revalidateTag()
   * 3. Return updated profile
   */
  const updateMutation = useMutation({
    mutationFn: async (data: AuthorProfileUpdatePayload) => {
      const result = await updateAuthorProfileAction(data);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.profile;
    },
    onSuccess: () => {
      toast.success("Profile updated successfully");
      setIsEditing(false);
      // ✅ Router refresh triggers Server Component refetch
      // Next.js sees revalidated cache tag and refetches
      router.refresh();
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update profile");
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateMutation.mutate(formData);
  };

  const handleCancel = () => {
    setFormData({
      title: profile.title || "",
      full_name: profile.full_name || "",
      institute: profile.institute || "",
      designation: profile.designation || "",
      degree: profile.degree || "",
      gender: profile.gender || "",
      bio: profile.bio || "",
      research_interests: profile.research_interests || "",
      orcid: profile.orcid || "",
      google_scholar: profile.google_scholar || "",
      researchgate: profile.researchgate || "",
      linkedin: profile.linkedin || "",
      website: profile.website || "",
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header with Edit Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
            {profile.profile_picture_url ? (
              <img
                src={profile.profile_picture_url}
                alt={profile.full_name}
                className="h-20 w-20 rounded-full object-cover"
              />
            ) : (
              <span className="text-2xl font-bold text-primary">
                {profile.full_name?.charAt(0) ||
                  profile.email.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold">
              {profile.full_name || profile.email}
            </h2>
            <p className="text-text-gray">{profile.designation || "Author"}</p>
          </div>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} variant="outline">
            <Pencil className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button onClick={handleSave} disabled={updateMutation.isPending}>
              <Save className="mr-2 h-4 w-4" />
              {updateMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
            <Button
              onClick={handleCancel}
              variant="outline"
              disabled={updateMutation.isPending}
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
          </div>
        )}
      </div>

      {/* Profile Form Fields */}
      <div className="rounded-xl bg-card p-6 shadow-sm ring-1 ring-border space-y-6">
        <h3 className="text-lg font-semibold border-b pb-2">
          Basic Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            {isEditing ? (
              <select
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="">Select Title</option>
                <option value="Dr.">Dr.</option>
                <option value="Prof.">Prof.</option>
                <option value="Mr.">Mr.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Ms.">Ms.</option>
              </select>
            ) : (
              <p className="text-text-gray">
                {profile.title || "Not specified"}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            {isEditing ? (
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            ) : (
              <p className="text-text-gray">
                {profile.full_name || "Not specified"}
              </p>
            )}
          </div>

          {/* Add more fields as needed */}
        </div>
      </div>
    </div>
  );
}
```

## Why This Works: The Cache Revalidation Flow

### The Problem with Client-Only Invalidation

```tsx
// ❌ This doesn't work for Server Components
const mutation = useMutation({
  mutationFn: updateProfile,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["profile"] }); // Only affects client cache
  },
});
```

**Why it fails:**

- TanStack Query manages **client-side** React Query cache
- Server Component fetches data using **Next.js server cache** (separate cache)
- Invalidating client cache doesn't trigger Server Component refetch
- User needs full page reload to see updated Server Component data

### The Solution: Server Action + revalidateTag()

```tsx
// ✅ This works!
const mutation = useMutation({
  mutationFn: async (data) => {
    // Server Action invalidates Next.js cache
    const result = await updateProfileAction(data);
    return result;
  },
  onSuccess: () => {
    router.refresh(); // Triggers refetch of revalidated Server Components
  },
});
```

**Why it works:**

1. **Mutation calls Server Action** (runs on server)
2. **Server Action calls `revalidateTag("author-profile")`**
3. **Next.js marks cache as stale** for that tag
4. **`router.refresh()` triggers re-render** of Server Components
5. **Server Component re-fetches** because cache is stale
6. **Page updates** with new data (no full reload needed)

## Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Initial Page Load (Server Component)                     │
│    ┌──────────────────────────────────────────────┐        │
│    │  getAuthorProfile()                          │        │
│    │  └─> fetch() with tag: "author-profile"     │        │
│    │      └─> Django API: GET /profile/author/   │        │
│    │          └─> Cached with tag                │        │
│    └──────────────────────────────────────────────┘        │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. User Edits Profile (Client Component)                    │
│    ┌──────────────────────────────────────────────┐        │
│    │  useMutation → updateAuthorProfileAction()   │        │
│    │                                              │        │
│    │  Server Action:                             │        │
│    │  1. updateAuthorProfile() → Django API     │        │
│    │  2. revalidateTag("author-profile")        │        │
│    │  3. Return updated data                    │        │
│    └──────────────────────────────────────────────┘        │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. Cache Revalidation & Refresh                             │
│    ┌──────────────────────────────────────────────┐        │
│    │  router.refresh()                            │        │
│    │  └─> Next.js checks cache tags              │        │
│    │      └─> "author-profile" is stale          │        │
│    │          └─> Re-fetch Server Component      │        │
│    │              └─> getAuthorProfile() again   │        │
│    │                  └─> Fresh data from API    │        │
│    │                      └─> Page updates!      │        │
│    └──────────────────────────────────────────────┘        │
└─────────────────────────────────────────────────────────────┘
```

## Testing with Next.js DevTools

1. **Check Cache Status:**

   ```bash
   # In Next.js DevTools, navigate to Cache tab
   # Look for "author-profile" tag
   # Should show: CACHED (HIT) → STALE → MISS → CACHED (HIT)
   ```

2. **Verify No Full Page Reload:**

   - Open browser DevTools → Network tab
   - Edit and save profile
   - Should see: `/_next/data/...` requests (partial fetch)
   - Should NOT see: Full page HTML reload

3. **Test Cache Invalidation:**
   ```tsx
   // Add this temporarily to test
   console.log("Server Component render:", new Date().toISOString());
   ```
   - Should log twice: once on initial load, once after mutation

## Common Pitfalls

### 1. Missing `router.refresh()`

```tsx
// ❌ Cache revalidated but page doesn't update
onSuccess: () => {
  toast.success("Updated");
  // Missing router.refresh() - user sees stale data
};

// ✅ Correct
onSuccess: () => {
  toast.success("Updated");
  router.refresh(); // Triggers Server Component refetch
};
```

### 2. Wrong Cache Tags

```tsx
// ❌ Tags don't match
serverGet("/api/profile/", { tags: ["profile"] });
revalidateTag("author-profile"); // Different tag!

// ✅ Tags must match exactly
serverGet("/api/profile/", { tags: ["author-profile"] });
revalidateTag("author-profile");
```

### 3. Using Axios in Server Components

```tsx
// ❌ Axios is client-side library
import { api } from "@/services/api";
const profile = await api.get("/profile/"); // Error!

// ✅ Use native fetch()
const profile = await serverGet("/profile/");
```

## References

- [Next.js Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [React cache()](https://react.dev/reference/react/cache)
- [Next.js revalidateTag()](https://nextjs.org/docs/app/api-reference/functions/revalidateTag)
- [TanStack Query with Next.js](https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr)

## Summary

✅ **Use Next.js fetch()** with cache tags in Server Components  
✅ **Use TanStack Query mutations** in Client Components  
✅ **Call Server Actions** from mutations to revalidate cache  
✅ **Use `router.refresh()`** after successful mutation  
❌ **Don't use `revalidate = 0`** - defeats caching  
❌ **Don't rely on `queryClient.invalidateQueries()`** alone  
❌ **Don't use axios/client libraries** in Server Components

This pattern gives you:

- ⚡ Fast initial load (cached Server Components)
- 🔄 Optimistic updates (TanStack Query)
- 🎯 Targeted revalidation (cache tags)
- 📱 No full page reload (router.refresh)
- 🎨 Best of both worlds (server + client)
