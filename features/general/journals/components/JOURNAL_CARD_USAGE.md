# JournalCard Component Usage

## Import

```tsx
import { JournalCard } from "@/features/general/journals";
import type {
  JournalCardProps,
  JournalMetric,
} from "@/features/general/journals";
```

## Basic Usage

```tsx
<JournalCard
  title="Journal of Himalayan Environmental Studies"
  institution="Nepal Academy of Science and Technology (NAST)"
  imageUrl="/path/to/journal-cover.jpg"
  badge={{
    label: "ICV 2024",
    value: "171.50",
  }}
  metrics={[
    { value: "1.2", label: "Impact factor" },
    { value: "2.8", label: "CiteScore" },
    { value: "54%", label: "Acceptance Rate" },
    { value: "45 days", label: "Submission to first decision" },
    { value: "7 days", label: "Time to acceptance" },
  ]}
  href="/journals/123"
/>
```

## Props

| Prop          | Type                                         | Required | Description                                 |
| ------------- | -------------------------------------------- | -------- | ------------------------------------------- |
| `title`       | `string`                                     | ✅       | Journal name (displays as heading-4)        |
| `institution` | `string`                                     | ✅       | Institution name (displays with para class) |
| `imageUrl`    | `string`                                     | ❌       | Journal cover image URL                     |
| `badge`       | `{ label: string; value: string \| number }` | ❌       | Top-right badge (e.g., ICV score)           |
| `metrics`     | `JournalMetric[]`                            | ✅       | Array of journal metrics                    |
| `href`        | `string`                                     | ❌       | Link URL (makes card clickable)             |

### JournalMetric

```tsx
interface JournalMetric {
  value: string | number; // Displays as heading-4
  label: string; // Displays with desc class
}
```

## Examples

### Without Image

```tsx
<JournalCard
  title="Nepal Journal of Medical Sciences"
  institution="Institute of Medicine"
  badge={{ label: "IF 2024", value: "3.45" }}
  metrics={[
    { value: "3.45", label: "Impact factor" },
    { value: "4.2", label: "CiteScore" },
  ]}
/>
```

### With Link

```tsx
<JournalCard
  title="Himalayan Biodiversity"
  institution="Tribhuvan University"
  imageUrl="/images/journals/himalayan-bio.jpg"
  href="/journals/himalayan-biodiversity"
  metrics={[
    { value: "2.1", label: "Impact factor" },
    { value: "30%", label: "Acceptance Rate" },
    { value: "60 days", label: "Review Time" },
  ]}
/>
```

### List of Journals

```tsx
const journals = [
  {
    id: 1,
    title: "Journal of Himalayan Environmental Studies",
    institution: "Nepal Academy of Science and Technology (NAST)",
    imageUrl: "/journals/jhes.jpg",
    badge: { label: "ICV 2024", value: "171.50" },
    metrics: [
      { value: "1.2", label: "Impact factor" },
      { value: "2.8", label: "CiteScore" },
      { value: "54%", label: "Acceptance Rate" },
      { value: "45 days", label: "Submission to first decision" },
      { value: "7 days", label: "Time to acceptance" },
    ],
  },
  // ... more journals
];

export default function JournalsPage() {
  return (
    <div className="space-y-4">
      {journals.map((journal) => (
        <JournalCard
          key={journal.id}
          {...journal}
          href={`/journals/${journal.id}`}
        />
      ))}
    </div>
  );
}
```

## Styling

The component uses:

- `heading-4` class for titles and metric values
- `para` class for institution name
- `desc` class for metric labels
- Tailwind utility classes for layout and spacing
- Card component from shadcn/ui for container

## Features

- ✅ Responsive layout
- ✅ Hover shadow effect
- ✅ Optional clickable card (with href)
- ✅ Optional badge display
- ✅ Optional journal cover image
- ✅ Flexible metrics array
- ✅ Proper semantic HTML structure
