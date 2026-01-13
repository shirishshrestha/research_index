# Client-Server Architecture Refactor

## Overview

Successfully refactored profile page architecture to properly separate client and server responsibilities following Next.js 16+ best practices.

## Key Changes

### 1. Server Actions Simplified

**Before:** Server Actions handled both API calls and cache revalidation  
**After:** Server Actions ONLY handle cache revalidation

```typescript
// features/panel/author/profile/actions.ts
"use server";

import { revalidateTag } from "next/cache";

export async function revalidateAuthorProfileAction() {
  revalidateTag("author-profile");
}
```

### 2. Removed Mutations from server-api.ts

**Before:** `server-api.ts` contained POST, PATCH, PUT, DELETE methods  
**After:** `server-api.ts` only contains `serverGet()` for Server Components

```typescript
// lib/server-api.ts
// REMOVED: serverPost(), serverPatch(), serverPut(), serverDelete()
// KEPT: serverGet() with cache tags
```

### 3. Created Validation Schemas

Separate zod schema files for type-safe validation:

```typescript
// features/panel/author/profile/schema.ts
export const authorProfileSchema = z.object({
  title: z.enum(["Dr.", "Prof.", "Mr.", "Mrs.", "Ms.", ""]).optional(),
  full_name: z.string().min(2, "Full name must be at least 2 characters"),
  // ... other fields with validation rules
});

export type AuthorProfileFormData = z.infer<typeof authorProfileSchema>;
```

### 4. Created Dedicated Form Components

**Before:** Forms embedded in view components  
**After:** Separate form components with shadcn + react-hook-form + zod

```typescript
// features/panel/author/profile/components/AuthorProfileForm.tsx
export function AuthorProfileForm({ profile, onCancel, onSuccess }) {
  const form = useForm<AuthorProfileFormData>({
    resolver: zodResolver(authorProfileSchema),
    defaultValues: {
      /* ... */
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data) => {
      // Direct axios call - client-side only
      return await api.patch("/api/auth/profile/author/", data);
    },
    onSuccess: async () => {
      await revalidateAuthorProfileAction(); // Server Action - cache only
      router.refresh(); // Trigger Server Component refetch
      onSuccess();
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(updateMutation.mutate)}>
        {/* shadcn form fields */}
      </form>
    </Form>
  );
}
```

### 5. Updated View Components

**Before:** Mixed display and edit logic  
**After:** Pure display with toggle to separate form

```typescript
// features/panel/author/profile/components/AuthorProfileView.tsx
export function AuthorProfileView({ profile }) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <AuthorProfileForm
        profile={profile}
        onCancel={() => setIsEditing(false)}
        onSuccess={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div>
      <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
      {/* Display fields only */}
    </div>
  );
}
```

## Architecture Pattern

```
┌─────────────────────────────────────────────────────────────┐
│                     Server Component                          │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Page: app/(panel)/author/profile/page.tsx            │  │
│  │  - Fetches data with serverGet() + cache tags         │  │
│  │  - Passes data to Client Component                    │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     Client Component                          │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  AuthorProfileView                                     │  │
│  │  - Display mode: Shows profile data                   │  │
│  │  - Edit button: Toggles to form                       │  │
│  └───────────────────────────────────────────────────────┘  │
│                            │                                  │
│                            ▼ (when editing)                   │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  AuthorProfileForm                                     │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │ react-hook-form + zodResolver(schema)           │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  │                            │                            │  │
│  │                            ▼                            │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │ useMutation (TanStack Query)                    │  │  │
│  │  │  - mutationFn: api.patch() [axios, client-side]│  │  │
│  │  │  - onSuccess:                                   │  │  │
│  │  │     1. revalidateAuthorProfileAction()          │  │  │
│  │  │     2. router.refresh()                         │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     Server Action                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  revalidateAuthorProfileAction()                       │  │
│  │  - ONLY calls revalidateTag()                         │  │
│  │  - NO API calls                                       │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                Next.js Cache Invalidation                     │
│  - Invalidates "author-profile" tag                          │
│  - router.refresh() triggers Server Component refetch        │
│  - Server Component calls serverGet() with cache tag         │
│  - Fresh data fetched from API                               │
└─────────────────────────────────────────────────────────────┘
```

## Files Changed

### New Files

1. `features/panel/author/profile/schema.ts` - Zod validation schema
2. `features/panel/author/profile/components/AuthorProfileForm.tsx` - Form component
3. `features/panel/institution/profile/schema.ts` - Zod validation schema
4. `features/panel/institution/profile/components/InstitutionProfileForm.tsx` - Form component

### Modified Files

1. `lib/server-api.ts` - Removed all mutation methods
2. `features/panel/author/profile/actions.ts` - Simplified to cache-only
3. `features/panel/author/profile/api.ts` - Removed updateAuthorProfile()
4. `features/panel/author/profile/components/AuthorProfileView.tsx` - Removed embedded form logic
5. `features/panel/institution/profile/actions.ts` - Simplified to cache-only
6. `features/panel/institution/profile/api.ts` - Removed updateInstitutionProfile()
7. `features/panel/institution/profile/components/InstitutionProfileView.tsx` - Removed embedded form logic

## Benefits

### 1. Cleaner Separation of Concerns

- **Server-side:** Data fetching and caching
- **Client-side:** User interactions and mutations
- **Server Actions:** Cache invalidation only

### 2. Type Safety

- Zod schemas provide runtime validation
- TypeScript types inferred from schemas
- Form data fully typed

### 3. Reusability

- Form components can be used independently
- Validation schemas can be reused
- View components are purely presentational

### 4. Better DX (Developer Experience)

- Clear data flow
- Easier to debug
- Follows Next.js best practices
- TanStack Query handles loading/error states

### 5. Performance

- Server Components fetch data with caching
- Client Components only mount when needed
- Optimistic updates possible with TanStack Query
- Cache revalidation triggers efficient refetch

## Usage Example

```typescript
// In a Server Component page
export default async function AuthorProfilePage() {
  const profile = await getAuthorProfile(); // Uses cache tags

  return <AuthorProfileView profile={profile} />;
}

// User clicks "Edit" button
// → AuthorProfileForm component renders
// → User fills form
// → Form validates with zod schema
// → Submit triggers useMutation
//   → Calls api.patch() directly (client-side axios)
//   → On success:
//     1. Calls revalidateAuthorProfileAction() (Server Action)
//     2. Calls router.refresh() (Client-side navigation)
//     3. Server Component refetches with cache tag
//     4. Fresh data displayed
```

## Testing Checklist

- [ ] Form validation works (zod schema)
- [ ] Mutation succeeds (TanStack Query)
- [ ] Cache invalidation works (revalidateTag)
- [ ] Server Component refetches (router.refresh)
- [ ] Loading states displayed correctly
- [ ] Error handling works
- [ ] Success toast shown
- [ ] Form resets after success

## Related Documentation

- [PROFILE_PAGE_PATTERN.md](./PROFILE_PAGE_PATTERN.md) - Original implementation guide
- [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) - First refactor summary
- [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [TanStack Query Mutations](https://tanstack.com/query/latest/docs/react/guides/mutations)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Validation](https://zod.dev/)
