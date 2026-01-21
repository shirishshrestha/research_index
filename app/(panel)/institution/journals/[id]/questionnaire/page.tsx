"use client";

import { use, useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { PanelContainer, PanelLoadingSkeleton } from "@/features/shared";
import {
  getJournalQuestionnaire,
  createQuestionnaire,
  updateQuestionnaire,
} from "@/features/panel/institution/journals/api";
import { JournalBreadcrumb } from "@/features/panel/institution/journals/components";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  initializeQuestionnaire,
  setCurrentSection,
  resetQuestionnaire,
} from "@/store/slices/questionnaireSlice";
import { extractErrorMessage } from "@/utils/errorHandling";

// Import questionnaire components
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
  SectionFormRef,
} from "@/features/panel/institution/journals/components/questionnaire";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Save } from "lucide-react";

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
  const dispatch = useAppDispatch();

  const currentSection = useAppSelector(
    (state) => state.questionnaire.currentSection,
  );
  const completedSections = useAppSelector(
    (state) => state.questionnaire.completedSections,
  );
  const questionnaireData = useAppSelector((state) => state.questionnaire);

  // Ref to access current section form validation
  const currentSectionRef = useRef<SectionFormRef>(null);

  // Fetch existing questionnaire if it exists
  const { data: questionnaire, isLoading } = useQuery({
    queryKey: ["questionnaire", journalId],
    queryFn: () => getJournalQuestionnaire(journalId),
    retry: false,
  });

  // Initialize Redux with existing questionnaire data
  useEffect(() => {
    if (questionnaire) {
      dispatch(
        initializeQuestionnaire({
          journalId,
          questionnaireId: questionnaire.id,
          data: questionnaire,
        }),
      );
    } else {
      dispatch(
        initializeQuestionnaire({
          journalId,
        }),
      );
    }
  }, [questionnaire, journalId, dispatch]);

  // Cleanup on unmount - reset questionnaire state
  useEffect(() => {
    return () => {
      dispatch(resetQuestionnaire());
    };
  }, [dispatch]);

  const createMutation = useMutation({
    mutationFn: (data: typeof questionnaireData) =>
      createQuestionnaire(journalId, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["questionnaire", journalId] });
      toast.success("Questionnaire created successfully");
      dispatch(
        initializeQuestionnaire({
          journalId,
          questionnaireId: response.questionnaire.id,
        }),
      );
    },
    onError: (error: unknown) => {
      const errorMessage = extractErrorMessage(
        error,
        "Failed to create questionnaire",
      );
      toast.error(errorMessage);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: typeof questionnaireData) =>
      updateQuestionnaire(questionnaireData.questionnaireId!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questionnaire", journalId] });
      toast.success("Questionnaire saved successfully");
    },
    onError: (error: unknown) => {
      const errorMessage = extractErrorMessage(
        error,
        "Failed to save questionnaire",
      );
      toast.error(errorMessage);
    },
  });

  const submitMutation = useMutation({
    mutationFn: (data: typeof questionnaireData) =>
      questionnaireData.questionnaireId
        ? updateQuestionnaire(questionnaireData.questionnaireId, data)
        : createQuestionnaire(journalId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questionnaire", journalId] });
      toast.success("Questionnaire submitted successfully!");
      setTimeout(() => {
        dispatch(resetQuestionnaire());
        router.push(`/institution/journals/${journalId}`);
      }, 1000);
    },
    onError: (error: unknown) => {
      const errorMessage = extractErrorMessage(
        error,
        "Failed to submit questionnaire",
      );
      toast.error(errorMessage);
      // Do NOT redirect on error - user stays on form to fix issues
    },
  });

  const handleNavigateToSection = (index: number) => {
    // Allow navigation to completed sections or the next incomplete section
    if (
      completedSections.includes(index) ||
      index === 0 ||
      completedSections.includes(index - 1)
    ) {
      dispatch(setCurrentSection(index));
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      toast.error("Please complete previous sections first");
    }
  };

  const handleNext = async () => {
    // Validate current section before proceeding
    if (currentSectionRef.current) {
      const isValid = await currentSectionRef.current.validateAndProceed();
      if (!isValid) {
        toast.error("Please complete all required fields correctly");
        return;
      }
    }

    if (currentSection < SECTIONS.length - 1) {
      dispatch(setCurrentSection(currentSection + 1));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      dispatch(setCurrentSection(currentSection - 1));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSaveProgress = () => {
    const dataToSave = {
      ...questionnaireData,
      journal: journalId,
    };

    if (questionnaireData.questionnaireId) {
      updateMutation.mutate(dataToSave);
    } else {
      createMutation.mutate(dataToSave);
    }
  };

  const handleFinalSubmit = () => {
    // Check if all sections are completed
    const allCompleted = SECTIONS.every((_, index) =>
      completedSections.includes(index),
    );

    if (!allCompleted) {
      toast.error("Please complete all sections before submitting");
      return;
    }

    const dataToSave = {
      ...questionnaireData,
      journal: journalId,
      is_complete: true,
    };

    submitMutation.mutate(dataToSave);
  };

  const CurrentSectionComponent = SECTIONS[currentSection].component;
  const isLastSection = currentSection === SECTIONS.length - 1;

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

  return (
    <PanelContainer>
      <JournalBreadcrumb journalId={journalId} currentPage="questionnaire" />

      {/* Header with Save Progress */}
      <Card className="p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">
              Journal Quality Questionnaire
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Complete all sections to submit your journal for evaluation
            </p>
          </div>
          {/* <Button
            onClick={handleSaveProgress}
            disabled={createMutation.isPending || updateMutation.isPending}
            variant="outline"
          >
            <Save className="w-4 h-4 mr-2" />
            {createMutation.isPending || updateMutation.isPending
              ? "Saving..."
              : "Save Progress"}
          </Button> */}
        </div>
      </Card>

      {/* Progress Indicator */}
      <Card className="p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">
            Section {currentSection + 1} of {SECTIONS.length}
          </span>
          <span className="text-sm text-muted-foreground">
            {completedSections.length} of {SECTIONS.length} completed
          </span>
        </div>
        <div className="w-full bg-text-gray/10 rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all"
            style={{
              width: `${(completedSections.length / SECTIONS.length) * 100}%`,
            }}
          />
        </div>
      </Card>

      {/* Section Navigator */}
      <Card className="p-4 mb-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {SECTIONS.map((section, index) => {
            const isCompleted = completedSections.includes(index);
            const isCurrent = currentSection === index;
            const isAccessible =
              isCompleted ||
              index === 0 ||
              completedSections.includes(index - 1);

            return (
              <button
                key={section.id}
                onClick={() => handleNavigateToSection(index)}
                disabled={!isAccessible}
                className={`p-3 text-left rounded-lg border transition-all ${
                  isCurrent
                    ? "border-primary bg-primary/10 font-semibold"
                    : isCompleted
                      ? "border-green-500 bg-green-50 dark:bg-green-950"
                      : isAccessible
                        ? "border-border hover:border-primary/50"
                        : "border-border opacity-50 cursor-not-allowed"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{index + 1}.</span>
                  <span className="text-sm">{section.title}</span>
                </div>
                {isCompleted && (
                  <span className="text-xs text-green-600 dark:text-green-400">
                    ✓ Complete
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </Card>

      {/* Current Section */}
      <Card className="p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          {SECTIONS[currentSection].title}
        </h2>
        {currentSection === 0 && (
          <GeneralInformationSection
            ref={currentSectionRef}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        )}
        {currentSection === 1 && (
          <SubjectAreaSection
            ref={currentSectionRef}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        )}
        {currentSection === 2 && (
          <EditorialBoardSection
            ref={currentSectionRef}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        )}
        {currentSection === 3 && (
          <PeerReviewSection
            ref={currentSectionRef}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        )}
        {currentSection === 4 && (
          <PublicationEthicsSection
            ref={currentSectionRef}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        )}
        {currentSection === 5 && (
          <PublicationStatisticsSection
            ref={currentSectionRef}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        )}
        {currentSection === 6 && (
          <GeographicDistributionSection
            ref={currentSectionRef}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        )}
        {currentSection === 7 && (
          <OpenAccessSection
            ref={currentSectionRef}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        )}
        {currentSection === 8 && (
          <DigitalInfrastructureSection
            ref={currentSectionRef}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        )}
        {currentSection === 9 && (
          <IndexingSection
            ref={currentSectionRef}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        )}
        {currentSection === 10 && (
          <TransparencySection
            ref={currentSectionRef}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onSubmit={handleFinalSubmit}
            isSubmitting={submitMutation.isPending}
          />
        )}
      </Card>
    </PanelContainer>
  );
}
