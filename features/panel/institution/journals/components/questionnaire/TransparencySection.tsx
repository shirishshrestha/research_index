"use client";

import { useEffect, forwardRef, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { ChevronLeft, Send } from "lucide-react";

export interface SectionFormRef {
  validateAndProceed: () => Promise<boolean>;
}

const transparencySchema = questionnaireSchema.pick({
  author_guidelines_available: true,
  peer_review_rules_available: true,
  apcs_clearly_stated: true,
  journal_archive_accessible: true,
  data_is_verifiable: true,
  data_matches_website: true,
  consent_to_evaluation: true,
  completed_by_name: true,
  completed_by_role: true,
});

type TransparencySchema = z.infer<typeof transparencySchema>;

interface TransparencySectionProps {
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

export const TransparencySection = forwardRef<
  SectionFormRef,
  TransparencySectionProps
>(({ onNext, onPrevious, onSubmit: onFinalSubmit, isSubmitting }, ref) => {
  const dispatch = useAppDispatch();
  const questionnaireData = useAppSelector((state) => state.questionnaire);

  const form = useForm({
    resolver: zodResolver(transparencySchema),
    defaultValues: {
      author_guidelines_available:
        questionnaireData.author_guidelines_available || false,
      peer_review_rules_available:
        questionnaireData.peer_review_rules_available || false,
      apcs_clearly_stated: questionnaireData.apcs_clearly_stated || false,
      journal_archive_accessible:
        questionnaireData.journal_archive_accessible || false,
      data_is_verifiable: questionnaireData.data_is_verifiable || false,
      data_matches_website: questionnaireData.data_matches_website || false,
      consent_to_evaluation: questionnaireData.consent_to_evaluation || false,
      completed_by_name: questionnaireData.completed_by_name || "",
      completed_by_role: questionnaireData.completed_by_role || "",
    },
  });

  // Auto-save to Redux on every change
  useEffect(() => {
    const subscription = form.watch((value) => {
      dispatch(updateSectionData(value as Partial<TransparencySchema>));
    });
    return () => subscription.unsubscribe();
  }, [form, dispatch]);

  const onSubmit = (data: TransparencySchema) => {
    dispatch(updateSectionData(data));
    dispatch(markSectionComplete(10));
    onNext();
  };

  // Expose validation method via ref
  useImperativeHandle(ref, () => ({
    validateAndProceed: async () => {
      const isValid = await form.trigger();
      if (isValid) {
        const data = form.getValues();
        dispatch(updateSectionData(data as any));
        dispatch(markSectionComplete(10));
        return true;
      }
      return false;
    },
  }));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormLabel>Website Quality & Transparency</FormLabel>
          <div className="space-y-3">
            <FormField
              control={form.control}
              name="author_guidelines_available"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="cursor-pointer font-normal">
                    Author guidelines are publicly available
                  </FormLabel>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="peer_review_rules_available"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="cursor-pointer font-normal">
                    Peer review rules are publicly available
                  </FormLabel>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="apcs_clearly_stated"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="cursor-pointer font-normal">
                    APCs are clearly stated on website
                  </FormLabel>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="journal_archive_accessible"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="cursor-pointer font-normal">
                    Journal archive is publicly accessible
                  </FormLabel>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="border-t pt-6 space-y-4">
          <FormLabel>Declarations & Verification</FormLabel>
          <div className="space-y-3">
            <FormField
              control={form.control}
              name="data_is_verifiable"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="cursor-pointer font-medium">
                    All data provided is true and verifiable *
                  </FormLabel>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="data_matches_website"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="cursor-pointer font-medium">
                    Data corresponds to information on the journal website *
                  </FormLabel>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="consent_to_evaluation"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="cursor-pointer font-medium">
                    I consent to evaluation and indexing *
                  </FormLabel>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="border-t pt-6 grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="completed_by_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Completed By (Name) *</FormLabel>
                <FormControl>
                  <Input placeholder="Your full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="completed_by_role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role/Position *</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Managing Editor" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-between pt-6 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={onPrevious}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          <Button
            type="button"
            onClick={async () => {
              const isValid = await form.trigger();
              if (isValid) {
                const data = form.getValues();
                dispatch(updateSectionData(data));
                dispatch(markSectionComplete(10));
                onFinalSubmit();
              }
            }}
            disabled={isSubmitting}
            className="gap-2"
          >
            <Send className="w-4 h-4" />
            {isSubmitting ? "Submitting..." : "Submit Questionnaire"}
          </Button>
        </div>
      </form>
    </Form>
  );
});

TransparencySection.displayName = "TransparencySection";
