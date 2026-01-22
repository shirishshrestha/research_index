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

export interface SectionFormRef {
  validateAndProceed: () => Promise<boolean>;
}

const digitalInfrastructureSchema = questionnaireSchema
  .pick({
    assigns_dois: true,
    doi_registration_agency: true,
    metadata_standards_used: true,
    uses_online_submission_system: true,
    submission_system_name: true,
    digital_archiving_system: true,
    other_archiving_system: true,
  })
  .partial();

type DigitalInfrastructureSchema = z.infer<typeof digitalInfrastructureSchema>;

interface DigitalInfrastructureSectionProps {
  onNext: () => void;
  onPrevious?: () => void;
}

export const DigitalInfrastructureSection = forwardRef<
  SectionFormRef,
  DigitalInfrastructureSectionProps
>(({ onNext, onPrevious }, ref) => {
  const dispatch = useAppDispatch();
  const questionnaireData = useAppSelector((state) => state.questionnaire);

  const form = useForm({
    resolver: zodResolver(digitalInfrastructureSchema),
    defaultValues: {
      assigns_dois: questionnaireData.assigns_dois || false,
      doi_registration_agency: questionnaireData.doi_registration_agency || "",
      metadata_standards_used: questionnaireData.metadata_standards_used || "",
      uses_online_submission_system:
        questionnaireData.uses_online_submission_system || false,
      submission_system_name: questionnaireData.submission_system_name || "",
      digital_archiving_system:
        questionnaireData.digital_archiving_system || "",
      other_archiving_system: questionnaireData.other_archiving_system || "",
    },
  });

  // Auto-save to Redux on every change
  useEffect(() => {
    const subscription = form.watch((value) => {
      dispatch(
        updateSectionData(value as Partial<DigitalInfrastructureSchema>),
      );
    });
    return () => subscription.unsubscribe();
  }, [form, dispatch]);

  const onSubmit = (data: DigitalInfrastructureSchema) => {
    dispatch(updateSectionData(data));
    dispatch(markSectionComplete(8));
    onNext();
  };

  // Expose validation method via ref
  useImperativeHandle(ref, () => ({
    validateAndProceed: async () => {
      const isValid = await form.trigger();
      if (isValid) {
        const data = form.getValues();
        dispatch(updateSectionData(data as any));
        dispatch(markSectionComplete(8));
        return true;
      }
      return false;
    },
  }));

  const assignsDois = form.watch("assigns_dois");
  const usesOnlineSubmissionSystem = form.watch(
    "uses_online_submission_system",
  );
  const digitalArchivingSystem = form.watch("digital_archiving_system");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="assigns_dois"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="cursor-pointer font-normal">
                  Journal assigns DOIs to articles
                </FormLabel>
              </FormItem>
            )}
          />

          {assignsDois && (
            <FormField
              control={form.control}
              name="doi_registration_agency"
              render={({ field }) => (
                <FormItem className="ml-6">
                  <FormLabel>DOI Registration Agency</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Crossref" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        <FormField
          control={form.control}
          name="metadata_standards_used"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Metadata Standards Used</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Dublin Core, JATS" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="uses_online_submission_system"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="cursor-pointer font-normal">
                  Uses online submission system
                </FormLabel>
              </FormItem>
            )}
          />

          {usesOnlineSubmissionSystem && (
            <FormField
              control={form.control}
              name="submission_system_name"
              render={({ field }) => (
                <FormItem className="ml-6">
                  <FormLabel>Submission System Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Open Journal Systems"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="digital_archiving_system"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Digital Archiving System</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select system" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="lockss">LOCKSS</SelectItem>
                    <SelectItem value="clockss">CLOCKSS</SelectItem>
                    <SelectItem value="portico">Portico</SelectItem>
                    <SelectItem value="institutional">
                      Institutional repository
                    </SelectItem>
                    <SelectItem value="pmc">PubMed Central</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {digitalArchivingSystem === "other" && (
            <FormField
              control={form.control}
              name="other_archiving_system"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Other Archiving System</FormLabel>
                  <FormControl>
                    <Input placeholder="Specify other system" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
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
                dispatch(markSectionComplete(8));
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

DigitalInfrastructureSection.displayName = "DigitalInfrastructureSection";
