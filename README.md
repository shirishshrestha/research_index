# Resource Index

A comprehensive resource indexing platform built with Next.js, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **State Management:** React Query (TanStack Query)
- **Form Handling:** React Hook Form
- **Validation:** Zod
- **Icons:** Lucide React

## Design System

### Colors

- Primary: `#023B8B`
- Secondary: `#82D558`
- Text White: `#fff`
- Text Black: `#131313`
- Text Gray: `#555`

### Gradients

- Blue: `linear-gradient(180deg, #023B8B 25.96%, #012558 70.66%)`
- Blue 2: `linear-gradient(180deg, #8DB3ED 27.56%, #476CA3 74.03%)`
- Green: `linear-gradient(180deg, #82D558 0%, #437729 78.18%)`

### Typography

- **Headings:** Merriweather font family
- **Body text:** Roboto font family

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── layout/           # Layout components (Header, Footer)
│   ├── shared/           # Shared UI components (Button, Breadcrumb)
│   └── ui/               # shadcn/ui components
├── features/             # Feature-based modules
│   └── home/            # Home feature
│       ├── components/  # Feature-specific components
│       └── index.tsx    # Feature entry point
├── hooks/               # Custom React hooks
├── services/            # API services
├── types/               # TypeScript types
├── utils/               # Utility functions
├── config/              # Configuration files
├── constants/           # Constants and design tokens
└── lib/                 # Library code and providers
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create environment file:

```bash
cp .env.example .env.local
```

4. Update environment variables in `.env.local`

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Build the production application:

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## Features

- ✅ Server-side rendering for SEO optimization
- ✅ Feature-based folder structure
- ✅ TypeScript for type safety
- ✅ Tailwind CSS with custom design system
- ✅ React Query for data fetching
- ✅ React Hook Form with Zod validation
- ✅ shadcn/ui component library
- ✅ Responsive design
- ✅ Custom typography and color system

## Adding New Features

1. Create a new folder in `features/`
2. Add feature-specific components in `components/`
3. Create API services in the feature directory
4. Export the main component from `index.tsx`
5. Use the feature in your pages

## Adding shadcn/ui Components

```bash
npx shadcn@latest add button
npx shadcn@latest add card
# etc.
```

## Environment Variables

See `.env.example` for required environment variables.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [React Query](https://tanstack.com/query)
- [React Hook Form](https://react-hook-form.com)
