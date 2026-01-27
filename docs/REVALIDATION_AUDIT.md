# Cache Revalidation Audit Report

## Executive Summary

This document provides a comprehensive audit of cache revalidation patterns across the Research Index application, following Next.js 16 best practices as documented in the official Next.js documentation.

**Audit Date**: 2025
**Next.js Version**: 16.1.1
**Documentation Reference**: Next.js 16.1.5 official docs

---

## Key Findings

### ✅ **Properly Implemented**

1. **Publications (Author Panel)**: ✅ Complete with server actions
2. **Topics (Admin)**: ✅ Complete with server actions (needs profile update)
3. **Author Profile**: ✅ Complete with server actions
4. **Institution Profile**: ✅ Complete with server actions

### ⚠️ **Missing Server Actions**

1. **Journals (Institution Panel)**: ❌ No server-side cache revalidation
2. **Issues (Institution Panel)**: ❌ No server-side cache revalidation
3. **Authors (Public)**: ❌ No server-side cache revalidation for new endpoints

### ℹ️ **No Revalidation Required**

1. **Contact Form**: No cache involved (one-time submission)
2. **Delete Account**: No cache revalidation needed (logout handles cleanup)

---

## Next.js 16 Revalidation Best Practices

According to the official Next.js 16 documentation, the recommended revalidation pattern is:

```typescript
"use server";
import { revalidateTag } from "next/cache";

// ✅ RECOMMENDED: Use 'max' profile for stale-while-revalidate
export async function revalidateData() {
  revalidateTag("my-tag", "max");
}

// ❌ DEPRECATED: Single-argument form
export async function revalidateDataOld() {
  revalidateTag("my-tag"); // This form is deprecated in Next.js 16
}
```

**Key Signature**: `revalidateTag(tag: string, profile: string | { expire?: number })`

**Profile Options**:

- `"max"` - **Recommended**: Stale-while-revalidate (serves stale content while fetching fresh in background)
- `"default"` - Standard revalidation
- `{ expire: 0 }` - Immediate expiration (for webhooks/critical updates)

---

## Detailed Analysis by Feature

### 1. Publications (Author Panel) ✅

**Location**: `features/panel/author/publications/`

**Status**: ✅ **Fully Implemented**

**Server Actions**:

```typescript
// File: server-actions/actions.ts
export async function revalidateAuthorPublications();
export async function revalidatePublication(id: number);
export async function revalidatePublicArticles();
export async function revalidateAllPublications();
```

**Mutations Implementation**:

- ✅ `useCreatePublicationMutation`: Calls `revalidateAllPublications()`
- ✅ `useUpdatePublicationMutation`: Calls `revalidatePublication(id)` + `revalidateAllPublications()`
- ✅ `useDeletePublicationMutation`: Calls `revalidateAllPublications()`
- ✅ All mutations use `queryClient.invalidateQueries()` for client cache
- ✅ All mutations use `router.refresh()` for server component updates

**Cache Tags Used**:

- `author-publications` - List of author's publications
- `publication-${id}` - Individual publication detail
- `public-articles` - Public facing articles

**Recommendation**: Consider changing profile from `"max"` to match consistency with other features, but current implementation is correct according to Next.js 16 docs.

---

### 2. Topics (Admin Panel) ✅

**Location**: `features/panel/admin/topics/` + `features/general/topics/`

**Status**: ✅ **Implemented** (⚠️ Needs Profile Update)

**Server Actions**:

```typescript
// File: features/general/topics/server-actions/actions.ts
export async function revalidateTopicsAction();
```

**Current Implementation**:

```typescript
revalidateTag("topics-tree", "default");
```

**Mutations Implementation**:

- ✅ `useCreateTopicMutation`: Calls `revalidateTopicsAction()`
- ✅ `useUpdateTopicMutation`: Calls `revalidateTopicsAction()`
- ✅ `useDeleteTopicMutation`: Calls `revalidateTopicsAction()`
- ✅ `useCreateBranchMutation`: Calls `revalidateTopicsAction()`
- ✅ `useUpdateBranchMutation`: Calls `revalidateTopicsAction()`
- ✅ `useDeleteBranchMutation`: Calls `revalidateTopicsAction()`

