# Publications Implementation Summary

## Overview

Implemented proper server components and server actions for both author publications management and public articles viewing, following the same pattern used for topics.

## Backend Analysis

### Author Publications Endpoints (Authenticated)

- `POST /api/publications/` - Create publication
- `GET /api/publications/` - List author's publications
- `GET /api/publications/{id}/` - Get publication detail
- `PATCH /api/publications/{id}/` - Update publication
- `DELETE /api/publications/{id}/` - Delete publication

### Public Publications Endpoints

- `GET /api/publications/topics/{topic_pk}/branches/{branch_pk}/publications/` - List publications by topic branch (AllowAny)
- **NOTE**: No general public publications list endpoint exists yet. Backend may need to add this.

## Frontend Implementation

### 1. Server-Side API Helpers

#### Author Publications (`features/panel/author/publications/api/publications.server.ts`)

```typescript
- getAuthorPublications() - Fetch all author publications with cache tag "author-publications"
- getAuthorPublication(id) - Fetch single publication with cache tags ["author-publications", "publication-{id}"]
```

#### Public Articles (`features/general/articles/api/articles.server.ts`)

```typescript
- getPublicationsByBranch(topicId, branchId) - Fetch publications by branch (public endpoint)
- getPublicArticle(id) - Fetch single article with cache tag "public-articles"
```

### 2. Server Actions (`features/panel/author/publications/server-actions/actions.ts`)

```typescript
- revalidateAuthorPublications() - Revalidate author publications cache
- revalidatePublication(id) - Revalidate specific publication
- revalidatePublicArticles() - Revalidate public articles cache
- revalidateAllPublications() - Revalidate all publication-related caches
```

Using Next.js 16 revalidateTag with "max" profile for stale-while-revalidate semantics.

### 3. Updated Mutations (`features/panel/author/publications/hooks/mutations.ts`)

All mutations now follow this pattern:

1. Perform axios mutation
2. Invalidate client-side TanStack Query cache
3. Call server action to revalidate server cache
4. Call router.refresh() to re-render Server Components

**Updated hooks:**

- `useCreatePublicationMutation` - Creates publication, revalidates all caches
- `useUpdatePublicationMutation` - Updates publication, revalidates specific and all caches
- `useDeletePublicationMutation` - Deletes publication, revalidates all caches

### 4. Server Component Pages

#### Author Publications Page (`app/(panel)/author/publications/page.tsx`)

- Converted to async Server Component
- Fetches publications via `getAuthorPublications()`
- Passes `initialPublications` to client component
- Wrapped in Suspense with FullScreenLoader

#### PublicationsList Component

- Updated to accept `initialPublications` prop
- `usePublicationsQuery` now accepts `initialData` parameter
- Uses server-provided data as initial state, only fetches client-side for updates

#### Public Articles Detail Page (`app/(general)/articles/[id]/page.tsx`)

- Converted to async Server Component
- Fetches article via `getPublicArticle(id)`
- Updated `generateMetadata` to use article title and abstract
- Passes article data to ArticleDetails component
- Wrapped in Suspense with FullScreenLoader

#### ArticleDetails Component

- Updated to accept `article: Publication` prop
- Removed mock data
- Now displays real publication data from backend

#### OverviewTab Component

- Updated to use Publication type from backend
- Displays real mesh_terms, link_outs, erratum_from data
- Conditional rendering for optional fields

## Key Benefits

1. **Server-Side Rendering**: Initial data fetched on server, improving performance and SEO
2. **Automatic Revalidation**: Server cache automatically invalidates when author makes changes
3. **Instant UI Updates**: router.refresh() ensures Server Components re-render with fresh data
4. **Stale-While-Revalidate**: Using "max" profile provides optimal UX (shows stale data while fetching fresh)
5. **Consistent Pattern**: Same implementation pattern as topics (maintainability)

## Cache Tags Used

### Author Publications

- `author-publications` - All author publications list
- `publication-{id}` - Specific publication

### Public Articles

- `public-articles` - All public articles
- `topic-{id}` - Articles by topic
- `branch-{id}` - Articles by branch
- `article-{id}` - Specific article

## Missing Backend Features

### Public Publications List Endpoint

The backend currently only has topic-branch filtered public publications. Consider adding:

```python
# In publications/views.py
class PublicPublicationsListView(generics.ListAPIView):
    """
    List all published publications (public endpoint with filters).
    """
    permission_classes = [AllowAny]
    serializer_class = PublicationListSerializer

    def get_queryset(self):
        queryset = Publication.objects.filter(is_published=True).select_related(
            'author', 'stats', 'topic_branch'
        ).prefetch_related('mesh_terms')

        # Add filters: search, publication_type, year, etc.
        search = self.request.query_params.get('search')
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) |
                Q(abstract__icontains=search) |
                Q(co_authors__icontains=search)
            )

        return queryset
```

Once this endpoint exists, update `features/general/articles/api/articles.server.ts` to add:

```typescript
export async function getPublicArticles(params?: {
  search?: string;
  publication_type?: string;
  year?: string;
}): Promise<Publication[]> {
  const searchParams = new URLSearchParams(params);
  const response = await serverFetch<Publication[]>(
    `/publications/public/?${searchParams}`,
    {
      requireAuth: false,
      next: {
        tags: ["public-articles"],
      },
    },
  );
  return response;
}
```

## Testing Checklist

- [x] Author can create publications
- [x] Author can update publications
- [x] Author can delete publications
- [x] Author publications page server-renders
- [x] Server cache revalidates after mutations
- [x] router.refresh() updates Server Components
- [x] Public article detail page server-renders
- [x] ArticleDetails displays real publication data
- [ ] ArticlesList needs backend public endpoint (currently using mock data)
- [ ] Test PDF upload and download
- [ ] Test MeSH terms display
- [ ] Test link outs display
- [ ] Test citations and references tabs

## Next Steps

1. **Backend**: Add public publications list endpoint with filters
2. **Frontend**: Update ArticlesListView to use real API once available
3. **Testing**: Add E2E tests for publication CRUD flows
4. **Features**: Implement citations and references tabs with real data
5. **Features**: Implement stats tab with real publication statistics
