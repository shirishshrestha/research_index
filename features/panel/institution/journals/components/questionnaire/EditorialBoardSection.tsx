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

const editorialBoardSchema = questionnaireSchema
  .pick({
    editor_in_chief_name: true,
    editor_in_chief_affiliation: true,
    editor_in_chief_country: true,
    editorial_board_members_count: true,
    editorial_board_countries: true,
    foreign_board_members_percentage: true,
    board_details_published: true,
  })
  .partial();

type EditorialBoardSchema = z.infer<typeof editorialBoardSchema>;

interface EditorialBoardSectionProps {
  onNext: () => void;
  onPrevious?: () => void;
}

export const EditorialBoardSection = forwardRef<
  SectionFormRef,
  EditorialBoardSectionProps
>(({ onNext, onPrevious }, ref) => {
  const dispatch = useAppDispatch();
  const questionnaireData = useAppSelector((state) => state.questionnaire);

  const form = useForm({
    resolver: zodResolver(editorialBoardSchema),
    defaultValues: {
      editor_in_chief_name: questionnaireData.editor_in_chief_name || "",
      editor_in_chief_affiliation:
        questionnaireData.editor_in_chief_affiliation || "",
      editor_in_chief_country: questionnaireData.editor_in_chief_country || "",
      editorial_board_members_count:
        questionnaireData.editorial_board_members_count || 0,
      editorial_board_countries:
        questionnaireData.editorial_board_countries || "",
      foreign_board_members_percentage:
        questionnaireData.foreign_board_members_percentage || 0,
      board_details_published:
        questionnaireData.board_details_published || false,
    },
  });

  // Auto-save to Redux on every change
  useEffect(() => {
    const subscription = form.watch((value) => {
      dispatch(updateSectionData(value as Partial<EditorialBoardSchema>));
    });
    return () => subscription.unsubscribe();
  }, [form, dispatch]);

  const onSubmit = (data: EditorialBoardSchema) => {
    dispatch(updateSectionData(data));
    dispatch(markSectionComplete(2));
    onNext();
  };

  // Expose validation method via ref
  useImperativeHandle(ref, () => ({
    validateAndProceed: async () => {
      const isValid = await form.trigger();
      if (isValid) {
        const data = form.getValues();
        dispatch(updateSectionData(data as any));
        dispatch(markSectionComplete(2));
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
            name="editor_in_chief_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Editor-in-Chief Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Dr. John Smith" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="editor_in_chief_affiliation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Editor-in-Chief Affiliation *</FormLabel>
                <FormControl>
                  <Input placeholder="University Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="editor_in_chief_country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Editor-in-Chief Country *</FormLabel>
                <FormControl>
                  <Input placeholder="Country" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="editorial_board_members_count"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Editorial Board Members </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="25"
                    {...field}
                    value={(field.value as number | undefined) ?? ""}
                    onChange={(e) =>
                      field.onChange(parseInt(e.target.value) || 0)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="editorial_board_countries"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Editorial Board Countries </FormLabel>
                <FormControl>
                  <Input placeholder="USA, UK, Germany, France" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="foreign_board_members_percentage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Foreign Board Members (%) </FormLabel>
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
          name="board_details_published"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-2 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="cursor-pointer font-normal">
                Full editorial board details are published on the website
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
                dispatch(markSectionComplete(2));
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

EditorialBoardSection.displayName = "EditorialBoardSection";