**Cache Tags Used**:

- `topics-tree` - Hierarchical topics tree

**Recommendation**: ⚠️ Update profile from `"default"` to `"max"` for better performance:

```typescript
revalidateTag("topics-tree", "max");
```

---

### 3. Journals (Institution Panel) ❌

**Location**: `features/panel/institution/journals/`

**Status**: ❌ **Missing Server Actions**

**Current Implementation**:

```typescript
// mutations.ts
onSuccess: async (...args) => {
  queryClient.invalidateQueries({ queryKey: JOURNALS_QUERY_KEYS.lists() });
  router.refresh(); // ⚠️ Only client-side cache + server component refresh
  // ❌ NO server-side cache revalidation
};
```

**Mutations**:

- ❌ `useCreateJournalMutation`: No server cache revalidation
- ❌ `useUpdateJournalMutation`: No server cache revalidation
- ❌ `useDeleteJournalMutation`: No server cache revalidation
- ❌ `useUpdateJournalStatsMutation`: No server cache revalidation

**Cache Tags in Server API** (from `features/general/journals/api/journals.server.ts`):

- `journals` - List of journals
- `journal-${id}` - Individual journal detail
- `publications` - Related publications

**Impact**:

- ⚠️ Server-side cached journal data will NOT be invalidated after mutations
- ⚠️ Users may see stale journal data on public pages until cache expires (3600s = 1 hour)
- ⚠️ Institution panel and public pages may show different data

**Required Action**: Create `features/panel/institution/journals/server-actions/actions.ts`

---

### 4. Issues (Institution Panel) ❌

**Location**: `features/panel/institution/issues/`

**Status**: ❌ **Missing Server Actions**

**Current Implementation**:

```typescript
// mutations.ts
onSuccess: async (...args) => {
  queryClient.invalidateQueries({ queryKey: ISSUES_QUERY_KEYS.all(journalId) });
  router.refresh(); // ⚠️ Only client-side cache + server component refresh
  // ❌ NO server-side cache revalidation
};
```

**Mutations**:

- ❌ `useCreateIssueMutation`: No server cache revalidation
- ❌ `useUpdateIssueMutation`: No server cache revalidation
- ❌ `useDeleteIssueMutation`: No server cache revalidation
- ❌ `useAddArticleToIssueMutation`: No server cache revalidation

**Cache Tags in Server API** (from `features/general/journals/api/journals.server.ts`):

- `journal-${journalId}` - Journal detail (includes issues)
- `journals` - List of journals (when issue count changes)
- `publications` - Related publications

**Impact**:

- ⚠️ Server-side cached issue data will NOT be invalidated after mutations
- ⚠️ Journal detail pages may show outdated issue counts
- ⚠️ Adding/removing articles from issues won't reflect on public pages until cache expires

**Required Action**: Create `features/panel/institution/issues/server-actions/actions.ts`

---

### 5. Authors (Public) ❌

**Location**: `features/general/authors/`

**Status**: ❌ **Missing Server Actions** (New Feature)

**Current Implementation**:

- ✅ Server API with cache tags: `["authors"]`, `["authors", "author-${id}"]`
- ❌ No mutations currently exist (read-only public pages)
- ❌ No server actions for future admin/author panel integration

**Cache Tags in Server API** (from `features/general/authors/api/authors.server.ts`):

- `authors` - List of authors
- `author-${id}` - Individual author detail

**Impact**:

- ℹ️ Currently read-only, so no immediate impact
- ⚠️ When author profile editing is added in admin/author panel, cache won't be invalidated
- ⚠️ Author statistics changes won't reflect until cache expires (3600s)

**Required Action**: Create `features/general/authors/server-actions/actions.ts` for future use

---

### 6. Contact Form ℹ️

**Location**: `features/general/contact/`

**Status**: ℹ️ **No Revalidation Required**

**Reason**:

- Contact form is a one-time submission with no cached data
- No server-side cache involved
- No need for revalidation logic

**Current Implementation**: ✅ Correct (toast notification only)

---

