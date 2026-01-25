import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText, Save } from "lucide-react";

interface QuestionnaireHeaderProps {
  onSaveProgress: () => void;
  isSaving: boolean;
}

export function QuestionnaireHeader({
  onSaveProgress,
  isSaving,
}: QuestionnaireHeaderProps) {
  const router = useRouter();

  return (
    <Card className="mb-6 overflow-hidden border-primary/20">
      <div className="bg-linear-to-r from-primary/5 via-primary/3 to-transparent">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-start gap-3">
              <div className="p-3 bg-primary rounded-xl shadow-lg shadow-primary/20">
                <FileText className="h-7 w-7 text-white" />
              </div>
              <div>
                <CardTitle className="text-3xl font-bold bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Journal Questionnaire
                </CardTitle>
                <CardDescription className="mt-1 text-base">
                  Complete all sections to submit for evaluation
                </CardDescription>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onSaveProgress}
                disabled={isSaving}
              >
                <Save className="mr-2 h-4 w-4" />
                Save Progress
              </Button>
            </div>
          </div>
        </CardHeader>
      </div>
    </Card>
  );
}
