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

const peerReviewSchema = questionnaireSchema
  .pick({
    uses_peer_review: true,
    peer_review_type: true,
    reviewers_per_manuscript: true,
    average_review_time_weeks: true,
    reviewers_external: true,
    peer_review_procedure_published: true,
    peer_review_procedure_url: true,
  })
  .partial();

type PeerReviewSchema = z.infer<typeof peerReviewSchema>;

interface PeerReviewSectionProps {
  onNext: () => void;
  onPrevious?: () => void;
}

export const PeerReviewSection = forwardRef<
  SectionFormRef,
  PeerReviewSectionProps
>(({ onNext, onPrevious }, ref) => {
  const dispatch = useAppDispatch();
  const questionnaireData = useAppSelector((state) => state.questionnaire);

  const form = useForm({
    resolver: zodResolver(peerReviewSchema),
    defaultValues: {
      uses_peer_review: questionnaireData.uses_peer_review || false,
      peer_review_type: questionnaireData.peer_review_type || "",
      reviewers_per_manuscript:
        questionnaireData.reviewers_per_manuscript || null,
      average_review_time_weeks:
        questionnaireData.average_review_time_weeks || null,
      reviewers_external: questionnaireData.reviewers_external || false,
      peer_review_procedure_published:
        questionnaireData.peer_review_procedure_published || false,
      peer_review_procedure_url:
        questionnaireData.peer_review_procedure_url || "",
    },
  });

  // Auto-save to Redux on every change
  useEffect(() => {
    const subscription = form.watch((value) => {
      dispatch(updateSectionData(value as Partial<PeerReviewSchema>));
    });
    return () => subscription.unsubscribe();
  }, [form, dispatch]);

  const onSubmit = (data: PeerReviewSchema) => {
    dispatch(updateSectionData(data));
    dispatch(markSectionComplete(3));
    onNext();
  };

  // Expose validation method via ref
  useImperativeHandle(ref, () => ({
    validateAndProceed: async () => {
      const isValid = await form.trigger();
      if (isValid) {
        const data = form.getValues();
        dispatch(updateSectionData(data as any));
        dispatch(markSectionComplete(3));
        return true;
      }
      return false;
    },
  }));

  const usesPeerReview = form.watch("uses_peer_review");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="uses_peer_review"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-2 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="cursor-pointer font-normal">
                Journal uses peer review
              </FormLabel>
            </FormItem>
          )}
        />

        {usesPeerReview && (
          <>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="peer_review_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Peer Review Type</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="single_blind">
                          Single-blind
                        </SelectItem>
                        <SelectItem value="double_blind">
                          Double-blind
                        </SelectItem>
                        <SelectItem value="open">Open peer review</SelectItem>
                        <SelectItem value="post_publication">
                          Post-publication review
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="reviewers_per_manuscript"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reviewers per Manuscript</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="2"
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

              <FormField
                control={form.control}
                name="average_review_time_weeks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Average Review Time (weeks)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="4"
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

              <FormField
                control={form.control}
                name="peer_review_procedure_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Peer Review Procedure URL</FormLabel>
                    <FormControl>
                      <Input type="url" placeholder="https://..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-3">
              <FormField
                control={form.control}
                name="reviewers_external"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="cursor-pointer font-normal">
                      Reviewers are external to the authors&apos; institutions
                    </FormLabel>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="peer_review_procedure_published"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="cursor-pointer font-normal">
                      Peer review procedure is described on the website
                    </FormLabel>
                  </FormItem>
                )}
              />
            </div>
          </>
        )}

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
                dispatch(markSectionComplete(3));
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

PeerReviewSection.displayName = "PeerReviewSection";
