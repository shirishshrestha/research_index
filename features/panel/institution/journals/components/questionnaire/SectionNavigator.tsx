import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock, Circle, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { QuestionnaireFormData } from "../../types/questionnaire";

interface Section {
  id: number;
  title: string;
  component: React.ComponentType<{
    data: Partial<QuestionnaireFormData>;
    onChange: (data: Partial<QuestionnaireFormData>) => void;
  }>;
}

interface SectionNavigatorProps {
  sections: Section[];
  currentSection: number;
  completedSections: Set<number>;
  onSectionChange: (index: number) => void;
  canNavigateToSection: (index: number) => boolean;
}

export function SectionNavigator({
  sections,
  currentSection,
  completedSections,
  onSectionChange,
  canNavigateToSection,
}: SectionNavigatorProps) {
  const getCompletionPercentage = () => {
    return Math.round((completedSections.size / sections.length) * 100);
  };

  const getSectionStatus = (index: number) => {
    const isCurrent = index === currentSection;
    const isCompleted = completedSections.has(index);
    const canNavigate = canNavigateToSection(index);

    if (isCompleted) return "completed";
    if (isCurrent) return "current";
    if (!canNavigate) return "locked";
    return "available";
  };

  const getSectionIcon = (index: number, status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4" />;
      case "current":
        return <Circle className="h-4 w-4 fill-current" />;
      case "locked":
        return <Lock className="h-3.5 w-3.5" />;
      default:
        return <span className="text-xs font-bold">{index + 1}</span>;
    }
  };

  const getSectionStyles = (status: string) => {
    const baseStyles =
      "justify-start h-auto py-4 px-4 transition-all duration-200";

    switch (status) {
      case "completed":
        return cn(
          baseStyles,
          "border-green-200 bg-linear-to-r from-green-50 to-green-50/50",
          "hover:from-green-100 hover:to-green-50",
          "dark:from-green-950/30 dark:to-green-950/10",
          "shadow-sm",
        );
      case "current":
        return cn(
          baseStyles,
          "border-2 border-primary bg-linear-to-r from-primary/10 to-primary/5",
          "shadow-lg shadow-primary/20",
          "ring-2 ring-primary/20",
        );
      case "locked":
        return cn(
          baseStyles,
          "border-muted bg-muted/30 cursor-not-allowed opacity-60",
          "hover:bg-muted/30",
        );
      default:
        return cn(
          baseStyles,
          "border-border hover:border-primary/50 hover:bg-accent/50",
        );
    }
  };

  return (
    <Card className="mb-6 border-primary/20 shadow-md">
      <CardHeader className="bg-linear-to-r from-primary/5 via-primary/3 to-transparent pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            Section Navigator
          </CardTitle>
          <Badge variant="secondary" className="text-xs">
            {completedSections.size} of {sections.length} completed
          </Badge>
        </div>
        {/* Overall completion bar */}
        <div className="mt-3 space-y-1.5">
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span>Overall Completion</span>
            <span className="font-semibold text-primary">
              {getCompletionPercentage()}%
            </span>
          </div>
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-green-500 to-green-600 transition-all duration-500 ease-out"
              style={{ width: `${getCompletionPercentage()}%` }}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {sections.map((section, index) => {
            const status = getSectionStatus(index);
            const canNavigate = canNavigateToSection(index);

            return (
              <Button
                key={section.id}
                onClick={() => canNavigate && onSectionChange(index)}
                variant={status === "current" ? "default" : "outline"}
                size="sm"
                className={getSectionStyles(status)}
                disabled={!canNavigate}
              >
                <div className="flex items-center gap-3 w-full">
                  <div
                    className={cn(
                      "shrink-0 h-8 w-8 rounded-full flex items-center justify-center font-bold transition-colors",
                      status === "current" &&
                        "bg-white/90 text-primary shadow-sm",
                      status === "completed" && "bg-green-500 text-white",
                      status === "locked" && "bg-muted text-muted-foreground",
                      status === "available" && "bg-muted text-foreground",
                    )}
                  >
                    {getSectionIcon(index, status)}
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <span className="text-xs font-medium block truncate">
                      {section.title}
                    </span>
                    <span className="text-[10px] text-muted-foreground block mt-0.5">
                      {status === "completed" && "✓ Complete"}
                      {status === "current" && "In Progress"}
                      {status === "locked" && "Complete previous"}
                      {status === "available" && "Not started"}
                    </span>
                  </div>
                </div>
              </Button>
            );
          })}
        </div>

        {/* Helper text */}
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
          <p className="text-xs text-blue-900 dark:text-blue-300">
            Complete all required fields in each section to unlock the next one.
            You can save your progress at any time.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
