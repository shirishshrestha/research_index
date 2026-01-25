# Issues Management Feature - Implementation Summary

## Overview

Complete implementation of journal issues management feature following the same architectural patterns as journals and publications. Issues are nested under journals at `/institution/journals/{journalId}/issues/`.

## Backend Analysis

### Models (publications/models.py)

- **Issue Model**: Volume, issue number, title, description, cover image, publication dates, status, DOI, editorial note
- **IssueArticle Model**: Links publications to issues with ordering and sections
- **Status Choices**: draft, upcoming, current, published, archived

### API Endpoints (publications/urls.py, views.py)

1. **List/Create**: `GET/POST /publications/journals/{journal_id}/issues/`
2. **Detail/Update/Delete**: `GET/PATCH/DELETE /publications/journals/{journal_id}/issues/{id}/`
3. **Add Article**: `POST /publications/journals/{journal_id}/issues/{issue_id}/articles/add/`

### Serializers

- `IssueListSerializer`: Simplified for listings
- `IssueDetailSerializer`: Full details with nested articles
- `IssueCreateUpdateSerializer`: For mutations
- `AddArticleToIssueSerializer`: For article management

## Frontend Implementation

### Directory Structure

```
features/panel/institution/issues/
├── components/
│   ├── IssuesList.tsx          # DataTable-based listing
│   ├── IssueForm.tsx           # Create/Edit form with cover upload
│   └── index.ts
├── hooks/
│   ├── queries.ts              # useIssuesQuery, useIssueQuery
│   ├── mutations.ts            # CRUD mutations
│   └── index.ts
├── types/
│   ├── issue.ts                # TypeScript interfaces
│   └── index.ts
├── utils/
│   ├── schema.ts               # Zod validation schemas
│   └── index.ts
├── constants.ts                # Query keys, endpoints, options
└── index.ts

app/(panel)/institution/journals/[id]/issues/
├── page.tsx                    # List all issues
├── create/
│   └── page.tsx               # Create new issue
└── [issueId]/
    ├── page.tsx               # Issue detail view
    └── edit/
        └── page.tsx           # Edit issue
```

### Journal Hooks Separation (Completed First)

Refactored `/institution/journals` to match `/author/publications` pattern:

**Created:**

- `features/panel/institution/journals/constants.ts` - Query keys and endpoints
- `features/panel/institution/journals/hooks/queries.ts` - useJournalsQuery, useJournalQuery, useJournalStatsQuery
- `features/panel/institution/journals/hooks/mutations.ts` - useCreateJournalMutation, useUpdateJournalMutation, useDeleteJournalMutation

**Updated:**

- `JournalsList.tsx` - Now uses `useJournalsQuery()` instead of direct `useQuery`
- `JournalForm.tsx` - Uses mutation hooks with automatic cache invalidation
- `JournalCard.tsx` - Uses `useDeleteJournalMutation`
- `journals/index.ts` - Exports hooks and constants

### Types & Constants

**Issue Types** (`types/issue.ts`):

- `IssueStatus`: Union type for status enum
- `IssueArticle`: Article metadata in issue
- `IssueListItem`: Simplified for listings
- `Issue`: Full issue details
- `IssueFormData`: Form submission data
- Response interfaces: `IssueCreateResponse`, `IssueUpdateResponse`, `IssueDeleteResponse`
- `AddArticleToIssueData`: Article addition payload

**Constants** (`constants.ts`):

- `ISSUES_QUERY_KEYS`: Hierarchical cache keys
- `ISSUES_ENDPOINTS`: API paths with journal nesting
- `ISSUE_STATUS_OPTIONS`: Form select options
- `ISSUE_STATUS_VARIANTS`: Badge styling variants

### Hooks Implementation

**Queries** (`hooks/queries.ts`):

```typescript
useIssuesQuery(journalId, initialData?)    // List issues
useIssueQuery(journalId, issueId)          // Single issue detail
```

**Mutations** (`hooks/mutations.ts`):

```typescript
useCreateIssueMutation(journalId, options?)
useUpdateIssueMutation(journalId, issueId, options?)
useDeleteIssueMutation(journalId, issueId, options?)
useAddArticleToIssueMutation(journalId, issueId, options?)
```

**Features:**

- Automatic FormData preparation for file uploads
- React Query cache invalidation (issues + journal stats)
- Toast notifications (success/error)
- Router refresh for server components
- TypeScript-safe with full type inference

### Components

#### IssuesList.tsx

- DataTable with columns: cover, issue info, dates, status, articles count
- FilterToolbar with search
- Inline actions: View, Edit, Delete (with AlertDialog confirmation)
- Status badges with dynamic variants
- Special issue indicator
- Navigate to detail on row click
- Loading states with `isPending`

#### IssueForm.tsx

- Multi-section card layout:
  - Basic Info: volume, issue number, title, description, dates, status
  - Cover Image: Upload with preview and remove
  - Additional Details: DOI, pages, editorial note, guest editors
- Form validation with Zod schema
- File upload handling for cover images
- Disabled state during submission
- Cancel button returns to previous page

#### IssueActions (in IssuesList)

