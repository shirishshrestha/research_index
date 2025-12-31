# FilterToolbar Slider Usage

## Overview

The `FilterToolbar.SliderGroup` component allows you to add range sliders with accordion support, perfect for filtering by numerical metrics like Impact Factor, CiteScore, etc.

## Basic Usage

```tsx
import { FilterToolbar } from "@/features/shared/components/FilterToolbar";

export default function JournalsPage() {
  return (
    <div className="flex gap-6">
      {/* Sidebar with filters */}
      <aside className="w-80">
        <FilterToolbar>
          <FilterToolbar.SliderGroup
            label="Journal Performance Metrics"
            accordion
            defaultOpen
            showCard
            sliders={[
              {
                label: "Impact Factor",
                paramName: "impact_factor",
                min: 1,
                max: 10,
                step: 0.1,
                defaultValue: 1,
              },
              {
                label: "CiteScore",
                paramName: "cite_score",
                min: 1,
                max: 10,
                step: 0.1,
                defaultValue: 1,
              },
              {
                label: "Time to 1st Decision",
                paramName: "time_to_decision",
                min: 1,
                max: 10,
                step: 1,
                defaultValue: 1,
              },
              {
                label: "Time to Acceptance",
                paramName: "time_to_acceptance",
                min: 1,
                max: 10,
                step: 1,
                defaultValue: 1,
              },
            ]}
            onChange={(paramName, value) => {
              console.log(`${paramName} changed to ${value}`);
            }}
          />
        </FilterToolbar>
      </aside>

      {/* Main content */}
      <main className="flex-1">{/* Your content here */}</main>
    </div>
  );
}
```

## Props

### FilterToolbar.SliderGroup

| Prop          | Type                                         | Default     | Description                          |
| ------------- | -------------------------------------------- | ----------- | ------------------------------------ |
| `label`       | `string`                                     | `"Filters"` | Title for the slider group           |
| `sliders`     | `SliderOption[]`                             | `[]`        | Array of slider configurations       |
| `onChange`    | `(paramName: string, value: number) => void` | `undefined` | Callback when any slider changes     |
| `className`   | `string`                                     | `""`        | Additional CSS classes               |
| `accordion`   | `boolean`                                    | `false`     | Wrap in accordion (collapsible)      |
| `defaultOpen` | `boolean`                                    | `true`      | Whether accordion is open by default |
| `showCard`    | `boolean`                                    | `true`      | Wrap in card component               |

### SliderOption

| Property       | Type     | Required | Description                  |
| -------------- | -------- | -------- | ---------------------------- |
| `label`        | `string` | ✅       | Display label for the slider |
| `paramName`    | `string` | ✅       | URL parameter name           |
| `min`          | `number` | ✅       | Minimum value                |
| `max`          | `number` | ✅       | Maximum value                |
| `step`         | `number` | ❌       | Step increment (default: 1)  |
| `defaultValue` | `number` | ❌       | Default value (default: min) |

## URL Parameters

The sliders automatically sync with URL query parameters. For example:

- `/journals?impact_factor=5.5&cite_score=7`
- Values are added to URL only when changed from default
- Default values don't appear in URL

## Examples

### Without Accordion

```tsx
<FilterToolbar.SliderGroup
  label="Price Range"
  showCard={false}
  sliders={[
    {
      label: "Minimum Price",
      paramName: "min_price",
      min: 0,
      max: 1000,
      step: 10,
      defaultValue: 0,
    },
    {
      label: "Maximum Price",
      paramName: "max_price",
      min: 0,
      max: 1000,
      step: 10,
      defaultValue: 1000,
    },
  ]}
/>
```

### Multiple Slider Groups

```tsx
<FilterToolbar>
  <FilterToolbar.SliderGroup
    label="Journal Metrics"
    accordion
    sliders={[
      { label: "Impact Factor", paramName: "if", min: 0, max: 10 },
      { label: "CiteScore", paramName: "cs", min: 0, max: 10 },
    ]}
  />

  <FilterToolbar.SliderGroup
    label="Review Timeline"
    accordion
    sliders={[
      {
        label: "Review Time (days)",
        paramName: "review_days",
        min: 1,
        max: 365,
      },
      {
        label: "Acceptance Rate (%)",
        paramName: "accept_rate",
        min: 0,
        max: 100,
      },
    ]}
  />
</FilterToolbar>
```

## Reading Values on the Server

```tsx
// app/(general)/journals/page.tsx
interface SearchParams {
  impact_factor?: string;
  cite_score?: string;
  // ... other params
}

export default async function JournalsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const impactFactor = params.impact_factor
    ? parseFloat(params.impact_factor)
    : 1;

  const citeScore = params.cite_score
    ? parseFloat(params.cite_score)
    : 1;

  // Use these values to filter your data
  const filteredJournals = await fetchJournals({
    minImpactFactor: impactFactor,
    minCiteScore: citeScore,
  });

  return (
    // Your JSX
  );
}
```
