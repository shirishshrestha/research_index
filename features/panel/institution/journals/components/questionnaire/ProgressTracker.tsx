import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2 } from "lucide-react";
import type { JournalQuestionnaire } from "../../types/questionnaire";

interface ProgressTrackerProps {
  currentSection: number;
  totalSections: number;
  currentSectionTitle: string;
  questionnaire?: JournalQuestionnaire;
}

export function ProgressTracker({
  currentSection,
  totalSections,
  currentSectionTitle,
  questionnaire,
}: ProgressTrackerProps) {
  const progress = ((currentSection + 1) / totalSections) * 100;
  console.log("Progress:", progress);

  return (
    <Card className="mb-6 overflow-hidden border-primary/20">
      <Separator />
      <CardContent className="pt-6 space-y-6">
        {/* Progress Info */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full">
              <span className="text-sm font-bold text-primary">
                {currentSection + 1}/{totalSections}
              </span>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Current Section</p>
              <p className="font-semibold">{currentSectionTitle}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Overall Progress</p>
            <p className="text-2xl font-bold text-primary">
              {Math.round(progress)}%
            </p>
          </div>
        </div>

        {/* Progress Bar with gradient */}
        <div className="space-y-2">
          <Progress value={progress} className="h-3 bg-primary/10" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Started</span>
            <span>{Math.round(progress)}% Complete</span>
            <span>Submit</span>
          </div>
        </div>

        {/* Completeness Badge */}
        {questionnaire && (
          <div className="flex items-center gap-2 pt-2">
            <Badge
              variant={questionnaire.is_complete ? "default" : "secondary"}
              className="gap-1"
            >
              {questionnaire.is_complete && (
                <CheckCircle2 className="h-3 w-3" />
              )}
              {questionnaire.is_complete ? "Complete" : "In Progress"}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {questionnaire.completeness_percentage ?? 0}% of fields filled
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
