# Admin User Management - Frontend Implementation

## Overview

The admin user management feature provides a comprehensive interface for administrators to view, edit, and manage all users (authors and institutions) in the Research Index platform.

## Location

`frontend-research-index/features/panel/admin/users/`

## File Structure

```
features/panel/admin/users/
├── components/
│   ├── UsersList.tsx              # Main table component
│   ├── AuthorEditDialog.tsx       # Author edit modal
│   └── InstitutionEditDialog.tsx  # Institution edit modal
├── hooks/
│   ├── queries.ts                 # React Query hooks for data fetching
│   └── mutations.ts               # React Query hooks for mutations
├── types/
│   └── index.ts                   # TypeScript interfaces
└── index.ts                       # Public exports
```

## Components

### UsersList.tsx

Main component displaying all users in a data table.

**Features:**

- **Search**: Real-time search by name or email (debounced for performance)
- **Filter**: Filter by user type (all, author, institution, admin)
- **Table Columns**:
  - Name & Email
  - User Type (badge)
  - Details (designation/institute or institution type/location)
  - Publications Count
  - Account Status (active/inactive)
  - Join Date
  - Actions (edit, delete)
- **Permissions**: Cannot edit or delete admin users
- **Delete Confirmation**: Shows warning dialog before deletion

**Usage:**

```tsx
import { UsersList } from "@/features/panel/admin/users";

function AdminUsersPage() {
  return <UsersList />;
}
```

### AuthorEditDialog.tsx

Modal dialog for editing author profiles.

**Features:**

- Opens in modal dialog
- Loads author data on open
- Form sections:
  - Account Information (email, status toggle)
  - Basic Information (title, name, institute, designation, degree, gender)
  - Research Profile (bio, research interests)
  - External Links (ORCID, Google Scholar, ResearchGate, LinkedIn, website)
- Real-time form validation
- Auto-saves and refreshes data

**Form Fields:**

- Email (editable)
- Account Active Status (toggle)
- Title (dropdown: Dr., Prof., Mr., Ms., Mrs.)
- Full Name
- Institute
- Designation
- Degree
- Gender (dropdown)
- Bio (textarea)
- Research Interests (textarea)
- ORCID
- Google Scholar URL
- ResearchGate URL
- LinkedIn URL
- Personal Website URL

### InstitutionEditDialog.tsx

Modal dialog for editing institution profiles.

**Features:**

- Opens in modal dialog
- Loads institution data on open
- Form sections:
  - Account Information (email, status toggle)
  - Basic Information (name, type, description)
  - Contact & Location (address, city, state, country, postal code, phone, website)
  - Research Information (established year, total researchers, research areas)
- Real-time form validation
- Auto-saves and refreshes data

**Form Fields:**

- Email (editable)
- Account Active Status (toggle)
- Institution Name
- Institution Type (dropdown: university, research_institute, government, etc.)
- Description (textarea)
- Address (textarea)
- City
- State/Province
- Country
- Postal Code
- Phone
- Website
- Established Year
- Total Researchers
- Research Areas (textarea)

## API Integration

### Query Hooks

#### useAdminUsersQuery

Fetches list of all users with optional filtering.

```typescript
const {
  data: users,
  isPending,
  error,
} = useAdminUsersQuery({
  user_type: "author", // optional: "author" | "institution" | "admin"
  search: "john", // optional: search term
});
```

**Returns:** `AdminUser[]`

#### useAdminAuthorDetailQuery

Fetches detailed author information.

```typescript
const { data: author, isPending } = useAdminAuthorDetailQuery(authorId);
```

**Returns:** `AdminAuthorDetail`

#### useAdminInstitutionDetailQuery

Fetches detailed institution information.

```typescript
const { data: institution, isPending } =
  useAdminInstitutionDetailQuery(institutionId);
```

**Returns:** `AdminInstitutionDetail`

### Mutation Hooks

#### useUpdateAuthorMutation

Updates author profile.

```typescript
const updateAuthor = useUpdateAuthorMutation(authorId, {
  onSuccess: () => {
    // Handle success
  },
});

updateAuthor.mutate({
  full_name: "New Name",
  email: "newemail@example.com",
  // ... other fields
});
```

#### useUpdateInstitutionMutation

Updates institution profile.

```typescript
const updateInstitution = useUpdateInstitutionMutation(institutionId, {
  onSuccess: () => {
    // Handle success
  },
});

updateInstitution.mutate({
  institution_name: "New Name",
  email: "newemail@example.com",
  // ... other fields
});
```

#### useDeleteAuthorMutation / useDeleteInstitutionMutation

Deletes user account.

```typescript
const deleteAuthor = useDeleteAuthorMutation(authorId, {
  onSuccess: () => {
    // Handle success
  },
});

deleteAuthor.mutate();
```

## TypeScript Types

### AdminUser

