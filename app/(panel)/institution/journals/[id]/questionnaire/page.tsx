"use client";

import { use, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  PanelContainer,
  PanelLoadingSkeleton,
  PanelErrorCard,
} from "@/features/shared";
import {
  getJournalQuestionnaire,
  createQuestionnaire,
  updateQuestionnaire,
} from "@/features/panel/institution/journals/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Save, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Import all questionnaire section components
import {
  GeneralInformationSection,
  SubjectAreaSection,
  EditorialBoardSection,
  PeerReviewSection,
  PublicationEthicsSection,
  PublicationStatisticsSection,
  GeographicDistributionSection,
  OpenAccessSection,
  DigitalInfrastructureSection,
  IndexingSection,
  TransparencySection,
} from "@/features/panel/institution/journals/components/questionnaire";

const SECTIONS = [
  { id: 1, title: "General Information", component: GeneralInformationSection },
  { id: 2, title: "Subject Area & Content", component: SubjectAreaSection },
  { id: 3, title: "Editorial Board", component: EditorialBoardSection },
  { id: 4, title: "Peer Review", component: PeerReviewSection },
  { id: 5, title: "Publication Ethics", component: PublicationEthicsSection },
  {
    id: 6,
    title: "Publication Statistics",
    component: PublicationStatisticsSection,
  },
  {
    id: 7,
    title: "Geographic Distribution",
    component: GeographicDistributionSection,
  },
  { id: 8, title: "Open Access & Licensing", component: OpenAccessSection },
  {
    id: 9,
    title: "Digital Infrastructure",
    component: DigitalInfrastructureSection,
  },
  { id: 10, title: "Indexing & Abstracting", component: IndexingSection },
  {
    id: 11,
    title: "Transparency & Verification",
    component: TransparencySection,
  },
];

export default function JournalQuestionnairePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const journalId = parseInt(id);
  const router = useRouter();
  const queryClient = useQueryClient();
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState<any>({});

  // Fetch existing questionnaire if it exists
  const {
    data: questionnaire,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["questionnaire", journalId],
    queryFn: () => getJournalQuestionnaire(journalId),
    retry: false, // Don't retry if questionnaire doesn't exist
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => createQuestionnaire(journalId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questionnaire", journalId] });
      toast.success("Questionnaire created successfully");
      router.push(`/institution/journals/${journalId}`);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create questionnaire");
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: any) => updateQuestionnaire(questionnaire!.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questionnaire", journalId] });
      toast.success("Questionnaire updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update questionnaire");
    },
  });

  const handleSectionChange = (data: any) => {
    setFormData((prev: any) => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    if (currentSection < SECTIONS.length - 1) {
      setCurrentSection((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection((prev) => prev - 1);
    }
  };

  const handleSaveProgress = () => {
    const dataToSave = { ...formData, journal: journalId };

    if (questionnaire) {
      updateMutation.mutate(dataToSave);
    } else {
      createMutation.mutate(dataToSave);
    }
  };

  const handleSubmit = () => {
    const dataToSave = { ...formData, journal: journalId, is_complete: true };

    if (questionnaire) {
      updateMutation.mutate(dataToSave);
    } else {
      createMutation.mutate(dataToSave);
    }

    router.push(`/institution/journals/${journalId}`);
  };

  if (isLoading) {
    return (
      <PanelContainer>
        <PanelLoadingSkeleton
          title="Loading Questionnaire"
          description="Please wait while we load the questionnaire"
        />
      </PanelContainer>
    );
  }

  // Initialize form data with existing questionnaire or empty
  if (questionnaire && Object.keys(formData).length === 0) {
    setFormData(questionnaire);
  }

  const CurrentSectionComponent = SECTIONS[currentSection].component;
  const progress = ((currentSection + 1) / SECTIONS.length) * 100;

  return (
    <PanelContainer>
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
              <FileText className="h-8 w-8" />
              Journal Questionnaire
            </h1>
            <p className="text-text-gray mt-1">
              Complete all sections to submit for evaluation
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button variant="outline" onClick={handleSaveProgress}>
              <Save className="mr-2 h-4 w-4" />
              Save Progress
            </Button>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">
              Section {currentSection + 1} of {SECTIONS.length}
            </span>
            <span className="text-sm text-text-gray">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Completeness Badge */}
        {questionnaire && (
          <div className="mt-4 flex items-center gap-2">
            <Badge
              variant={questionnaire.is_complete ? "default" : "secondary"}
              className="text-sm"
            >
              {questionnaire.is_complete ? "Complete" : "In Progress"}
            </Badge>
            <span className="text-sm text-text-gray">
              {questionnaire.completeness_percentage}% of fields completed
            </span>
          </div>
        )}
      </div>

      {/* Section Navigation */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-2">
            {SECTIONS.map((section, index) => (
              <button
                key={section.id}
                onClick={() => setCurrentSection(index)}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                  index === currentSection
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {section.id}. {section.title}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current Section */}
      <Card>
        <CardHeader>
          <CardTitle>
            Section {currentSection + 1}: {SECTIONS[currentSection].title}
          </CardTitle>
          <CardDescription>
            Complete the fields below for this section
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CurrentSectionComponent
            data={formData}
            onChange={handleSectionChange}
          />
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentSection === 0}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>

        <div className="flex gap-2">
          {currentSection === SECTIONS.length - 1 ? (
            <Button onClick={handleSubmit}>Submit Questionnaire</Button>
          ) : (
            <Button onClick={handleNext}>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </PanelContainer>
  );
}
