# Route Groups & Breadcrumb Update - December 26, 2025

## ✅ Changes Completed

### 1. Route Groups Structure

Implemented Next.js route groups to organize routes by purpose:

#### **(general) Route Group**

All public-facing pages moved to `app/(general)/`:

- `/` - Home page
- `/search` - Search page
- `/search/advanced` - Advanced search
- `/articles` - Articles listing
- `/articles/[id]` - Article details
- `/journals` - Journals listing
- `/journals/[id]` - Journal details
- `/authors` - Authors listing
- `/authors/[id]` - Author profile
- `/institutions` - Institutions listing
- `/institutions/[id]` - Institution profile
- `/about` - About page
- `/contact` - Contact form

#### **(auth) Route Group**

Authentication pages moved to `app/(auth)/`:

- `/login` - Login page
- `/signup/author` - Author registration
- `/signup/institution` - Institution registration

### 2. Feature Folders Reorganization

Moved feature modules to match route groups:

```
features/
├── general/              # General features
│   ├── home/
│   ├── about/
│   ├── search/
│   ├── articles/
│   ├── journals/
│   ├── authors/
│   └── institutions/
└── auth/                 # Auth features
    ├── login/
    └── signup/
```

### 3. Enhanced Breadcrumb Component

Created a powerful, reusable breadcrumb system:

**Features:**

- Two variants: `default` and `hero`
- Chainable breadcrumb items
- Reusable common breadcrumbs
- Flexible and type-safe

**Usage Examples:**

```tsx
import { Breadcrumb, commonBreadcrumbs, buildBreadcrumbs } from '@/components/shared/Breadcrumb';

// Example 1: Research Index > Search
<Breadcrumb
  variant="default"
  items={[
    commonBreadcrumbs.home,
    commonBreadcrumbs.search
  ]}
/>

// Example 2: Research Index > Search > Advanced Search
<Breadcrumb
  variant="hero"
  items={[
    commonBreadcrumbs.home,
    commonBreadcrumbs.search,
    commonBreadcrumbs.advancedSearch
  ]}
/>

// Example 3: Research Index > Libraries > Topics > Topic Branch > Technology
<Breadcrumb
  variant="default"
  items={[
    commonBreadcrumbs.home,
    commonBreadcrumbs.libraries,
    commonBreadcrumbs.topics,
    { label: 'Topic Branch', href: '/search/branch' },
    { label: 'Technology' }
  ]}
/>

// Example 4: Using buildBreadcrumbs helper
<Breadcrumb
  items={buildBreadcrumbs(
    commonBreadcrumbs.home,
    commonBreadcrumbs.articles,
    { label: 'Article Title' }
  )}
/>
```

**Common Breadcrumbs Available:**

- `home` - Research Index
- `search` - Search
- `advancedSearch` - Advanced Search
- `libraries` - Libraries
- `topics` - Topics
- `articles` - Articles
- `journals` - Journals
- `authors` - Authors
- `institutions` - Institutions
- `about` - About
- `contact` - Contact

**Variants:**

- `default` - Simple breadcrumb with blue links
- `hero` - Breadcrumb with gradient background (matching hero sections)

### 4. Footer Redesign

Completely redesigned footer to match the provided image:

**Features:**