```typescript
interface AdminUser {
  id: number;
  email: string;
  user_type: "author" | "institution" | "admin";
  is_active: boolean;
  is_staff: boolean;
  created_at: string;
  updated_at: string;
  profile_name: string;
  profile_info: AuthorProfileInfo | InstitutionProfileInfo | null;
  publications_count: number;
}
```

### AdminAuthorDetail

```typescript
interface AdminAuthorDetail {
  id: number;
  user_id: number;
  email: string;
  is_active: boolean;
  title: string;
  full_name: string;
  institute: string;
  designation: string;
  degree: string;
  gender: string;
  profile_picture: string;
  cv: string;
  bio: string;
  research_interests: string;
  orcid: string;
  google_scholar: string;
  researchgate: string;
  linkedin: string;
  website: string;
  created_at: string;
  updated_at: string;
  stats: AuthorStats;
  publications_count: number;
}
```

### AdminInstitutionDetail

```typescript
interface AdminInstitutionDetail {
  id: number;
  user_id: number;
  email: string;
  is_active: boolean;
  institution_name: string;
  institution_type: string;
  logo: string;
  description: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  phone: string;
  website: string;
  established_year: number;
  research_areas: string;
  total_researchers: number;
  created_at: string;
  updated_at: string;
  stats: InstitutionStats;
}
```

## Features & Behavior

### Search Functionality

- Debounced search (500ms delay) for performance
- Searches across:
  - Author full names
  - Institution names
  - Email addresses
- Real-time filtering as user types

### Filter by User Type

- All Users (default)
- Authors only
- Institutions only
- Admins only

### Permissions & Security

- Only accessible to admin users
- Admin users cannot be edited or deleted from this interface
- All API calls include authentication headers
- Failed requests show user-friendly error messages

### Data Refreshing

- Automatic cache invalidation on updates or deletions
- Query keys properly structured for granular invalidation:
  - `["admin", "users"]` - User list
  - `["admin", "authors", id]` - Specific author
  - `["admin", "institutions", id]` - Specific institution

### Loading States

- Table shows skeleton loading state
- Edit dialogs show "Loading..." message while fetching data
- Buttons show "Saving..." state during mutations
- Prevents double submissions

### Error Handling

- Network errors display in table error state
- Validation errors shown inline on forms
- Delete failures show in confirmation dialog
- User-friendly error messages

## Styling

- Uses shadcn/ui components for consistent design
- Responsive layout adapts to screen size
- Proper spacing and typography
- Badge colors for status indicators:
  - Active: default (green)
  - Inactive: destructive (red)
  - User types: secondary (grey)

## Best Practices Followed

1. **Component Separation**: Each component has single responsibility
2. **Type Safety**: Full TypeScript coverage with interfaces
3. **Data Fetching**: React Query for server state management
4. **Form Management**: React Hook Form for performant forms
5. **Code Reusability**: Shared components (DataTable, ConfirmationPopup)
6. **Performance**: Debounced search, conditional data loading
7. **Accessibility**: Proper labels, keyboard navigation, ARIA attributes
8. **User Experience**: Loading states, error messages, confirmations

## Integration Steps

### 1. Add Route

In your admin router:

```tsx
import { UsersList } from "@/features/panel/admin/users";

// Add route
{
  path: "/admin/users",
  element: <UsersList />,
}
```

### 2. Add Navigation Link

In admin sidebar:

```tsx
<Link to="/admin/users">
  <Users className="mr-2" />
  User Management
</Link>
```

### 3. Ensure Admin Authentication

Wrap admin routes with authentication:

```tsx
<ProtectedRoute requiredRole="admin">
  <UsersList />
</ProtectedRoute>
```

## Testing Recommendations

### Manual Testing

- [ ] Load user list - verify all users display
- [ ] Search functionality - test with author and institution names
- [ ] Filter by type - verify correct users show
- [ ] Edit author - all fields load and save correctly
- [ ] Edit institution - all fields load and save correctly
- [ ] Toggle account status - verify user can login/cannot login
- [ ] Delete user - verify confirmation and successful deletion
- [ ] Test with non-admin user - verify access denied
- [ ] Test empty states - no users, no search results

### Edge Cases

- [ ] Special characters in names/emails
- [ ] Very long institution names
- [ ] Users with incomplete profiles
- [ ] Network failures during save
- [ ] Concurrent edits by multiple admins

## Future Enhancements

1. **Bulk Operations**: Select multiple users for bulk actions
2. **Export**: Export user list to CSV/Excel
3. **Advanced Filters**: Filter by join date, publication count range
4. **Sorting**: Sort by any column
5. **Pagination**: For large user bases (1000+ users)
6. **Activity Log**: Track admin actions on user accounts
7. **User Impersonation**: Allow admin to view platform as specific user
8. **Email Notifications**: Notify users when profile is modified by admin
