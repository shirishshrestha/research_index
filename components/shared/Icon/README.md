# Icon Component

A reusable Icon component for custom SVG files from Figma.

## Setup

1. Export your SVG icons from Figma
2. Place them in the `public/icons/` folder
3. Name them descriptively (e.g., `home.svg`, `user.svg`, `settings.svg`)
4. Add the icon names to `components/shared/Icon/icons.tsx`

## Folder Structure

```
public/
  icons/
    home.svg
    user.svg
    settings.svg
    search.svg
    menu.svg
    ...
```

## Usage

### Basic Usage

```tsx
import { Icon } from "@/components/shared";

function MyComponent() {
  return (
    <div>
      <Icon name="home" />
      <Icon name="user" size={32} />
      <Icon name="settings" className="text-primary" />
    </div>
  );
}
```

### With Custom Styling

```tsx
<Icon name="search" size={24} color="#3B82F6" className="hover:opacity-80" />
```

### With Click Handler

```tsx
<Icon
  name="menu"
  size={28}
  onClick={() => setMenuOpen(true)}
  className="cursor-pointer"
/>
```

## Props

| Prop        | Type         | Default          | Description                                        |
| ----------- | ------------ | ---------------- | -------------------------------------------------- |
| `name`      | `IconName`   | required         | Name of the SVG file (without .svg extension)      |
| `size`      | `number`     | `24`             | Size of the icon in pixels                         |
| `className` | `string`     | `undefined`      | Additional CSS classes                             |
| `color`     | `string`     | `"currentColor"` | Color of the icon (works if SVG uses currentColor) |
| `onClick`   | `() => void` | `undefined`      | Click handler function                             |

## Adding New Icons

1. Export your icon from Figma as SVG
2. Place the SVG file in `public/icons/` (e.g., `public/icons/new-icon.svg`)
3. Add the icon name to `components/shared/Icon/icons.tsx`:

```tsx
export const iconNames = [
  // ... existing icons
  "new-icon",
] as const;
```

4. Use it in your components:

```tsx
<Icon name="new-icon" size={24} />
```

## SVG Optimization Tips

For best results with your Figma SVGs:

1. **Remove fill colors** - Replace with `fill="currentColor"` to allow color customization
2. **Remove stroke colors** - Replace with `stroke="currentColor"` if using strokes
3. **Set viewBox** - Ensure your SVG has a proper viewBox attribute
4. **Remove unnecessary attributes** - Clean up `id`, `class`, and other Figma-specific attributes

Example optimized SVG:

```svg
<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M..." stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>
```

## TypeScript Support

The component provides full TypeScript autocomplete for icon names. If you add a new icon to the `iconNames` array, it will automatically be available in your IDE's autocomplete.