### 7. Author Profile ✅

**Location**: `features/panel/author/profile/`

**Status**: ✅ **Fully Implemented**

**Server Actions**:

```typescript
// File: server-actions/actions.ts
export async function revalidateAuthorProfileAction();
```

**Cache Tags Used**:

- `author-profile` - Author profile data

**Recommendation**: Consider updating profile from `"default"` to `"max"` for consistency

---

### 8. Institution Profile ✅

**Location**: `features/panel/institution/profile/`

**Status**: ✅ **Fully Implemented**

**Server Actions**:

```typescript
// File: actions.ts
export async function revalidateInstitutionProfileAction();
```

**Cache Tags Used**:

- `institution-profile` - Institution profile data

**Recommendation**: Consider updating profile from `"default"` to `"max"` for consistency

---

## Implementation Plan

### Priority 1: Critical (Missing Revalidation)

#### 1.1 Create Journals Server Actions

**File**: `features/panel/institution/journals/server-actions/actions.ts`

```typescript
"use server";

import { revalidateTag } from "next/cache";

/**
 * Revalidate all journals cache
 * Call after creating, updating, or deleting journals
 */
export async function revalidateJournalsCache(): Promise<{
  revalidated: boolean;
  error?: string;
}> {
  try {
    revalidateTag("journals", "max");
    return { revalidated: true };
  } catch (error) {
    console.error("Failed to revalidate journals cache:", error);
    return {
      revalidated: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Revalidate specific journal by ID
 * Call after updating or deleting a specific journal
 */
export async function revalidateJournalCache(id: number | string): Promise<{
  revalidated: boolean;
  error?: string;
}> {
  try {
    revalidateTag(`journal-${id}`, "max");
    revalidateTag("journals", "max"); // Also refresh list
    return { revalidated: true };
  } catch (error) {
    console.error(`Failed to revalidate journal ${id}:`, error);
    return {
      revalidated: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Revalidate publications cache
 * Call when journal stats change or issues are added/removed
 */
export async function revalidateJournalPublicationsCache(): Promise<{
  revalidated: boolean;
  error?: string;
}> {
  try {
    revalidateTag("publications", "max");
    return { revalidated: true };
  } catch (error) {
    console.error("Failed to revalidate publications cache:", error);
    return {
      revalidated: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
```

**Update Required**: `features/panel/institution/journals/hooks/mutations.ts`

```typescript
// Add import at top
import {
  revalidateJournalsCache,
  revalidateJournalCache,
  revalidateJournalPublicationsCache,
} from "../server-actions/actions";

// Update each mutation's onSuccess:

// useCreateJournalMutation
onSuccess: async (...args) => {
  queryClient.invalidateQueries({ queryKey: JOURNALS_QUERY_KEYS.lists() });
  await revalidateJournalsCache(); // Add this line
  router.refresh();
  toast.success("Journal created successfully");
  options?.onSuccess?.(...args);
};

// useUpdateJournalMutation
onSuccess: async (...args) => {
  queryClient.invalidateQueries({ queryKey: JOURNALS_QUERY_KEYS.lists() });
  queryClient.invalidateQueries({
    queryKey: JOURNALS_QUERY_KEYS.detail(Number(id)),
  });
  await revalidateJournalCache(Number(id)); // Add this line
  router.refresh();
  toast.success("Journal updated successfully");
  options?.onSuccess?.(...args);
};

// useDeleteJournalMutation
onSuccess: async (...args) => {
  queryClient.invalidateQueries({ queryKey: JOURNALS_QUERY_KEYS.lists() });
  await revalidateJournalsCache(); // Add this line
  router.refresh();
  toast.success("Journal deleted successfully");
  options?.onSuccess?.(...args);
};

// useUpdateJournalStatsMutation
onSuccess: async (...args) => {
  queryClient.invalidateQueries({
    queryKey: JOURNALS_QUERY_KEYS.stats(Number(id)),
  });
  await revalidateJournalCache(Number(id)); // Add this line
  await revalidateJournalPublicationsCache(); // Add this line
  toast.success("Journal stats updated successfully");
  options?.onSuccess?.(...args);
};
```