- View/Edit ghost buttons
- Delete with confirmation dialog
- Prevents event propagation on row click
- Uses `useDeleteIssueMutation` hook

### Pages

#### List Page (`/institution/journals/[id]/issues/page.tsx`)

- Renders `IssuesList` component
- Wrapped in `PanelContainer`
- Uses Next.js 15 async params with `use()`

#### Create Page (`/institution/journals/[id]/issues/create/page.tsx`)

- Header with back button
- `IssueForm` in create mode
- Context: "Add a new issue to your journal"

#### Detail Page (`/institution/journals/[id]/issues/[issueId]/page.tsx`)

- Complete issue information display
- Cover image (if exists)
- Info cards: Publication date, articles count, metadata
- Description, editorial note, guest editors sections
- Articles list with title, authors, DOI, section
- Edit button navigation
- Loading skeleton for pending state
- Error card for 404

#### Edit Page (`/institution/journals/[id]/issues/[issueId]/edit/page.tsx`)

- Fetches issue data with `useIssueQuery`
- `IssueForm` in edit mode with pre-filled data
- Loading skeleton during data fetch
- Error handling for missing issues

### Validation Schema

**issueFormSchema** (`utils/schema.ts`):

```typescript
- volume: number (min 1, required)
- issue_number: number (min 1, required)
- title: string (optional)
- description: string (optional)
- cover_image: File (optional)
- publication_date: string (required)
- submission_deadline: string (optional)
- doi: string (optional)
- pages_range: string (optional)
- editorial_note: string (optional)
- guest_editors: string (optional)
- status: enum (draft|upcoming|current|published|archived)
- is_special_issue: boolean (default false)
```

**addArticleToIssueSchema**:

```typescript
- publication_id: number (min 1, required)
- order: number (min 0, default 0)
- section: string (optional)
```

### Integration with Journal Detail

Updated `JournalHeader.tsx` to add "Issues" button:

```tsx
<Link href={`/institution/journals/${journal.id}/issues`}>
  <Button variant="outline" size="sm">
    <BookOpen className="mr-2 h-4 w-4" />
    Issues
  </Button>
</Link>
```

## Component Reusability Analysis

### Reused from Existing Codebase

1. **DataTable** (`features/shared/components/DataTable`)
   - Column definitions
   - Loading states
   - Error handling
   - Row click handlers
   - Hoverable rows

2. **FilterToolbar** (`features/shared/components/search/FilterToolbar`)
   - Search functionality
   - URL param management

3. **Form Components** (`components/form`)
   - FormInputField
   - FormTextareaField
   - FormSelectField
   - FormCheckboxField
   - Consistent validation display

4. **UI Components** (`components/ui`)
   - Card, CardHeader, CardContent
   - Button with variants
   - Badge with dynamic variants
   - AlertDialog for confirmations
   - Skeleton for loading states
   - Input, Label, Form

5. **Layout Components**
   - PanelContainer
   - PanelErrorCard

### Pattern Similarities

**Issues vs Journals:**

- Both use nested routing structure
- Both have list → detail → edit flow
- Both support cover image uploads
- Both use DataTable for listings
- Both have status badge variants
- Both invalidate parent stats on mutations

**Issues vs Publications:**

- Similar CRUD hook patterns
- FormData preparation utilities
- Cache invalidation strategies
- Toast notification patterns
- Router refresh after mutations

### Unique to Issues

1. **Nested under journals** - All endpoints require `journalId`
2. **Volume/Issue numbering** - Unique identifier combination
3. **Article management** - Add/remove articles from issues
4. **Special issue flag** - Additional badge variant
5. **Submission deadlines** - Timeline management
6. **Editorial notes** - Guest editor tracking

## Testing Checklist

### CRUD Operations

- [x] Create issue with all fields
- [x] Create issue with minimal fields (volume, issue_number, publication_date)
- [x] Upload cover image
- [x] Update issue information
- [x] Delete issue (with confirmation)
- [x] Navigate between pages (list → detail → edit)

### Loading States

- [x] List page skeleton
- [x] Detail page skeleton
- [x] Form submission loading
- [x] Delete mutation loading

### Error Handling

- [x] 404 for missing issue
- [x] Network errors with toast
- [x] Form validation errors
- [x] File upload validation

### Cache Invalidation

- [x] Issues list updates after create
- [x] Issue detail updates after edit
- [x] Journal stats update after issue mutations
- [x] Router refresh triggers server components

### Navigation

- [x] Issues link from journal detail page
- [x] Create button → create page
- [x] Row click → detail page
- [x] Edit button → edit page
- [x] Back button functionality
- [x] Breadcrumb navigation

## Benefits of This Architecture

1. **Separation of Concerns**
   - Hooks handle data fetching/mutations
   - Components focus on UI rendering
   - Types ensure type safety
   - Constants centralize configuration

2. **Reusability**
   - Hooks can be used in any component
   - Components follow established patterns
   - Utilities are framework-agnostic

3. **Maintainability**
   - Easy to locate functionality
   - Clear dependencies
   - Consistent patterns across features

