# Issues Tab Integration - Implementation Summary

## Overview

Successfully integrated the **All Issues** and **Latest Issues** tabs with real backend API data, following the established Next.js patterns and best practices.

## Changes Made

### 1. New API Layer Files

#### `features/general/journals/api/journals.server.ts`

**Purpose**: Server-side API functions for Server Components

**Added Type Definitions**:

```typescript
interface IssueArticle {
  id: number;
  publication: number;
  article_title: string;
  article_authors: string;
  article_doi: string | null;
  order: number;
  section: string | null;
}

interface Issue {
  id: number;
  journal_title: string;
  volume: number;
  issue_number: number;
  title: string | null;
  description: string | null;
  cover_image_url: string | null;
  publication_date: string;
  status: string;
  status_display: string;
  is_special_issue: boolean;
  articles_count: number;
  created_at: string;
  updated_at: string;
}

interface IssueDetail extends Issue {
  journal_id: number;
  cover_image: string | null;
  submission_deadline: string | null;
  doi: string | null;
  pages_range: string | null;
  editorial_note: string | null;
  guest_editors: string | null;
  articles: IssueArticle[];
}
```

**Added API Functions**:

```typescript
// Fetch all issues for a journal with optional filters
export async function getJournalIssues(
  journalId: number | string,
  filters?: { year?: number; volume?: number; status?: string },
): Promise<Issue[]>;

// Fetch single issue detail with articles
export async function getJournalIssue(
  journalId: number | string,
  issueId: number | string,
): Promise<IssueDetail>;
```

#### `features/general/journals/api/journals.client.ts` (NEW)

**Purpose**: Client-side API functions using TanStack Query for Client Components

**Hook Created**:

```typescript
// React Query hook for fetching journal issues
export function useJournalIssues(
  journalId: number | undefined,
  filters?: { year?: number; volume?: number; status?: string },
);
```

### 2. Updated Components

#### `features/general/journals/components/TabDetails/AllIssuesTab.tsx`

**Status**: ✅ Fully Integrated

**Changes**:

- Removed mock data (`volumesData`)
- Added `journalId` prop: `interface AllIssuesTabProps { journalId: number }`
- Integrated `useJournalIssues()` hook for data fetching
- Implemented dynamic volume grouping with `useMemo`
- Added loading, error, and empty states
- Issues now link to `/journals/${journalId}/issues/${issueId}`
- Displays real data:
  - Volume and year grouping
  - Issue numbers with special issue badges
  - Publication dates
  - Article counts
  - Status indicators (published, in progress, etc.)

**Key Features**:

```typescript
// Grouped issues by volume
const volumes = useMemo(() => {
  const volumeMap = new Map<number, VolumeGroup>();
  issues.forEach((issue) => {
    // Group by volume, extract year from publication_date
  });
  return Array.from(volumeMap.values()).sort((a, b) => b.volume - a.volume);
}, [issues]);

// Dynamic sidebar navigation
const sidebarSections = useMemo(
  () =>
    volumes.map((volumeGroup) => ({
      title: `Volume ${volumeGroup.volume} (${volumeGroup.year})`,
      items: volumeGroup.issues.map((issue) => ({
        id: `issue-${issue.id}`,
        label: `Issue ${issue.issue_number}`,
        href: `#issue-${issue.id}`,
      })),
    })),
  [volumes],
);
```

#### `features/general/journals/components/TabDetails/LatestIssuesTab.tsx`

**Status**: ✅ Fully Integrated

**Changes**:

- Removed mock data (`mockArticles`)
- Added `journalId` prop: `interface LatestIssuesTabProps { journalId: number }`
- Integrated `useJournalIssues()` with `status: "published"` filter
- Gets first issue from sorted results (latest)
- Added loading, error, and empty states
- Displays latest issue metadata:
  - Volume and issue number
  - Publication date (formatted as "Month Year")
  - Issue title (if available)
  - Article count
  - Link to full issue details

**UI Updates**:

- Removed pagination (not needed for single issue view)
- Removed search bar (article search belongs in issue detail page)
- Added informational card with article count
- Added "View Full Issue" button linking to issue detail page
- Kept filter sidebar for future article filtering enhancement

#### `features/general/journals/components/JournalDetails.tsx`

**Status**: ✅ Updated

**Changes**:

```typescript
// Before:
<LatestIssuesTab />
<AllIssuesTab />