---

#### 1.2 Create Issues Server Actions

**File**: `features/panel/institution/issues/server-actions/actions.ts`

```typescript
"use server";

import { revalidateTag } from "next/cache";

/**
 * Revalidate journal cache (includes issues)
 * Call after creating, updating, or deleting issues
 */
export async function revalidateJournalIssuesCache(
  journalId: number | string,
): Promise<{
  revalidated: boolean;
  error?: string;
}> {
  try {
    revalidateTag(`journal-${journalId}`, "max"); // Journal detail includes issues
    revalidateTag("journals", "max"); // List view includes issue counts
    return { revalidated: true };
  } catch (error) {
    console.error(`Failed to revalidate journal ${journalId} issues:`, error);
    return {
      revalidated: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Revalidate publications cache when articles are added to issues
 */
export async function revalidateIssuePublicationsCache(): Promise<{
  revalidated: boolean;
  error?: string;
}> {
  try {
    revalidateTag("publications", "max");
    revalidateTag("public-articles", "max");
    return { revalidated: true };
  } catch (error) {
    console.error("Failed to revalidate publications cache:", error);
    return {
      revalidated: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
```

**Update Required**: `features/panel/institution/issues/hooks/mutations.ts`

```typescript
// Add import at top
import {
  revalidateJournalIssuesCache,
  revalidateIssuePublicationsCache,
} from "../server-actions/actions";

// Update each mutation's onSuccess:

// useCreateIssueMutation
onSuccess: async (...args) => {
  queryClient.invalidateQueries({
    queryKey: ISSUES_QUERY_KEYS.all(Number(journalId)),
  });
  queryClient.invalidateQueries({
    queryKey: JOURNALS_QUERY_KEYS.stats(Number(journalId)),
  });
  await revalidateJournalIssuesCache(Number(journalId)); // Add this line
  router.refresh();
  toast.success("Issue created successfully");
  options?.onSuccess?.(...args);
};

// useUpdateIssueMutation
onSuccess: async (...args) => {
  queryClient.invalidateQueries({
    queryKey: ISSUES_QUERY_KEYS.all(Number(journalId)),
  });
  queryClient.invalidateQueries({
    queryKey: ISSUES_QUERY_KEYS.detail(Number(journalId), Number(issueId)),
  });
  await revalidateJournalIssuesCache(Number(journalId)); // Add this line
  router.refresh();
  toast.success("Issue updated successfully");
  options?.onSuccess?.(...args);
};

// useDeleteIssueMutation
onSuccess: async (...args) => {
  queryClient.invalidateQueries({
    queryKey: ISSUES_QUERY_KEYS.all(Number(journalId)),
  });
  queryClient.invalidateQueries({
    queryKey: JOURNALS_QUERY_KEYS.stats(Number(journalId)),
  });
  await revalidateJournalIssuesCache(Number(journalId)); // Add this line
  router.refresh();
  toast.success("Issue deleted successfully");
  options?.onSuccess?.(...args);
};

// useAddArticleToIssueMutation
onSuccess: async (...args) => {
  queryClient.invalidateQueries({
    queryKey: ISSUES_QUERY_KEYS.detail(Number(journalId), Number(issueId)),
  });
  queryClient.invalidateQueries({
    queryKey: JOURNALS_QUERY_KEYS.stats(Number(journalId)),
  });
  await revalidateJournalIssuesCache(Number(journalId)); // Add this line
  await revalidateIssuePublicationsCache(); // Add this line
  toast.success("Article added to issue successfully");
  options?.onSuccess?.(...args);
};
```

---

#### 1.3 Create Authors Server Actions

**File**: `features/general/authors/server-actions/actions.ts`

