# Frontend Update Summary

## Overview

The frontend has been completely updated to match the refactored backend API. The claiming system now correctly reflects that:

- **Authors** can claim their imported profiles
- **Institutions** are created by claiming journals (not separately)
- **No institution account claiming** exists anymore

---

## Files Modified

### 1. API Layer Updates

#### **claimAccount.ts** (Modified)

**Location:** `frontend/features/auth/api/claimAccount.ts`

**Changes:**

- ✅ Removed `ImportedInstitution` interface
- ✅ Removed `SearchImportedProfilesResponse` interface
- ✅ Created `SearchImportedAuthorsResponse` (authors only)
- ✅ Removed `ClaimInstitutionRequest` interface
- ✅ Updated `searchImportedProfiles()` → `searchImportedAuthors()`
  - Removed `user_type` parameter
  - Changed endpoint: `/auth/claim/search/` → `/auth/claim/authors/search/`
- ✅ Removed `claimInstitutionAccount()` function

#### **claimJournals.ts** (NEW)

**Location:** `frontend/features/auth/api/claimJournals.ts`

**Purpose:** Handle journal claiming and institution creation

**Interfaces:**

```typescript
-ClaimableJournal -
  SearchClaimableJournalsResponse -
  ClaimJournalsWithInstitutionRequest -
  ClaimJournalRequest -
  ClaimJournalsResponse -
  MyJournalsResponse;
```

**Functions:**

```typescript
-searchClaimableJournals(searchQuery) -
  claimJournalsWithInstitution(data) - // Creates institution + claims journals
  claimAdditionalJournal(data) - // For existing institutions
  getMyJournals(); // Get owned journals
```

---

### 2. Component Updates

#### **ClaimAccountForm.tsx** (Simplified)

**Location:** `frontend/features/auth/components/ClaimAccountForm.tsx`

**Changes:**

- ✅ Removed tabs interface (Author/Institution)
- ✅ Removed institution claim form and schema
- ✅ Removed `userType` state management
- ✅ Simplified to single author claiming form
- ✅ Updated imports to remove institution-related types
- ✅ Updated card title: "Claim Your Imported Author Profile"
- ✅ Updated description to mention author-specific sources

**Before:** 472 lines with tabs and dual forms
**After:** ~230 lines with single streamlined form

#### **ClaimAccountSearch.tsx** (Simplified)

**Location:** `frontend/features/auth/components/ClaimAccountSearch.tsx`

**Changes:**

- ✅ Removed `userType` prop from interface
- ✅ Changed prop type from `ImportedAuthor | ImportedInstitution` → `ImportedAuthor`
- ✅ Updated `searchImportedProfiles()` → `searchImportedAuthors()`
- ✅ Removed conditional rendering for author/institution
- ✅ Removed institution-specific icons and badges
- ✅ Simplified search instructions (author-only)

**Before:** Supported both authors and institutions
**After:** Author-only search with cleaner UI

#### **ClaimJournalsSearch.tsx** (NEW)

**Location:** `frontend/features/auth/components/ClaimJournalsSearch.tsx`

**Purpose:** Search and select multiple journals for claiming

**Features:**

- ✅ Multi-select journal interface with checkboxes
- ✅ Search by journal name, ISSN, or publisher
- ✅ Display journal details (title, ISSN, E-ISSN, publisher)
- ✅ Show current owner (system placeholder)
- ✅ Selected journal count display
- ✅ Responsive card layout with icons

**Key Props:**

```typescript
- selectedJournals: number[]
- onSelectJournals: (journalIds: number[]) => void
```

#### **ClaimJournalsForm.tsx** (NEW)

**Location:** `frontend/features/auth/components/ClaimJournalsForm.tsx`

**Purpose:** Complete institution creation and journal claiming flow

**Features:**

- ✅ Two-step process:
  1. Search and select journals
  2. Create institution account
- ✅ Comprehensive institution details form:
  - Account credentials (email, password)
  - Institution details (name, type, country, website, description)
  - Contact information (address, city, state, postal code, phone)
- ✅ Form validation with Zod schema
- ✅ Multi-journal claiming support
- ✅ Auto-login after successful creation
- ✅ Detailed error handling
- ✅ Success redirect to institution dashboard

**Form Fields:**

- **Required:** email, password, confirm_password, institution_name
- **Optional:** institution_type, country, website, description, address, city, state, postal_code, phone

---

### 3. Page Updates

#### **claim-account/page.tsx** (Updated)

**Location:** `frontend/app/(auth)/claim-account/page.tsx`

**Changes:**

- ✅ Updated metadata title: "Claim Your Author Account"
- ✅ Updated page heading: "Claim Your Author Profile"
- ✅ Updated description to be author-specific
- ✅ Added prominent link to journal claiming page
- ✅ Reordered links for better UX flow

**Link Structure:**

1. Institution looking to claim journals → Claim Journals
2. Don't have imported profile → Sign up
3. Trouble finding profile → Diagnostics

#### **claim-journals/page.tsx** (NEW)

**Location:** `frontend/app/(auth)/claim-journals/page.tsx`

**Purpose:** Dedicated page for journal claiming and institution creation

**Features:**

- ✅ Professional landing page with clear instructions
- ✅ Gradient background matching site theme
- ✅ Centered layout with max-width constraint
- ✅ Clear call-to-action messaging
- ✅ Links to:
  - Login (for existing accounts)
  - Author claim page (for authors)

**Metadata:**

```typescript
title: "Claim Journals | Research Index";
description: "Claim your institution's imported journals and create an account";
```

#### **login/page.tsx** (Updated)