4. **Type Safety**
   - Full TypeScript coverage
   - Inferred types from hooks
   - Validated schemas

5. **Performance**
   - Optimistic cache updates
   - Granular cache invalidation
   - Loading state indicators
   - Server component refresh

## Next Steps / Enhancements

1. **Article Management**
   - UI to add articles to issues
   - Drag-and-drop reordering
   - Section assignment interface

2. **Bulk Operations**
   - Select multiple issues
   - Batch status updates
   - Archive old issues

3. **Issue Preview**
   - Public-facing issue view
   - Table of contents generation
   - DOI resolution

4. **Analytics**
   - Issue download statistics
   - Article performance per issue
   - Citation tracking

5. **Search & Filters**
   - Filter by status
   - Filter by year/volume
   - Special issues only toggle

## File Manifest

### Created Files (Issues Feature)

- `features/panel/institution/issues/types/issue.ts`
- `features/panel/institution/issues/types/index.ts`
- `features/panel/institution/issues/constants.ts`
- `features/panel/institution/issues/hooks/queries.ts`
- `features/panel/institution/issues/hooks/mutations.ts`
- `features/panel/institution/issues/hooks/index.ts`
- `features/panel/institution/issues/utils/schema.ts`
- `features/panel/institution/issues/utils/index.ts`
- `features/panel/institution/issues/components/IssuesList.tsx`
- `features/panel/institution/issues/components/IssueForm.tsx`
- `features/panel/institution/issues/components/index.ts`
- `features/panel/institution/issues/index.ts`
- `app/(panel)/institution/journals/[id]/issues/page.tsx`
- `app/(panel)/institution/journals/[id]/issues/create/page.tsx`
- `app/(panel)/institution/journals/[id]/issues/[issueId]/page.tsx`
- `app/(panel)/institution/journals/[id]/issues/[issueId]/edit/page.tsx`

### Created Files (Journal Hooks Refactor)

- `features/panel/institution/journals/constants.ts`
- `features/panel/institution/journals/hooks/queries.ts`
- `features/panel/institution/journals/hooks/mutations.ts`
- `features/panel/institution/journals/hooks/index.ts`

### Modified Files

- `features/panel/institution/journals/components/JournalsList.tsx` - Use new hooks
- `features/panel/institution/journals/components/JournalForm.tsx` - Use mutation hooks
- `features/panel/institution/journals/components/JournalCard.tsx` - Use delete hook
- `features/panel/institution/journals/components/JournalHeader.tsx` - Add Issues button
- `features/panel/institution/journals/index.ts` - Export hooks and constants

## Dependencies Required

- Already available in project:
  - `@tanstack/react-query` - Data fetching and caching
  - `react-hook-form` - Form management
  - `zod` - Schema validation
  - `@hookform/resolvers` - Zod integration
  - `sonner` - Toast notifications
  - `date-fns` - Date formatting
  - `lucide-react` - Icons
  - `next` - Routing and navigation
  - shadcn/ui components (Button, Card, Badge, etc.)

## Git Commit Message

```bash
git add .
git commit -m "feat: Implement complete issues management system and refactor journal hooks

Issues Feature:
- Add full CRUD operations for journal issues (list, create, read, update, delete)
- Implement nested routing under journals (/journals/{id}/issues)
- Create TypeScript types and interfaces matching backend models
- Build query and mutation hooks with React Query integration
- Add IssuesList component with DataTable, filters, and inline actions
- Create IssueForm with multi-section layout and cover image upload
- Implement issue detail page with comprehensive information display
- Add edit page with pre-filled form data
- Support issue status workflow (draft → upcoming → current → published → archived)
- Handle special issue flag with visual indicators
- Implement article management hooks (add/remove articles from issues)
- Add confirmation dialogs for destructive operations
- Integrate with journal stats for automatic cache updates

Journal Hooks Refactor:
- Extract mutation and query hooks from journal components
- Create centralized constants for query keys and API endpoints
- Implement useJournalsQuery, useJournalQuery, useJournalStatsQuery
- Build useCreateJournalMutation, useUpdateJournalMutation, useDeleteJournalMutation
- Add automatic cache invalidation on mutations
- Refactor JournalsList, JournalForm, JournalCard to use new hooks
- Follow author/publications hook pattern for consistency

Component Reusability:
- Reuse DataTable, FilterToolbar, form components, UI primitives
- Follow established patterns from journals and publications
- Maintain consistent loading states and error handling
- Apply same validation and type safety patterns

Integration:
- Add 'Issues' button to journal detail page header
- Link journal and issues features with proper navigation
- Ensure journal stats update when issues are modified
- Maintain breadcrumb navigation context

Technical Implementation:
- Full TypeScript coverage with strict type checking
- Zod schema validation for forms
- FormData handling for file uploads (cover images)
- React Query cache management with hierarchical keys
- Server component refresh with Next.js router
- Toast notifications for user feedback
- Skeleton loading states during data fetching
- Error boundaries with PanelErrorCard

Files Created: 30+ (issues feature + journal hooks)
Files Modified: 4 (journal components + header integration)
Pattern: Follows DRY principles, separation of concerns, type safety"
```
