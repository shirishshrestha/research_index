# Project Structure Documentation

## Overview

This project follows a feature-based folder structure, organizing code by features/modules rather than technical layers. This approach improves scalability and makes it easier to locate related code.

## Directory Structure

### `/app`

Next.js App Router directory containing routes and layouts.

- `layout.tsx` - Root layout with providers, fonts, and metadata
- `page.tsx` - Home page route
- `globals.css` - Global styles and CSS variables

### `/components`

Reusable components organized by purpose:

#### `/components/layout`

Layout components used across the application:

- `Header.tsx` - Site header with navigation
- `Footer.tsx` - Site footer
- `MainLayout.tsx` - Main layout wrapper combining header and footer

#### `/components/shared`

Shared UI components used across features:

- `Button.tsx` - Primary and secondary button variants
- `Breadcrumb.tsx` - Navigation breadcrumb component
- `Container.tsx` - Responsive container wrapper

#### `/components/ui`

shadcn/ui components (auto-generated when adding components)

### `/features`

Feature-based modules, each containing:

- `/components` - Feature-specific components
- `/hooks` - Feature-specific hooks
- `/services` - Feature-specific API calls
- `/types` - Feature-specific types
- `index.tsx` - Main export for the feature

Example:

```
/features/home
  /components
    - HeroSection.tsx
    - FeaturesSection.tsx
    - index.ts
  - index.tsx
```

### `/hooks`

Global custom React hooks:

- `useApi.ts` - API hooks using React Query (useGet, usePost, usePut, useDelete)
- `index.ts` - Hook exports

### `/services`

API service layer:

- `api.ts` - Base API client with fetch wrapper

### `/types`

Global TypeScript type definitions:

- `index.ts` - Common types (BaseEntity, ApiResponse, PaginatedResponse)

### `/utils`

Utility functions:

- `format.ts` - Date and text formatting utilities
- `index.ts` - Utility exports

### `/lib`

Library code and configurations:

- `providers.tsx` - React Query provider setup
- `utils.ts` - shadcn/ui utility (cn function)

### `/config`

Configuration files:

- `site.ts` - Site configuration and metadata

### `/constants`

Application constants:

- `colors.ts` - Design system colors and gradients

## Design Patterns

### Feature Structure

Each feature should follow this structure:

```
/features/[feature-name]
  /components       # UI components specific to this feature
  /hooks           # Custom hooks for this feature
  /services        # API calls for this feature
  /types           # TypeScript types for this feature
  index.tsx        # Main export combining all parts
```

### Component Organization

- **Layout components**: Structural components (Header, Footer, Sidebar)
- **Shared components**: Reusable UI components (Button, Card, Modal)
- **Feature components**: Feature-specific components (HeroSection, ProductCard)

### API Layer

- Use the `api` service from `/services/api.ts` for all HTTP requests
- Use React Query hooks from `/hooks/useApi.ts` for data fetching
- Keep API logic in feature-specific service files when complex

### Type Safety

- Define types in `/types` for global types
- Define types in feature directories for feature-specific types
- Use Zod schemas for form validation and API response validation

## Naming Conventions

### Files

- Components: PascalCase (e.g., `Button.tsx`, `HeroSection.tsx`)
- Hooks: camelCase with 'use' prefix (e.g., `useApi.ts`, `useAuth.ts`)
- Utils: camelCase (e.g., `format.ts`, `validation.ts`)
- Types: camelCase (e.g., `index.ts`, `user.ts`)

### Components

- Use named exports for components
- Include an index file for easy imports
- Example:

```tsx
// Button.tsx
export function Button() {}

// index.ts
export { Button } from "./Button";
```

## Styling Guidelines

### CSS Classes

- Use Tailwind utility classes for styling
- Use CSS custom properties for design tokens
- Add custom classes in globals.css when needed

### Design Tokens

Available in CSS variables:

- Colors: `var(--primary)`, `var(--secondary)`
- Gradients: `var(--gradient-blue)`, `var(--gradient-green-1)`

### Typography Classes

- `.heading-1`, `.heading-2`, `.heading-3`, `.heading-4`
- `.heading-gradient` - For gradient text
- `.subheading` - For section subheadings
- `.btn-primary`, `.btn-secondary` - For buttons
- `.breadcrumb-bg` - For breadcrumb background

## Best Practices

### Server Components (SEO)

- Use server components by default (no 'use client')
- Only add 'use client' when needed (hooks, event handlers, browser APIs)
- Keep data fetching in server components when possible

### Code Organization

- Keep files small and focused (< 200 lines)
- Use feature folders for related code
- Export through index files for cleaner imports

### State Management

- Use React Query for server state
- Use React hooks (useState, useReducer) for local state
- Consider Zustand or Context for global client state if needed

### Type Safety

- Define prop types for all components
- Use strict TypeScript settings
- Avoid 'any' types

## Adding New Features

1. Create feature folder: `/features/[feature-name]`
2. Add components in `/features/[feature-name]/components`
3. Create feature page in `/app/[feature-name]/page.tsx`
4. Export main component from `/features/[feature-name]/index.tsx`
5. Import and use in the page

Example:

```tsx
// /features/resources/index.tsx
export function ResourcesPage() {
  return <div>Resources</div>;
}

// /app/resources/page.tsx

import { ResourcesPage } from "@/features/resources";

export default function Resources() {
  return <ResourcesPage />;
}
```