- Blue gradient background (gradient-blue: #023B8B → #012558)
- Three-column link section:
  - Contributors (Authors, Institutions)
  - Libraries (Articles, Journals, Topics)
  - About (About Platform, Contact)
- Research Index logo with dots pattern
- Copyright notice: "© Nepal Research Index 2025 — All Rights Reserved"
- Legal links: Privacy | Terms & Conditions | Code of Conduct | Media
- Creative Commons licenses:
  - CC BY-SA 4.0 for content
  - CC0 for metadata
- White text on blue background
- Merriweather font for headings
- Responsive grid layout

## 📂 New Project Structure

```
app/
├── (general)/                    # Public route group
│   ├── page.tsx                 # Home (/)
│   ├── search/
│   │   ├── page.tsx             # /search
│   │   └── advanced/page.tsx    # /search/advanced
│   ├── articles/
│   │   ├── page.tsx             # /articles
│   │   └── [id]/page.tsx        # /articles/[id]
│   ├── journals/
│   │   ├── page.tsx             # /journals
│   │   └── [id]/page.tsx        # /journals/[id]
│   ├── authors/
│   │   ├── page.tsx             # /authors
│   │   └── [id]/page.tsx        # /authors/[id]
│   ├── institutions/
│   │   ├── page.tsx             # /institutions
│   │   └── [id]/page.tsx        # /institutions/[id]
│   ├── about/page.tsx           # /about
│   └── contact/page.tsx         # /contact
│
├── (auth)/                       # Auth route group
│   ├── login/page.tsx           # /login
│   └── signup/
│       ├── author/page.tsx      # /signup/author
│       └── institution/page.tsx # /signup/institution
│
├── page.tsx                      # Root redirect to (general)
└── layout.tsx                    # Root layout

features/
├── general/                      # General features
│   ├── home/
│   │   ├── components/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── FeaturesSection.tsx
│   │   │   └── index.ts
│   │   └── index.tsx
│   ├── about/
│   │   └── index.tsx
│   └── [other features]/
│
└── auth/                         # Auth features
    ├── login/
    └── signup/

components/
├── layout/
│   ├── Header.tsx               # Updated navigation
│   ├── Footer.tsx               # New footer design
│   ├── MainLayout.tsx
│   └── index.ts
└── shared/
    ├── Breadcrumb.tsx           # Enhanced breadcrumb
    ├── Button.tsx
    ├── Container.tsx
    └── index.ts
```

## 🎨 Visual Components

### Footer Structure

```
┌──────────────────────────────────────────────────────┐
│  Contributors  │  Libraries  │  About                │
│  › Authors     │  › Articles │  › About Platform     │
│  › Institutions│  › Journals │  › Contact            │
│                │  › Topics   │                       │
├──────────────────────────────────────────────────────┤
│  [Logo] RESEARCH INDEX                               │
│  © Nepal Research Index 2025 — All Rights Reserved   │
│  Privacy | Terms | Code of Conduct | Media           │
│                                                       │
│  [CC BY SA] Content licensed under CC BY-SA 4.0      │
│  [CC 0] Metadata under CC0 Public Domain             │
└──────────────────────────────────────────────────────┘
```

### Breadcrumb Examples

**Hero Variant (with gradient background):**

```
┌────────────────────────────────────────────────┐
│ Research Index > Search > Advanced Search      │
└────────────────────────────────────────────────┘
```

**Default Variant (simple):**

```
Research Index > Libraries > Topics > Technology
```

## 🚀 How to Use

### Adding Breadcrumbs to Pages

1. **Import the component:**

```tsx
import { Breadcrumb, commonBreadcrumbs } from "@/components/shared/Breadcrumb";
```

2. **Use in your page:**

```tsx
<Breadcrumb
  variant="hero"
  items={[
    commonBreadcrumbs.home,
    commonBreadcrumbs.search,
    { label: "Current Page" },
  ]}
/>
```

### Creating Custom Breadcrumb Chains

```tsx
const topicBreadcrumbs = [
  commonBreadcrumbs.home,
  commonBreadcrumbs.libraries,
  commonBreadcrumbs.topics,
  { label: "Topic Branch", href: "/topics/branch" },
  { label: "Subtopic", href: "/topics/branch/subtopic" },
  { label: "Current Page" },
];

<Breadcrumb items={topicBreadcrumbs} />;
```

## 📝 Benefits of Route Groups

1. **Organization**: Logical grouping of related routes
2. **Shared Layouts**: Can have different layouts per group
3. **URL Structure**: Route groups don't affect URLs (parentheses are removed)
4. **Maintenance**: Easier to find and manage related pages
5. **Scalability**: Clean structure as project grows

## 🔗 URLs (No Change)

Despite the folder restructuring, all URLs remain the same:

- `/` - Home
- `/search` - Search
- `/about` - About
- `/login` - Login
- etc.

The `(general)` and `(auth)` folders are route groups and don't appear in URLs.

## ✨ Testing

**Dev Server Running:** http://localhost:3001

Test the following:

- ✅ All routes accessible
- ✅ Footer displays correctly with gradient background
- ✅ Breadcrumbs work on pages with them
- ✅ Navigation links in header work
- ✅ Footer links navigate properly
- ✅ Responsive layout on mobile

## 📚 Documentation Files

- **README.md** - Project overview
- **STRUCTURE.md** - Folder structure guide
- **SETUP_SUMMARY.md** - Initial setup
- **UPDATE_SUMMARY.md** - Previous updates
- **ROUTE_GROUPS_UPDATE.md** - This file

---

**Status:** ✅ All changes implemented and tested
**Package Manager:** pnpm
**Next.js Version:** 16.1.1
**Development Server:** Running on port 3001
