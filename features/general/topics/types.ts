export interface TopicDetailViewProps {
  topicId: string;
}

export interface TopicBranch {
  id: number;
  name: string;
  slug: string;
  description?: string;
  level: number;
  full_path: string;
  children_count: number;
  publications_count: number;
  parent_id?: number | null;
  children?: TopicBranch[];
}

export interface Topic {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon?: string;
  branches: TopicBranch[];
  branches_count: number;
  publications_count: number;
}

// Topic Tree API response (array format)
export type TopicTree = Topic[];
