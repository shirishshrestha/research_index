export interface Topic {
  id: number;
  name: string;
  slug?: string;
  description?: string;
  icon?: string;
  is_active: boolean;
  order: number;
  branches_count?: number;
}

export interface TopicBranch {
  id: number;
  topic: number;
  parent?: number | null;
  name: string;
  slug?: string;
  description?: string;
  is_active: boolean;
  order: number;
}

export interface PaginatedResponse<T> {
  results: T[];
  count?: number;
}
