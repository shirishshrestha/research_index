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

const geographicDistributionSchema = questionnaireSchema
  .pick({
    total_authors_in_year: true,
    foreign_authors_count: true,
    author_countries_count: true,
    foreign_authors_percentage: true,
    encourages_international_submissions: true,
  })
  .partial();

type GeographicDistributionSchema = z.infer<
  typeof geographicDistributionSchema
>;

interface GeographicDistributionSectionProps {
  onNext: () => void;
  onPrevious?: () => void;
}

export const GeographicDistributionSection = forwardRef<
  SectionFormRef,
  GeographicDistributionSectionProps
>(({ onNext, onPrevious }, ref) => {
  const dispatch = useAppDispatch();
  const questionnaireData = useAppSelector((state) => state.questionnaire);

  const form = useForm({
    resolver: zodResolver(geographicDistributionSchema),
    defaultValues: {
      total_authors_in_year: questionnaireData.total_authors_in_year || 0,
      foreign_authors_count: questionnaireData.foreign_authors_count || 0,
      author_countries_count: questionnaireData.author_countries_count || 0,
      foreign_authors_percentage:
        questionnaireData.foreign_authors_percentage || 0,
      encourages_international_submissions:
        questionnaireData.encourages_international_submissions || false,
    },
  });

  // Auto-save to Redux on every change
  useEffect(() => {
    const subscription = form.watch((value) => {
      dispatch(
        updateSectionData(value as Partial<GeographicDistributionSchema>),
      );
    });
    return () => subscription.unsubscribe();
  }, [form, dispatch]);

  const onSubmit = (data: GeographicDistributionSchema) => {
    dispatch(updateSectionData(data));
    dispatch(markSectionComplete(6));
    onNext();
  };

  // Expose validation method via ref
  useImperativeHandle(ref, () => ({
    validateAndProceed: async () => {
      const isValid = await form.trigger();
      if (isValid) {
        const data = form.getValues();
        dispatch(updateSectionData(data as any));
        dispatch(markSectionComplete(6));
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
            name="total_authors_in_year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Authors in Year </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="350"
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
            name="foreign_authors_count"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Foreign Authors Count </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="210"
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
            name="author_countries_count"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Countries Represented </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="45"
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
            name="foreign_authors_percentage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Foreign Authors Percentage (%) </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    placeholder="60.0"
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
          name="encourages_international_submissions"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-2 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="cursor-pointer font-normal">
                Journal encourages international submissions
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
                dispatch(markSectionComplete(6));
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

GeographicDistributionSection.displayName = "GeographicDistributionSection";
