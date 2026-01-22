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
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  updateSectionData,
  markSectionComplete,
} from "@/store/slices/questionnaireSlice";
import { Button } from "@/components/ui/button";

export interface SectionFormRef {
  validateAndProceed: () => Promise<boolean>;
}

const subjectAreaSchema = questionnaireSchema
  .pick({
    main_discipline: true,
    secondary_disciplines: true,
    aims_and_scope: true,
    publishes_original_research: true,
    publishes_review_articles: true,
    publishes_case_studies: true,
    publishes_short_communications: true,
    publishes_other: true,
  })
  .partial();

type SubjectAreaSchema = z.infer<typeof subjectAreaSchema>;

interface SubjectAreaSectionProps {
  onNext: () => void;
  onPrevious?: () => void;
}

export const SubjectAreaSection = forwardRef<
  SectionFormRef,
  SubjectAreaSectionProps
>(({ onNext, onPrevious }, ref) => {
  const dispatch = useAppDispatch();
  const questionnaireData = useAppSelector((state) => state.questionnaire);

  const form = useForm({
    resolver: zodResolver(subjectAreaSchema),
    defaultValues: {
      main_discipline: questionnaireData.main_discipline || "",
      secondary_disciplines: questionnaireData.secondary_disciplines || "",
      aims_and_scope: questionnaireData.aims_and_scope || "",
      publishes_original_research:
        questionnaireData.publishes_original_research || false,
      publishes_review_articles:
        questionnaireData.publishes_review_articles || false,
      publishes_case_studies: questionnaireData.publishes_case_studies || false,
      publishes_short_communications:
        questionnaireData.publishes_short_communications || false,
      publishes_other: questionnaireData.publishes_other || "",
    },
  });

  useEffect(() => {
    const subscription = form.watch((value) => {
      dispatch(updateSectionData(value as Partial<SubjectAreaSchema>));
    });
    return () => subscription.unsubscribe();
  }, [form, dispatch]);

  const onSubmit = (data: SubjectAreaSchema) => {
    dispatch(updateSectionData(data));
    dispatch(markSectionComplete(1));
    onNext();
  };

  // Expose validation method via ref
  useImperativeHandle(ref, () => ({
    validateAndProceed: async () => {
      const isValid = await form.trigger();
      if (isValid) {
        const data = form.getValues();
        dispatch(updateSectionData(data as any));
        dispatch(markSectionComplete(1));
        return true;
      }
      return false;
    },
  }));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="main_discipline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Main Scientific Discipline *</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Computer Science" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="secondary_disciplines"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Secondary Disciplines</FormLabel>
              <FormControl>
                <Input placeholder="Comma-separated list" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="aims_and_scope"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Aims and Scope *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the aims and scope of the journal"
                  className="min-h-30"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <FormLabel>Types of Articles Published</FormLabel>

          <FormField
            control={form.control}
            name="publishes_original_research"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="cursor-pointer font-normal">
                  Original Research Articles
                </FormLabel>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="publishes_review_articles"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="cursor-pointer font-normal">
                  Review Articles
                </FormLabel>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="publishes_case_studies"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="cursor-pointer font-normal">
                  Case Studies
                </FormLabel>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="publishes_short_communications"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="cursor-pointer font-normal">
                  Short Communications
                </FormLabel>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="publishes_other"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Other Types of Articles</FormLabel>
              <FormControl>
                <Input placeholder="Specify other article types" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
                dispatch(markSectionComplete(1));
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

SubjectAreaSection.displayName = "SubjectAreaSection";
