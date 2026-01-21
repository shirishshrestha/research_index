"use client";

import { useEffect, forwardRef, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { questionnaireSchema } from "../../schemas/questionnaireSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  updateSectionData,
  markSectionComplete,
} from "@/store/slices/questionnaireSlice";

export interface SectionFormRef {
  validateAndProceed: () => Promise<boolean>;
}

const publicationEthicsSchema = questionnaireSchema
  .pick({
    follows_publication_ethics: true,
    ethics_based_on_cope: true,
    ethics_based_on_icmje: true,
    ethics_other_guidelines: true,
    uses_plagiarism_detection: true,
    plagiarism_software_name: true,
    has_retraction_policy: true,
    retraction_policy_url: true,
    has_conflict_of_interest_policy: true,
    conflict_of_interest_policy_url: true,
  })
  .partial();

type PublicationEthicsSchema = z.infer<typeof publicationEthicsSchema>;

interface PublicationEthicsSectionProps {
  onNext: () => void;
  onPrevious?: () => void;
}

export const PublicationEthicsSection = forwardRef<
  SectionFormRef,
  PublicationEthicsSectionProps
>(({ onNext, onPrevious }, ref) => {
  const dispatch = useAppDispatch();
  const questionnaireData = useAppSelector((state) => state.questionnaire);

  const form = useForm({
    resolver: zodResolver(publicationEthicsSchema),
    defaultValues: {
      follows_publication_ethics:
        questionnaireData.follows_publication_ethics || false,
      ethics_based_on_cope: questionnaireData.ethics_based_on_cope || false,
      ethics_based_on_icmje: questionnaireData.ethics_based_on_icmje || false,
      ethics_other_guidelines: questionnaireData.ethics_other_guidelines || "",
      uses_plagiarism_detection:
        questionnaireData.uses_plagiarism_detection || false,
      plagiarism_software_name:
        questionnaireData.plagiarism_software_name || "",
      has_retraction_policy: questionnaireData.has_retraction_policy || false,
      retraction_policy_url: questionnaireData.retraction_policy_url || "",
      has_conflict_of_interest_policy:
        questionnaireData.has_conflict_of_interest_policy || false,
      conflict_of_interest_policy_url:
        questionnaireData.conflict_of_interest_policy_url || "",
    },
  });

  // Auto-save to Redux on every change
  useEffect(() => {
    const subscription = form.watch((value) => {
      dispatch(updateSectionData(value as Partial<PublicationEthicsSchema>));
    });
    return () => subscription.unsubscribe();
  }, [form, dispatch]);

  const onSubmit = (data: PublicationEthicsSchema) => {
    dispatch(updateSectionData(data));
    dispatch(markSectionComplete(4));
    onNext();
  };

  // Expose validation method via ref
  useImperativeHandle(ref, () => ({
    validateAndProceed: async () => {
      const isValid = await form.trigger();
      if (isValid) {
        const data = form.getValues();
        dispatch(updateSectionData(data as any));
        dispatch(markSectionComplete(4));
        return true;
      }
      return false;
    },
  }));

  const usesPlagiarismDetection = form.watch("uses_plagiarism_detection");
  const hasRetractionPolicy = form.watch("has_retraction_policy");
  const hasConflictOfInterestPolicy = form.watch(
    "has_conflict_of_interest_policy",
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="follows_publication_ethics"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-2 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="cursor-pointer font-normal">
                Journal follows publication ethics guidelines
              </FormLabel>
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <FormLabel>Ethics Guidelines Based On</FormLabel>
          <div className="space-y-3">
            <FormField
              control={form.control}
              name="ethics_based_on_cope"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="cursor-pointer font-normal">
                    COPE (Committee on Publication Ethics)
                  </FormLabel>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ethics_based_on_icmje"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="cursor-pointer font-normal">
                    ICMJE (International Committee of Medical Journal Editors)
                  </FormLabel>
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="ethics_other_guidelines"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Other Ethics Guidelines</FormLabel>
              <FormControl>
                <Input placeholder="Specify other guidelines" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <FormField
              control={form.control}
              name="uses_plagiarism_detection"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="cursor-pointer font-normal">
                    Uses plagiarism detection
                  </FormLabel>
                </FormItem>
              )}
            />

            {usesPlagiarismDetection && (
              <FormField
                control={form.control}
                name="plagiarism_software_name"
                render={({ field }) => (
                  <FormItem className="ml-6">
                    <FormLabel>Software Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., iThenticate" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="has_retraction_policy"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="cursor-pointer font-normal">
                    Has retraction policy
                  </FormLabel>
                </FormItem>
              )}
            />

            {hasRetractionPolicy && (
              <FormField
                control={form.control}
                name="retraction_policy_url"
                render={({ field }) => (
                  <FormItem className="ml-6">
                    <FormControl>
                      <Input type="url" placeholder="Policy URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>

          <div className="space-y-2">
            <FormField
              control={form.control}
              name="has_conflict_of_interest_policy"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="cursor-pointer font-normal">
                    Has conflict of interest policy
                  </FormLabel>
                </FormItem>
              )}
            />

            {hasConflictOfInterestPolicy && (
              <FormField
                control={form.control}
                name="conflict_of_interest_policy_url"
                render={({ field }) => (
                  <FormItem className="ml-6">
                    <FormControl>
                      <Input type="url" placeholder="Policy URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
        </div>

        <div className="flex justify-between pt-6 border-t">
          {onPrevious && (
            <Button
              type="button"
              variant="outline"
              onClick={onPrevious}
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
          )}

          <Button
            type="button"
            onClick={async () => {
              const isValid = await form.trigger();
              if (isValid) {
                const data = form.getValues();
                dispatch(updateSectionData(data as any));
                dispatch(markSectionComplete(4));
                onNext();
              }
            }}
            className={`gap-2 ${!onPrevious ? "ml-auto" : ""}`}
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </Form>
  );
});

PublicationEthicsSection.displayName = "PublicationEthicsSection";
