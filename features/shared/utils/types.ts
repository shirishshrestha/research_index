import * as React from "react";

/* -------------------------------------------------------------------------- */
/* Common Types                                                                */
/* -------------------------------------------------------------------------- */

export interface SelectOption {
  value: string;
  label: string;
}

export interface RadioOption {
  value: string;
  label: string;
}

export interface SliderOption {
  label: string;
  paramName: string;
  min: number;
  max: number;
  step?: number;
  defaultValue?: number;
}

/* -------------------------------------------------------------------------- */
/* Author Types                                                                */
/* -------------------------------------------------------------------------- */

export interface Author {
  id: string;
  name: string;
  position: string;
  affiliation: string;
  verifiedAffiliation?: string;
  imageUrl?: string;
  publicationCount?: number;
  fieldOfResearch?: string;
  country?: string;
}

/* -------------------------------------------------------------------------- */
/* FilterToolbar Component Props                                               */
/* -------------------------------------------------------------------------- */

export interface FilterToolbarProps {
  children: React.ReactNode;
  className?: string;
  containerClass?: string;
}

export interface FilterToolbarSearchProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  paramName?: string;
  debounceMs?: number;
  className?: string;
}

export interface FilterToolbarSelectProps {
  label?: string;
  options?: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  paramName: string;
  placeholder?: string;
  className?: string;
}

export interface FilterToolbarDateInputProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  paramName: string;
  className?: string;
}

export interface FilterToolbarRadioGroupProps {
  label?: string;
  options?: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  paramName: string;
  className?: string;
  accordion?: boolean;
  defaultOpen?: boolean;
  showCard?: boolean;
}

export interface FilterToolbarSearchableRadioGroupProps {
  label?: string;
  options?: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  paramName: string;
  searchPlaceholder?: string;
  maxHeight?: string;
  className?: string;
  accordion?: boolean;
  defaultOpen?: boolean;
  showCard?: boolean;
}

export interface FilterToolbarSliderGroupProps {
  label?: string;
  sliders: SliderOption[];
  onChange?: (paramName: string, value: number) => void;
  className?: string;
  accordion?: boolean;
  defaultOpen?: boolean;
  showCard?: boolean;
}

export interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
  totalCount?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
  showPageSizeSelector?: boolean;
  showPageInfo?: boolean;
  showFirstLast?: boolean;
  className?: string;
}
