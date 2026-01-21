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
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  updateSectionData,
  markSectionComplete,
} from "@/store/slices/questionnaireSlice";

export interface SectionFormRef {
  validateAndProceed: () => Promise<boolean>;
}

const indexingSchema = questionnaireSchema
  .pick({
    indexed_databases: true,
    year_first_indexed: true,
    indexed_in_google_scholar: true,
    indexed_in_doaj: true,
    indexed_in_scopus: true,
    indexed_in_web_of_science: true,
    abstracting_services: true,
  })
  .partial();

type IndexingSchema = z.infer<typeof indexingSchema>;

interface IndexingSectionProps {
  onNext: () => void;
  onPrevious?: () => void;
}

export const IndexingSection = forwardRef<SectionFormRef, IndexingSectionProps>(
  ({ onNext, onPrevious }, ref) => {
    const dispatch = useAppDispatch();
    const questionnaireData = useAppSelector((state) => state.questionnaire);

    const form = useForm({
      resolver: zodResolver(indexingSchema),
      defaultValues: {
        indexed_databases: questionnaireData.indexed_databases || "",
        year_first_indexed: questionnaireData.year_first_indexed || null,
        indexed_in_google_scholar:
          questionnaireData.indexed_in_google_scholar || false,
        indexed_in_doaj: questionnaireData.indexed_in_doaj || false,
        indexed_in_scopus: questionnaireData.indexed_in_scopus || false,
        indexed_in_web_of_science:
          questionnaireData.indexed_in_web_of_science || false,
        abstracting_services: questionnaireData.abstracting_services || "",
      },
    });

    // Auto-save to Redux on every change
    useEffect(() => {
      const subscription = form.watch((value) => {
        dispatch(updateSectionData(value as Partial<IndexingSchema>));
      });
      return () => subscription.unsubscribe();
    }, [form, dispatch]);

    const onSubmit = (data: IndexingSchema) => {
      dispatch(updateSectionData(data));
      dispatch(markSectionComplete(9));
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
          <FormField
            control={form.control}
            name="indexed_databases"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Indexed Databases </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Comma-separated list of databases, e.g., Scopus, Web of Science, Google Scholar"
                    className="min-h-20"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="year_first_indexed"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year First Indexed</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="2021"
                    value={(field.value as number | null | undefined) ?? ""}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? parseInt(e.target.value) : null,
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <FormLabel>Major Indexing Services</FormLabel>
            <div className="space-y-3">
              <FormField
                control={form.control}
                name="indexed_in_google_scholar"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="cursor-pointer font-normal">
                      Google Scholar
                    </FormLabel>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="indexed_in_doaj"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="cursor-pointer font-normal">
                      DOAJ (Directory of Open Access Journals)
                    </FormLabel>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="indexed_in_scopus"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="cursor-pointer font-normal">
                      Scopus
                    </FormLabel>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="indexed_in_web_of_science"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="cursor-pointer font-normal">
                      Web of Science
                    </FormLabel>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="abstracting_services"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Abstracting Services</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Comma-separated list, e.g., Chemical Abstracts, INSPEC"
                    className="min-h-20"
                    {...field}
                  />
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
                  dispatch(markSectionComplete(9));
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
  },
);

IndexingSection.displayName = "IndexingSection";