**Location:** `frontend/app/(auth)/login/page.tsx`

**Changes:**

- ✅ Updated claim section to show two separate links:
  - "Claim Your Author Profile" → `/claim-account`
  - "Claim Your Institution's Journals" → `/claim-journals`
- ✅ Improved clarity with specific wording

---

## API Endpoint Mapping

### Before Refactoring:

```
GET  /api/auth/claim/search/?user_type=author&search_query=...
POST /api/auth/claim/author/
POST /api/auth/claim/institution/  ← REMOVED
```

### After Refactoring:

```
GET  /api/auth/claim/authors/search/?search_query=...
POST /api/auth/claim/author/
GET  /api/auth/journals/claim/search/?search_query=...
POST /api/auth/journals/claim/create-institution/  ← NEW
POST /api/auth/journals/claim/add/
GET  /api/auth/journals/my-journals/
```

---

## User Workflows

### Author Claiming Workflow

1. Visit `/claim-account`
2. Search for author profile (name, ORCID, institution)
3. Select matching profile
4. Enter new email and password
5. Add optional profile details (bio, research interests, social links)
6. Submit → Auto-login → Redirect to author dashboard

### Institution Creation Workflow

1. Visit `/claim-journals`
2. Search for journals (name, ISSN, publisher)
3. Select one or more journals (multi-select)
4. Enter account credentials (email, password)
5. Enter institution details (name, type, country, etc.)
6. Add optional contact information
7. Submit → Create institution + Transfer journals → Auto-login → Redirect to institution dashboard

---

## Code Metrics

### Lines Removed:

- **claimAccount.ts:** ~50 lines (institution interfaces and function)
- **ClaimAccountForm.tsx:** ~240 lines (institution form and tabs)
- **ClaimAccountSearch.tsx:** ~80 lines (institution logic)
- **Total:** ~370 lines removed

### Lines Added:

- **claimJournals.ts:** ~140 lines (NEW)
- **ClaimJournalsForm.tsx:** ~375 lines (NEW)
- **ClaimJournalsSearch.tsx:** ~230 lines (NEW)
- **claim-journals/page.tsx:** ~45 lines (NEW)
- **Updates to existing files:** ~30 lines
- **Total:** ~820 lines added

### Net Change:

- **+450 lines** (cleaner, more focused code)
- **3 new API functions**
- **2 new components**
- **1 new page**

---

## Testing Checklist

### ✅ Build Status

- Frontend builds successfully with no TypeScript errors
- All pages compile correctly
- No missing dependencies

### 🔍 Manual Testing Required

#### Author Claiming (`/claim-account`)

- [ ] Search for imported authors works
- [ ] Can select author profile
- [ ] Form validation works (email, password requirements)
- [ ] Successful claim redirects to author dashboard
- [ ] Error messages display correctly
- [ ] Link to journal claiming works

#### Journal Claiming (`/claim-journals`)

- [ ] Search for claimable journals works
- [ ] Can select multiple journals
- [ ] Selected journal count updates
- [ ] Form validation works (all fields)
- [ ] Institution creation succeeds
- [ ] Journals are transferred to institution
- [ ] Auto-login works after creation
- [ ] Redirects to institution dashboard
- [ ] Error handling displays field-specific errors
- [ ] Link to author claiming works

#### Login Page (`/login`)

- [ ] Both claiming links are visible
- [ ] Links navigate to correct pages
- [ ] Clear distinction between author and institution claiming

---

## Breaking Changes

### API Changes

⚠️ **Frontend now expects:**

- `GET /api/auth/claim/authors/search/` (no `user_type` param)
- `POST /api/auth/journals/claim/create-institution/` (new endpoint)

### Component API Changes

⚠️ **ClaimAccountSearch prop changes:**

```typescript
// Before
<ClaimAccountSearch
  userType="author"
  onSelectProfile={(profile) => ...}
/>

// After
<ClaimAccountSearch
  onSelectProfile={(profile) => ...}
/>
```

---

## Migration Notes

### For Developers

1. ✅ All TypeScript types updated
2. ✅ API endpoints match backend refactoring
3. ✅ Form schemas use Zod validation
4. ✅ Consistent error handling
5. ✅ Auto-login implemented for both workflows

### For Content/Marketing

1. Update any documentation referring to "institution account claiming"
2. Update help text to mention "claim journals to create institution"
3. Update screenshots in documentation
4. Update user guides to reflect two-step journal claiming

---

## Frontend Structure Overview

```
frontend/
├── features/auth/
│   ├── api/
│   │   ├── claimAccount.ts (UPDATED - author only)
│   │   └── claimJournals.ts (NEW - journal claiming)
│   └── components/
│       ├── ClaimAccountForm.tsx (SIMPLIFIED - author only)
│       ├── ClaimAccountSearch.tsx (UPDATED - author only)
│       ├── ClaimJournalsForm.tsx (NEW)
│       └── ClaimJournalsSearch.tsx (NEW)
└── app/(auth)/
    ├── claim-account/
    │   └── page.tsx (UPDATED - author focus)
    ├── claim-journals/
    │   └── page.tsx (NEW)
    └── login/
        └── page.tsx (UPDATED - both links)
```

---

## Summary

✅ **All frontend changes complete**
✅ **TypeScript compilation successful**
✅ **Build passes with no errors**
✅ **API endpoints aligned with backend**
✅ **User flows simplified and clarified**
✅ **Ready for testing**

The frontend now accurately reflects the backend refactoring where:

- Authors claim their imported profiles separately
- Institutions are created by claiming journals (not separately)
- Multi-journal claiming is supported in a single request
- Clear separation of concerns between author and institution workflows
