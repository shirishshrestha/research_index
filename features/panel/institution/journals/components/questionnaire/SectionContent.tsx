import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { QuestionnaireFormData } from "../../types/questionnaire";

interface Section {
  id: number;
  title: string;
  component: React.ComponentType<{
    data: Partial<QuestionnaireFormData>;
    onChange: (data: Partial<QuestionnaireFormData>) => void;
  }>;
}

interface SectionContentProps {
  section: Section;
  sectionIndex: number;
  formData: Partial<QuestionnaireFormData>;
  onChange: (data: Partial<QuestionnaireFormData>) => void;
}

export function SectionContent({
  section,
  sectionIndex,
  formData,
  onChange,
}: SectionContentProps) {
  const CurrentSectionComponent = section.component;

  return (
    <Card className="border-2 border-primary/20 shadow-lg">
      <div className="bg-linear-to-r from-primary/10 via-primary/5 to-transparent">
        <CardHeader>
          <div className="flex items-start gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-linear-to-br from-primary to-primary/70 text-white text-lg font-bold shadow-lg shadow-primary/20">
              {sectionIndex + 1}
            </div>
            <div className="flex-1">
              <CardTitle className="text-2xl mb-1">{section.title}</CardTitle>
              <CardDescription className="text-base">
                Complete the fields below for this section. Fields marked with *
                are required.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </div>
      <CardContent className="pt-6">
        <CurrentSectionComponent data={formData} onChange={onChange} />
      </CardContent>
    </Card>
  );
}
