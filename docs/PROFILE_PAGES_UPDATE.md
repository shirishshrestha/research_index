# Profile Pages Update - December 31, 2025

## Overview
Major update implementing comprehensive author and institution profile pages with shared reusable components, tabbed navigation, and research publication listings.

## New Features

### 1. Profile Component Library (`features/shared/components/profile/`)
Created a complete set of reusable profile components:

- **ProfileCard.tsx** - Profile header with avatar, follow button, verified badge
- **ProfileStats.tsx** - Metrics display for H-index, i10-index, and citations
- **ProfileTabs.tsx** - Tabbed navigation with search param sync and active state styling
- **ProfileSideList.tsx** - Container for co-writers/members lists
- **ProfileSideItem.tsx** - Individual list item with avatar and verified badge
- **types.ts** - TypeScript interfaces for profile components

### 2. Author Profile Pages
**New Files:**
- `features/general/authors/components/AuthorDetails.tsx` - Main author profile component
- `features/general/authors/components/TabDetails/AuthorProfileTab.tsx` - Profile tab content (About, Disciplines, Co-Writers)
- `features/general/authors/components/TabDetails/ResearchTab.tsx` - Research tab with category filtering
- `features/general/authors/types.ts` - Author-specific TypeScript types
- `app/(general)/authors/[id]/page.tsx` - Dynamic author detail route

**Features:**
- 5 tabs: Profile, Research, Reviews, Stats, Following
- H-index, i10-index, and citations metrics
- Co-writers list with verified badges
- Research publications with category filtering (Article, Book, Chapter, Conference Paper, Data, Preprint)
- Breadcrumb navigation
- More options dropdown

### 3. Institution Profile Pages
**New Files:**
- `features/general/institutions/components/InstitutionDetails.tsx` - Main institution profile component
- `features/general/institutions/components/TabDetails/InstitutionProfileTab.tsx` - Profile tab content
- `features/general/institutions/components/TabDetails/ResearchTab.tsx` - Research tab with category filtering
- `features/general/institutions/types.ts` - Institution-specific TypeScript types
- `app/(general)/institutions/[id]/page.tsx` - Dynamic institution detail route

**Features:**
- 4 tabs: Profile, Research, Stats, Members
- Institution metrics and statistics
- Members list with verified badges
- Research publications with category filtering
- Breadcrumb navigation
- More options dropdown

### 4. Topics Pages
**New Files:**
- `app/(general)/topics/page.tsx` - Topics listing page
- `components/shared/TopicCard.tsx` - Reusable topic card component
- `features/general/topics/components/TopicsListView.tsx` - Topics grid layout

**Features:**
- Grid layout for topics
- Tooltip for long labels (>45 characters)
- Gradient-blue background design
- Topic count display

### 5. Shared UI Components
**New shadcn/ui components:**
- `components/ui/tabs.tsx` - Radix UI tabs integration
- `components/ui/tooltip.tsx` - Tooltip component

### 6. Refactored Shared Components
**Reorganized components into feature-specific directories:**
- `features/shared/components/lists/` - FilterToolbar, ListCard, Pagination (refactored from root)
- `features/shared/components/search/` - Search-related components
- `features/shared/components/profile/` - Profile-related components (new)

## Technical Improvements

### Search Params Integration
- Profile tabs use URL search params for state persistence
- Research category filters persist in URL (`?category=article`)
- Smart param cleanup: `category` param auto-removed when switching away from Research tab
- All navigation preserves current pathname

### Styling Enhancements
- Active tab indicator using `::before` pseudo-element with Radix `data-[state=active]` attribute
- Active category styling: `border: 1px solid #F2F2F2; background: #F1F4FC`
- Consistent padding (10px) across category buttons
- Hover states and transitions

### Component Architecture
- Client components marked with `"use client"` for interactive features
- Server components for pages and static content
- TypeScript interfaces for type safety
- Mock data structure for development

## Modified Files

### Pages
- `app/(general)/authors/[id]/page.tsx` - Updated with breadcrumb and new AuthorDetails component
- `app/(general)/institutions/[id]/page.tsx` - Updated with breadcrumb and new InstitutionDetails component

### Components
- `components/layout/Header.tsx` - Minor updates
- `components/shared/Breadcrumb.tsx` - Enhanced for dynamic breadcrumb chains
- `components/shared/index.ts` - Added TopicCard export
- `features/general/home/components/LatestJournalsSection.tsx` - Updates to journal display

### Configuration
- `app/globals.css` - Added custom styling for profile components
- `package.json` - Added new dependencies
- `pnpm-lock.yaml` - Updated lock file

### Index Files
- `features/general/authors/components/index.ts` - Export AuthorDetails
- `features/general/institutions/components/index.ts` - Export InstitutionDetails
- `features/general/institutions/index.ts` - Export types
- `features/shared/components/index.ts` - Updated exports for reorganized structure

## Deleted Files
Moved to organized subdirectories:
- `features/shared/components/FilterToolbar.tsx` → `features/shared/components/lists/FilterToolbar.tsx`
- `features/shared/components/ListCard.tsx` → `features/shared/components/lists/ListCard.tsx`
- `features/shared/components/Pagination.tsx` → `features/shared/components/lists/Pagination.tsx`

## File Statistics
- **17 modified files**
- **123 insertions**, 940 deletions (net reduction due to code organization)
- **Multiple new directories** for better code organization
- **Untracked files**: 20+ new files pending commit

## Key Patterns Established

### 1. Profile Page Structure
```
section-padding pt-0!
├── 2-column grid (ProfileCard + ProfileStats)
└── ProfileTabs
    ├── Profile Tab (ProfileTab component)
    ├── Research Tab (ResearchTab with category sidebar)
    └── Other tabs (Stats, Reviews/Members, Following)
```

### 2. Research Tab Layout
```
grid grid-cols-1 lg:grid-cols-[200px_1fr]
├── Left Sidebar (Category filters)
└── Right Content (ArticleCard list)
```

### 3. Mock Data Structure
- Name, position, affiliation, verified email
- Metrics: hIndex, iIndex, citations
- About text and disciplines array
- Related items (co-writers/members)

## Next Steps
1. Implement real API integration for profile data
2. Add pagination to research listings
3. Implement Stats tab visualizations
4. Add search/filter functionality to research listings
5. Implement Following functionality
6. Add loading states and error handling
7. Connect Members/Following pages

## Notes
- All components follow established design system
- Search params preserved across navigation
- Components are reusable across author and institution profiles
- Mock data included for development and testing