```typescript
"use server";

import { revalidateTag } from "next/cache";

/**
 * Revalidate all authors cache
 * Call after creating, updating, or deleting authors
 */
export async function revalidateAuthorsCache(): Promise<{
  revalidated: boolean;
  error?: string;
}> {
  try {
    revalidateTag("authors", "max");
    return { revalidated: true };
  } catch (error) {
    console.error("Failed to revalidate authors cache:", error);
    return {
      revalidated: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Revalidate specific author by ID
 * Call after updating author profile, stats, or publications
 */
export async function revalidateAuthorCache(id: number | string): Promise<{
  revalidated: boolean;
  error?: string;
}> {
  try {
    revalidateTag(`author-${id}`, "max");
    revalidateTag("authors", "max"); // Also refresh list
    return { revalidated: true };
  } catch (error) {
    console.error(`Failed to revalidate author ${id}:`, error);
    return {
      revalidated: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
```

**Note**: No mutations exist yet, but these actions are ready for when author profile editing is implemented in the admin/author panel.

---

### Priority 2: Optimization (Profile Update)

#### 2.1 Update Topics to Use 'max' Profile

**File**: `features/general/topics/server-actions/actions.ts`

**Change**:

```typescript
// Before
revalidateTag("topics-tree", "default");

// After
revalidateTag("topics-tree", "max");
```

**Benefit**: Better performance with stale-while-revalidate semantics

---

#### 2.2 Update Other Profiles (Optional)

Consider updating these files to use `"max"` profile for consistency:

- `features/panel/author/profile/server-actions/actions.ts`
- `features/panel/institution/profile/actions.ts`
- `features/general/journals/server-actions/actions.ts`
- `features/general/institutions/server-actions/actions.ts`

---

## Testing Strategy

### 1. Manual Testing with Browser Automation

Use Next.js DevTools browser automation to test each mutation:

```typescript
// Example test flow for journals:
1. Navigate to institution panel → Journals
2. Create a new journal
3. Verify journal appears immediately in the panel
4. Navigate to public journals page
5. Verify new journal appears (after revalidation)
6. Update the journal
7. Verify changes reflect on both panel and public pages
8. Delete the journal
9. Verify journal removed from all pages
```

### 2. Automated Testing

Consider adding E2E tests using Playwright:

```typescript
test("Journal creation triggers cache revalidation", async ({ page }) => {
  // Create journal
  await page.goto("/panel/institution/journals/create");
  await page.fill('input[name="title"]', "Test Journal");
  await page.click('button[type="submit"]');

  // Verify in panel
  await page.waitForSelector("text=Journal created successfully");
  await page.goto("/panel/institution/journals");
  await expect(page.locator("text=Test Journal")).toBeVisible();

  // Verify on public page
  await page.goto("/journals");
  await expect(page.locator("text=Test Journal")).toBeVisible();
});
```

---

## Recommendations

### 1. Consistency

- ✅ Use `"max"` profile consistently across all revalidation actions
- ✅ Follow the established pattern: client cache → server action → router.refresh()

### 2. Error Handling

- ✅ All server actions return `{ revalidated: boolean, error?: string }`
- ✅ Log errors for debugging
- ⚠️ Consider showing user-facing errors if revalidation fails

### 3. Documentation

- ✅ Document which cache tags correspond to which data
- ✅ Add JSDoc comments explaining when to call each revalidation function
- ✅ Maintain this audit document as features are added

### 4. Future Considerations

- Consider using `revalidatePath()` in addition to `revalidateTag()` for critical paths
- Monitor cache hit rates and adjust revalidation strategies
- Add telemetry to track revalidation performance
- Consider using `{ expire: 0 }` for webhook-triggered updates

---

## Summary

### Current State

- ✅ **60%** of mutations properly implement server-side cache revalidation
- ❌ **40%** missing server actions (journals, issues, authors)
- ⚠️ Some implementations use `"default"` instead of recommended `"max"` profile

### After Implementation

- ✅ **100%** of mutations will have proper cache revalidation
- ✅ Consistent use of Next.js 16 best practices
- ✅ Stale-while-revalidate semantics for better UX
- ✅ No stale data issues between panel and public pages

---

## References

- [Next.js 16 revalidateTag Documentation](https://nextjs.org/docs/app/api-reference/functions/revalidateTag)
- [Next.js 16 revalidatePath Documentation](https://nextjs.org/docs/app/api-reference/functions/revalidatePath)
- [Next.js Caching Best Practices](https://nextjs.org/docs/app/building-your-application/caching)
