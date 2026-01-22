import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import type { QuestionnaireFormData } from "../../types/questionnaire";

interface Section {
  id: number;
  title: string;
  component: React.ComponentType<{
    data: Partial<QuestionnaireFormData>;
    onChange: (data: Partial<QuestionnaireFormData>) => void;
  }>;
}

interface NavigationFooterProps {
  currentSection: number;
  totalSections: number;
  sections: Section[];
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  canProceed: boolean;
  isLastSection: boolean;
}

export function NavigationFooter({
  currentSection,
  totalSections,
  sections,
  onPrevious,
  onNext,
  onSubmit,
  canProceed,
  isLastSection,
}: NavigationFooterProps) {
  return (
    <Card className="mt-6 border-primary/20 sticky bottom-4 shadow-xl bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <CardContent className="py-4">
        <div className="flex justify-between items-center gap-4">
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={currentSection === 0}
            className="min-w-30"
            size="lg"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          <div className="flex-1 text-center hidden md:block">
            {!isLastSection ? (
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Up Next</p>
                <p className="font-semibold text-sm">
                  {sections[currentSection + 1].title}
                </p>
                {!canProceed && (
                  <Badge variant="secondary" className="gap-1 text-xs mt-1">
                    <AlertTriangle className="h-3 w-3" />
                    Complete required fields
                  </Badge>
                )}
              </div>
            ) : (
              <div className="space-y-1">
                <p className="text-xs text-green-600 dark:text-green-400">
                  All Sections Complete
                </p>
                <p className="font-semibold text-sm text-green-600 dark:text-green-400">
                  Ready to Submit
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            {isLastSection ? (
              <Button
                onClick={onSubmit}
                className="gap-2 min-w-40 bg-green-600 hover:bg-green-700"
                size="lg"
                disabled={!canProceed}
              >
                <CheckCircle2 className="h-5 w-5" />
                Submit Questionnaire
              </Button>
            ) : (
              <Button
                onClick={onNext}
                className="min-w-30"
                size="lg"
                disabled={!canProceed}
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Mobile helper text */}
        {!canProceed && (
          <div className="md:hidden mt-3 p-2 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded text-center">
            <p className="text-xs text-amber-900 dark:text-amber-300">
              Complete all required fields to continue
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
