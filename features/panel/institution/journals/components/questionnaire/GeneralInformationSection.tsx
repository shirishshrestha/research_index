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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  updateSectionData,
  markSectionComplete,
} from "@/store/slices/questionnaireSlice";
import { ChevronRight } from "lucide-react";

export interface SectionFormRef {
  validateAndProceed: () => Promise<boolean>;
}

const generalInformationSchema = questionnaireSchema
  .pick({
    journal_title: true,
    issn: true,
    e_issn: true,
    publisher_name: true,
    publisher_country: true,
    year_first_publication: true,
    publication_frequency: true,
    publication_format: true,
    journal_website_url: true,
    contact_email: true,
  })
  .partial();

type GeneralInformationSchema = z.infer<typeof generalInformationSchema>;

interface GeneralInformationSectionProps {
  onNext: () => void;
  onPrevious?: () => void;
}

export const GeneralInformationSection = forwardRef<
  SectionFormRef,
  GeneralInformationSectionProps
>(({ onNext, onPrevious }, ref) => {
  const dispatch = useAppDispatch();
  const questionnaireData = useAppSelector((state) => state.questionnaire);

  const form = useForm({
    resolver: zodResolver(generalInformationSchema),
    defaultValues: {
      journal_title: questionnaireData.journal_title || "",
      issn: questionnaireData.issn || "",
      e_issn: questionnaireData.e_issn || "",
      publisher_name: questionnaireData.publisher_name || "",
      publisher_country: questionnaireData.publisher_country || "",
      year_first_publication:
        questionnaireData.year_first_publication || new Date().getFullYear(),
      publication_frequency:
        questionnaireData.publication_frequency || "monthly",
      publication_format: questionnaireData.publication_format || "both",
      journal_website_url: questionnaireData.journal_website_url || "",
      contact_email: questionnaireData.contact_email || "",
    },
  });

  // Reset form when questionnaire data changes
  useEffect(() => {
    form.reset({
      journal_title: questionnaireData.journal_title || "",
      issn: questionnaireData.issn || "",
      e_issn: questionnaireData.e_issn || "",
      publisher_name: questionnaireData.publisher_name || "",
      publisher_country: questionnaireData.publisher_country || "",
      year_first_publication:
        questionnaireData.year_first_publication || new Date().getFullYear(),
      publication_frequency:
        questionnaireData.publication_frequency || "monthly",
      publication_format: questionnaireData.publication_format || "both",
      journal_website_url: questionnaireData.journal_website_url || "",
      contact_email: questionnaireData.contact_email || "",
    });
  }, [
    questionnaireData.journal_title,
    questionnaireData.issn,
    questionnaireData.e_issn,
    questionnaireData.publisher_name,
    questionnaireData.publisher_country,
    questionnaireData.year_first_publication,
    questionnaireData.publication_frequency,
    questionnaireData.publication_format,
    questionnaireData.journal_website_url,
    questionnaireData.contact_email,
    form,
  ]);

  // Auto-save to Redux on every change
  useEffect(() => {
    const subscription = form.watch((value) => {
      dispatch(updateSectionData(value as Partial<GeneralInformationSchema>));
    });
    return () => subscription.unsubscribe();
  }, [form, dispatch]);

  const onSubmit = (data: GeneralInformationSchema) => {
    dispatch(updateSectionData(data));
    dispatch(markSectionComplete(0));
    onNext();
  };

  // Expose validation method via ref
  useImperativeHandle(ref, () => ({
    validateAndProceed: async () => {
      const isValid = await form.trigger();
      if (isValid) {
        const data = form.getValues();
        dispatch(updateSectionData(data as any));
        dispatch(markSectionComplete(0));
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
            name="journal_title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Journal Title *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter journal title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="issn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ISSN *</FormLabel>
                <FormControl>
                  <Input placeholder="1234-5678" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="e_issn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-ISSN *</FormLabel>
                <FormControl>
                  <Input placeholder="9876-5432" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="publisher_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Publisher Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter publisher name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="publisher_country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Publisher Country *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter country" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="year_first_publication"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year of First Publication </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="2020"
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
            name="publication_frequency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Publication Frequency </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="biweekly">Bi-weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="bimonthly">Bi-monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="biannual">Bi-annual</SelectItem>
                    <SelectItem value="annual">Annual</SelectItem>
                    <SelectItem value="irregular">Irregular</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="publication_format"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Publication Format </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="print">Print Only</SelectItem>
                    <SelectItem value="online">Online Only</SelectItem>
                    <SelectItem value="both">Both Print and Online</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="journal_website_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Journal Website URL *</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder="https://journal.example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contact_email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Email *</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="editor@journal.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end pt-6 border-t">
          <Button
            type="button"
            onClick={async () => {
              const isValid = await form.trigger();
              if (isValid) {
                const data = form.getValues();
                dispatch(updateSectionData(data as any));
                dispatch(markSectionComplete(0));
                onNext();
              }
            }}
            className="gap-2"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </Form>
  );
});

GeneralInformationSection.displayName = "GeneralInformationSection";