// After:
<LatestIssuesTab journalId={journal.id} />
<AllIssuesTab journalId={journal.id} />
```

## Backend Integration

### API Endpoints Used

**List Issues**:

```
GET /publications/journals/{journal_pk}/issues/
Query Params: ?year={year}&volume={volume}&status={status}
```

**Issue Detail**:

```
GET /publications/journals/{journal_pk}/issues/{pk}/
```

**Permissions**: `AllowAny` (public access)

**Ordering**: `-volume, -issue_number, -publication_date` (descending)

### Response Format

**IssueListSerializer** (list endpoint):

```json
{
  "id": 1,
  "journal_title": "Journal Name",
  "volume": 10,
  "issue_number": 2,
  "title": "Special Issue Title",
  "description": "Issue description",
  "cover_image_url": "https://...",
  "publication_date": "2025-01-30",
  "status": "published",
  "status_display": "Published",
  "is_special_issue": false,
  "articles_count": 12,
  "created_at": "2025-01-01T00:00:00Z",
  "updated_at": "2025-01-30T00:00:00Z"
}
```

**IssueDetailSerializer** (detail endpoint):

```json
{
  // ... all fields from IssueListSerializer, plus:
  "journal_id": 1,
  "cover_image": null,
  "submission_deadline": "2025-02-15",
  "doi": "10.1234/journal.v10i2",
  "pages_range": "1-150",
  "editorial_note": "Editorial note text",
  "guest_editors": "Guest editors names",
  "articles": [
    {
      "id": 1,
      "publication": 123,
      "article_title": "Article Title",
      "article_authors": "Author 1, Author 2",
      "article_doi": "10.1234/article.doi",
      "order": 1,
      "section": "Research Articles"
    }
  ]
}
```

## Implementation Pattern

### Server-Side Pattern (Server Components)

```typescript
// In .server.ts file
import { serverGet } from "@/lib/server-api";

export async function getData() {
  return serverGet<Type>("/endpoint", {
    tags: ["cache-tag"],
    revalidate: 3600,
  });
}

// In page.tsx (Server Component)
async function PageContent() {
  const data = await getData();
  return <Component data={data} />;
}
```

### Client-Side Pattern (Client Components)

```typescript
// In .client.ts file
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

export function useData(id: number) {
  return useQuery({
    queryKey: ["data", id],
    queryFn: () => api.get(`/endpoint/${id}`),
    enabled: !!id,
  });
}

// In component.tsx (Client Component)
"use client";

function Component({ id }: Props) {
  const { data, isLoading, error } = useData(id);

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState />;
  return <Content data={data} />;
}
```

## Architecture Decisions

### Why Client Components for Issue Tabs?

1. **Interactive UI**: Accordions, filters, and dynamic navigation require client-side interactivity
2. **Tab System**: ProfileTabs component manages client-side tab state
3. **User Experience**: Instant loading states and error handling without full page reloads
4. **Filtering**: Future enhancements will require client-side filter state management

### Data Fetching Strategy

**Initial Approach** (Incorrect):

- ❌ Tried to call server-side functions (`getJournalIssues`) from client components
- ❌ Resulted in `next/headers` import error in client context

**Correct Approach** (Implemented):

- ✅ Created separate client-side API file (`journals.client.ts`)
- ✅ Used TanStack Query hooks (`useJournalIssues`)
- ✅ Follows established codebase pattern
- ✅ Provides automatic caching, revalidation, and error handling

## Testing & Build Results

### Development Server Testing

```bash
# Dev server check
✅ No runtime errors detected
✅ Routes load correctly: /journals/2?tab=all-issues
✅ Data fetches successfully from API
```

### Production Build

```bash
$ pnpm run build
✓ Compiled successfully in 23.2s
✓ Finished TypeScript in 18.2s
✓ Collecting page data using 11 workers in 14.0s
✓ Generating static pages (30/30) in 4.3s
✓ Finalizing page optimization in 71.9ms

