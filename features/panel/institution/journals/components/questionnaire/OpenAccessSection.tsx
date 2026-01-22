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

const openAccessSchema = questionnaireSchema
  .pick({
    is_open_access: true,
    oa_model: true,
    has_apc: true,
    apc_amount: true,
    apc_currency: true,
    license_type: true,
  })
  .partial();

type OpenAccessSchema = z.infer<typeof openAccessSchema>;

interface OpenAccessSectionProps {
  onNext: () => void;
  onPrevious?: () => void;
}

export const OpenAccessSection = forwardRef<
  SectionFormRef,
  OpenAccessSectionProps
>(({ onNext, onPrevious }, ref) => {
  const dispatch = useAppDispatch();
  const questionnaireData = useAppSelector((state) => state.questionnaire);

  const form = useForm({
    resolver: zodResolver(openAccessSchema),
    defaultValues: {
      is_open_access: questionnaireData.is_open_access || false,
      oa_model: questionnaireData.oa_model || "",
      has_apc: questionnaireData.has_apc || false,
      apc_amount: questionnaireData.apc_amount || null,
      apc_currency: questionnaireData.apc_currency || "USD",
      license_type: questionnaireData.license_type || "",
    },
  });

  // Auto-save to Redux on every change
  useEffect(() => {
    const subscription = form.watch((value) => {
      dispatch(updateSectionData(value as Partial<OpenAccessSchema>));
    });
    return () => subscription.unsubscribe();
  }, [form, dispatch]);

  const onSubmit = (data: OpenAccessSchema) => {
    dispatch(updateSectionData(data));
    dispatch(markSectionComplete(7));
    onNext();
  };

  // Expose validation method via ref
  useImperativeHandle(ref, () => ({
    validateAndProceed: async () => {
      const isValid = await form.trigger();
      if (isValid) {
        const data = form.getValues();
        dispatch(updateSectionData(data as any));
        dispatch(markSectionComplete(7));
        return true;
      }
      return false;
    },
  }));

  const isOpenAccess = form.watch("is_open_access");
  const hasApc = form.watch("has_apc");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="is_open_access"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-2 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="cursor-pointer font-normal">
                Journal is Open Access
              </FormLabel>
            </FormItem>
          )}
        />

        {isOpenAccess && (
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="oa_model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Open Access Model</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select model" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="gold">Gold OA</SelectItem>
                      <SelectItem value="hybrid">Hybrid OA</SelectItem>
                      <SelectItem value="diamond">
                        Diamond OA (no fees)
                      </SelectItem>
                      <SelectItem value="green">Green OA</SelectItem>
                      <SelectItem value="bronze">Bronze OA</SelectItem>
                      <SelectItem value="not_oa">Not Open Access</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="license_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>License Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select license" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="cc_by">CC BY</SelectItem>
                      <SelectItem value="cc_by_sa">CC BY-SA</SelectItem>
                      <SelectItem value="cc_by_nc">CC BY-NC</SelectItem>
                      <SelectItem value="cc_by_nc_sa">CC BY-NC-SA</SelectItem>
                      <SelectItem value="cc_by_nd">CC BY-ND</SelectItem>
                      <SelectItem value="cc_by_nc_nd">CC BY-NC-ND</SelectItem>
                      <SelectItem value="cc0">CC0 (Public Domain)</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="has_apc"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="cursor-pointer font-normal">
                  Charges Article Processing Charge (APC)
                </FormLabel>
              </FormItem>
            )}
          />

          {hasApc && (
            <div className="grid gap-4 md:grid-cols-2 ml-6">
              <FormField
                control={form.control}
                name="apc_amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>APC Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="2000.00"
                        value={(field.value as number | null | undefined) ?? ""}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? parseFloat(e.target.value) : null,
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
                name="apc_currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Currency</FormLabel>
                    <FormControl>
                      <Input placeholder="USD" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
                dispatch(markSectionComplete(7));
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

OpenAccessSection.displayName = "OpenAccessSection";
