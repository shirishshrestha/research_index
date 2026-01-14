export interface ProfileTabDropdownItem {
  label: string;
  value: string;
  content: React.ReactNode;
}

export interface ProfileTab {
  label: string;
  value: string;
  content: React.ReactNode;
  dropdown?: ProfileTabDropdownItem[];
}

export interface ProfileTabsProps {
  tabs: ProfileTab[];
  paramKey?: string;
  moreOptions?: React.ReactNode;
  className?: string;
  /**
   * Optional map of tabValue -> list of query params that should be cleared
   * when switching away from that tab. Example: { research: ["category"] }
   */
  clearParamsOnTabSwitch?: Record<string, string[]>;
}

export interface ProfileStatsProps {
  hIndex: number;
  iIndex: number;
  citations: number;
  className?: string;
}

export interface ProfileSideListItem {
  id: string;
  name: string;
  position: string;
  verifiedEmail?: string;
  avatarUrl?: string;
  href: string;
}

export interface ProfileSideListProps {
  title: string;
  items: ProfileSideListItem[];
  viewAllHref?: string;
  emptyMessage?: string;
}

export interface ProfileCardProps {
  avatarUrl?: string;
  name: string;
  position: string;
  affiliation: string;
  verifiedEmail?: string;
  isInstitution?: boolean;
  isFollowing?: boolean;
  onFollow?: () => void;
}