Build Status: ✅ SUCCESS
TypeScript Errors: 0
```

### Route Analysis

```
Route (app)
├ ƒ /journals              # Dynamic (cookies)
├ ƒ /journals/[id]         # Dynamic (cookies) - Includes issue tabs
```

**Note**: Routes marked as `ƒ (Dynamic)` are expected since they use authentication cookies. This is correct behavior for server-rendered routes with auth.

## Files Modified

### Created

1. `features/general/journals/api/journals.client.ts` - Client-side API hooks

### Modified

1. `features/general/journals/api/journals.server.ts` - Added Issue types and server functions
2. `features/general/journals/components/TabDetails/AllIssuesTab.tsx` - Integrated real data
3. `features/general/journals/components/TabDetails/LatestIssuesTab.tsx` - Integrated real data
4. `features/general/journals/components/JournalDetails.tsx` - Pass journalId prop to tabs

## Future Enhancements

### Phase 2 (Recommended)

1. **Issue Detail Page**: Create `/journals/[id]/issues/[issueId]` route to display:
   - Full issue metadata
   - List of articles with abstracts
   - Download options (PDF)
   - Citation information

2. **Article Filtering**: Enhance LatestIssuesTab with:
   - Filter articles by access type, publication type, year
   - Search within issue articles
   - Sort options (date, citations, title)

3. **Pagination**: Add pagination for journals with many issues:
   - Load issues in batches (e.g., 10 volumes at a time)
   - Implement "Load More" or pagination controls

4. **Cover Images**: Display issue cover images in:
   - Latest Issues tab header
   - All Issues tab accordion items
   - Issue detail page

### Phase 3 (Optional)

1. **Issue Statistics**: Show metrics for each issue:
   - Total downloads
   - Citation count
   - View count

2. **Export Options**: Allow users to:
   - Export issue metadata as BibTeX
   - Generate issue citations
   - Download full issue as PDF

3. **Advanced Filters**: Add filtering by:
   - Special issues only
   - Issue type (regular, special, supplement)
   - Publication status (published, in progress, upcoming)

## Performance Considerations

### Caching Strategy

- **Client-Side**: TanStack Query caches with 5-minute staleTime
- **Server-Side**: Next.js cache tags with 1-hour revalidation
- **API**: Backend implements ordering for optimal performance

### Optimization Opportunities

1. **Pagination**: Implement for journals with 50+ issues
2. **Image Loading**: Use Next.js Image component for cover images
3. **Data Prefetching**: Preload issue data on hover
4. **Virtual Scrolling**: For very long issue lists

## Documentation References

### Internal Docs

- `/docs/PROFILE_PAGE_PATTERN.md` - Server/Client component patterns
- `/docs/STRUCTURE.md` - Project architecture
- `/lib/SERVER_API_README.md` - Server-side API usage

### External Docs

- [Next.js Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [TanStack Query](https://tanstack.com/query/latest/docs/framework/react/overview)
- [React Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)

## Summary

Successfully integrated both Issues tabs with backend API following the codebase's established patterns:

✅ **Architecture**: Proper separation of server-side and client-side API calls  
✅ **Type Safety**: Full TypeScript coverage with backend-matching interfaces  
✅ **Error Handling**: Loading, error, and empty states for all scenarios  
✅ **UX**: Interactive accordions, clickable issues, real-time data  
✅ **Build**: Zero TypeScript errors, successful production build  
✅ **Performance**: Optimized with React Query caching and useMemo  
✅ **Maintainability**: Clean code following project conventions

**Ready for production deployment** ✨
