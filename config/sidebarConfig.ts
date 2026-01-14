import {
  LayoutDashboard,
  CheckCircle,
  Users,
  BookOpen,
  Files,
  FilePlus2Icon,
  Inbox,
  Book,
  Bug,
  BookCheck,
  TrendingUp,
} from "lucide-react";

interface MenuItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: MenuItem[];
}

// Sidebar configuration for each role
export const sidebarConfig: Record<string, MenuItem[]> = {
  AUTHOR: [
    {
      name: "Overview",
      path: "/author/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Submissions",
      path: "/author/submissions",
      icon: Inbox,
      children: [
        {
          name: "Submissions",
          path: "/author/submissions/drafts",
          icon: Files,
        },
        {
          name: "New Submission",
          path: "/author/new-submission",
          icon: FilePlus2Icon,
        },
      ],
    },
  ],

  ADMIN: [
    {
      name: "Overview",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: Users,
    },
    {
      name: "Topics",
      path: "/admin/topics",
      icon: BookOpen,
    },
    {
      name: "Journals",
      path: "/admin/journals",
      icon: Book,
      children: [
        {
          name: "Journal Management",
          path: "/admin/journals",
          icon: BookOpen,
        },
        {
          name: "Verify Journals",
          path: "/admin/inactive-journals",
          icon: BookCheck,
        },
      ],
    },
    {
      name: "Leaderboard",
      path: "/admin/leaderboard",
      icon: TrendingUp,
    },
    {
      name: "Error Logs",
      path: "/admin/error-logs",
      icon: Bug,
    },
  ],
  INSTITUTION: [
    {
      name: "Overview",
      path: "/institution/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Publications",
      path: "/institution/publications",
      icon: BookOpen,
    },
    {
      name: "Researchers",
      path: "/institution/researchers",
      icon: Users,
    },
  ],
};
