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

const publicationStatisticsSchema = questionnaireSchema
  .pick({
    issues_published_in_year: true,
    all_issues_published_on_time: true,
    articles_published_in_year: true,
    submissions_rejected: true,
    average_acceptance_rate: true,
  })
  .partial();

type PublicationStatisticsSchema = z.infer<typeof publicationStatisticsSchema>;

interface PublicationStatisticsSectionProps {
  onNext: () => void;
  onPrevious?: () => void;
}

export const PublicationStatisticsSection = forwardRef<
  SectionFormRef,
  PublicationStatisticsSectionProps
>(({ onNext, onPrevious }, ref) => {
  const dispatch = useAppDispatch();
  const questionnaireData = useAppSelector((state) => state.questionnaire);

  const form = useForm({
    resolver: zodResolver(publicationStatisticsSchema),
    defaultValues: {
      issues_published_in_year: questionnaireData.issues_published_in_year || 0,
      all_issues_published_on_time:
        questionnaireData.all_issues_published_on_time || false,
      articles_published_in_year:
        questionnaireData.articles_published_in_year || 0,
      submissions_rejected: questionnaireData.submissions_rejected || 0,
      average_acceptance_rate: questionnaireData.average_acceptance_rate || 0,
    },
  });

  // Auto-save to Redux on every change
  useEffect(() => {
    const subscription = form.watch((value) => {
      dispatch(
        updateSectionData(value as Partial<PublicationStatisticsSchema>),
      );
    });
    return () => subscription.unsubscribe();
  }, [form, dispatch]);

  const onSubmit = (data: PublicationStatisticsSchema) => {
    dispatch(updateSectionData(data));
    dispatch(markSectionComplete(5));
    onNext();
  };

  // Expose validation method via ref
  useImperativeHandle(ref, () => ({
    validateAndProceed: async () => {
      const isValid = await form.trigger();
      if (isValid) {
        const data = form.getValues();
        dispatch(updateSectionData(data as any));
        dispatch(markSectionComplete(5));
        return true;
      }
      return false;
    },
  }));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="issues_published_in_year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Issues Published in Year </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="4"
                    {...field}
                    value={(field.value as number | undefined) ?? ""}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? parseInt(e.target.value) : 0,
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="articles_published_in_year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Articles Published in Year </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="120"
                    {...field}
                    value={(field.value as number | undefined) ?? ""}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? parseInt(e.target.value) : 0,
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="submissions_rejected"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Submissions Rejected </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="200"
                    {...field}
                    value={(field.value as number | undefined) ?? ""}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? parseInt(e.target.value) : 0,
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="average_acceptance_rate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Average Acceptance Rate (%) </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    placeholder="37.5"
                    {...field}
                    value={(field.value as number | undefined) ?? ""}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? parseFloat(e.target.value) : 0,
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="all_issues_published_on_time"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-2 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="cursor-pointer font-normal">
                All declared issues were published on time
              </FormLabel>
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
                dispatch(markSectionComplete(5));
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

PublicationStatisticsSection.displayName = "PublicationStatisticsSection";
