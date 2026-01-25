"use client";

import * as React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import { FormInputField } from "@/components/form/FormInputField";
import { FormTextareaField } from "@/components/form/FormTextareaField";
import { FormSelectField } from "@/components/form/FormSelectField";
import { useForm, useWatch, useFieldArray } from "react-hook-form";
import {
  useCreatePublicationMutation,
  useUpdatePublicationMutation,
  usePublicJournalsQuery,
  useJournalIssuesQuery,
} from "../hooks";
import { publicationSchema, type PublicationFormSchema } from "../schema";
import type { Publication } from "../types";
import {
  PUBLICATION_TYPE_OPTIONS,
  MESH_TERM_TYPE_OPTIONS,
  LINK_OUT_TYPE_OPTIONS,
} from "../constants";
import { SquarePen, Plus, X, Upload } from "lucide-react";
import { useTopicTreeQuery } from "@/features/panel/admin/topics/hooks/queries";
import type {
  Topic,
  TopicBranch as TopicBranchType,
} from "@/features/general/topics/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  MultiSelect,
  MultiSelectTrigger,
  MultiSelectValue,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
} from "@/components/ui/multi-select";

// Helper to flatten nested branches recursively
interface BranchNode {
  id: number;
  name: string;
  children?: BranchNode[];
}

const getAllBranches = (branches: BranchNode[]): BranchNode[] => {
  const result: BranchNode[] = [];
  const traverse = (branchList: BranchNode[]) => {
    branchList.forEach((branch) => {
      result.push(branch);
      if (branch.children && Array.isArray(branch.children)) {
        traverse(branch.children);
      }
    });
  };
  traverse(branches);
  return result;
};

export function PublicationFormDialog({
  publication,
  onSuccess,
}: {
  publication?: Publication;
  onSuccess?: () => void;
}) {
  const isEdit = Boolean(publication);
  const [open, setOpen] = React.useState(false);
  const [pdfFile, setPdfFile] = React.useState<File | null>(null);

  const { data: topicsTree } = useTopicTreeQuery(undefined, { enabled: open });
  const { data: journals, isPending: journalsLoading } = usePublicJournalsQuery(
    {
      enabled: open,
    },
  );

  const form = useForm({
    resolver: zodResolver(publicationSchema),
    mode: "onChange" as const,
    defaultValues: {
      title: publication?.title ?? "",
      abstract: publication?.abstract ?? "",
      publication_type: publication?.publication_type ?? "journal_article",
      doi: publication?.doi ?? "",
      published_date: publication?.published_date ?? "",
      journal: publication?.journal ?? null,
      issue: publication?.issue ?? null,
      pages: publication?.pages ?? "",
      publisher: publication?.publisher ?? "",
      co_authors: publication?.co_authors ?? "",
      pubmed_id: publication?.pubmed_id ?? "",
      arxiv_id: publication?.arxiv_id ?? "",
      pubmed_central_id: publication?.pubmed_central_id ?? "",
      is_published: publication?.is_published ?? true,
      topic_branch: publication?.topic_branch?.id ?? null,
      erratum_from: publication?.erratum_from ?? null,
      mesh_terms_data:
        publication?.mesh_terms?.map((t) => ({
          term: t.term,
          term_type: t.term_type,
        })) ?? [],
      link_outs_data:
        publication?.link_outs?.map((l) => ({
          link_type: l.link_type,
          url: l.url,
          description: l.description ?? "",
        })) ?? [],
    },
  });

  // Watch journal selection to fetch issues
  const selectedJournalId = useWatch({
    control: form.control,
    name: "journal",
  });
  // Fetch issues for the selected journal (works for both create and edit modes)
  const { data: issues, isPending: issuesLoading } = useJournalIssuesQuery(
    selectedJournalId ? Number(selectedJournalId) : undefined,
  );

  const {
    fields: meshTermsFields,
    append: appendMeshTerm,
    remove: removeMeshTerm,
  } = useFieldArray({
    control: form.control,
    name: "mesh_terms_data",
  });

  const {
    fields: linkOutsFields,
    append: appendLinkOut,
    remove: removeLinkOut,
  } = useFieldArray({
    control: form.control,
    name: "link_outs_data",
  });

  const create = useCreatePublicationMutation({
    onSuccess: () => {
      form.reset();
      setPdfFile(null);
      setOpen(false);
      onSuccess?.();
    },
  });

  const update = useUpdatePublicationMutation(publication?.id, {
    onSuccess: () => {
      setPdfFile(null);
      setOpen(false);
      onSuccess?.();
    },
  });

  const onSubmit = (data: PublicationFormSchema) => {
    // Prepare FormData for multipart/form-data request
    const formData = new FormData();

    // Add all text fields
    formData.append("title", data.title);
    if (data.abstract?.trim())
      formData.append("abstract", data.abstract.trim());
    formData.append("publication_type", data.publication_type);
    if (data.doi?.trim()) formData.append("doi", data.doi.trim());
    if (data.published_date)
      formData.append("published_date", data.published_date);
    if (data.journal) formData.append("journal", String(data.journal));
    if (data.issue) {
      formData.append("issue", String(data.issue));
      // Find the selected issue to get volume and issue_number
      const selectedIssue = issues?.find((i) => i.id === Number(data.issue));
      if (selectedIssue) {
        formData.append("volume", String(selectedIssue.volume));
        formData.append("issue_number", String(selectedIssue.issue_number));
      }
    }
    if (data.pages?.trim()) formData.append("pages", data.pages.trim());
    if (data.publisher?.trim())
      formData.append("publisher", data.publisher.trim());
    if (data.co_authors?.trim())
      formData.append("co_authors", data.co_authors.trim());
    if (data.pubmed_id?.trim())
      formData.append("pubmed_id", data.pubmed_id.trim());
    if (data.arxiv_id?.trim())
      formData.append("arxiv_id", data.arxiv_id.trim());
    if (data.pubmed_central_id?.trim())
      formData.append("pubmed_central_id", data.pubmed_central_id.trim());
    formData.append("is_published", String(data.is_published));
    if (data.topic_branch)
      formData.append("topic_branch", String(data.topic_branch));
    if (data.erratum_from)
      formData.append("erratum_from", String(data.erratum_from));

    // Add PDF file if selected
    if (pdfFile) {
      formData.append("pdf_file", pdfFile);
    }

    // Add MeSH terms as JSON string
    if (data.mesh_terms_data && data.mesh_terms_data.length > 0) {
      formData.append("mesh_terms_data", JSON.stringify(data.mesh_terms_data));
    }

    // Add link outs as JSON string
    if (data.link_outs_data && data.link_outs_data.length > 0) {
      formData.append("link_outs_data", JSON.stringify(data.link_outs_data));
    }

    // Send FormData directly - axios will auto-detect and set Content-Type: multipart/form-data
    if (isEdit) {
      update.mutate(formData);
    } else {
      create.mutate(formData);
    }
  };

  const isPublished = useWatch({ control: form.control, name: "is_published" });

  // Get flattened branches options
  const topicBranchOptions = React.useMemo(() => {
    if (!topicsTree || !Array.isArray(topicsTree)) return [];
    return (topicsTree as unknown as Topic[]).flatMap((topic) =>
      getAllBranches(topic.branches || []).map((branch) => {
        const branchTyped = branch as TopicBranchType;
        return {
          label: branchTyped.full_path || branchTyped.name,
          value: String(branchTyped.id),
        };
      }),
    );
  }, [topicsTree]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"}>
          {isEdit ? <SquarePen /> : "Create Publication"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl! max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Publication" : "Create Publication"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            {/* Basic Information */}
            <div className="grid gap-4">
              <h3 className="text-sm font-semibold">Basic Information</h3>

              <FormInputField
                control={form.control}
                name="title"
                label="Title"
                placeholder="Enter publication title"
              />

              <FormTextareaField
                control={form.control}
                name="abstract"
                label="Abstract"
                placeholder="Enter publication abstract"
              />

              <FormSelectField
                control={form.control}
                name="publication_type"
                label="Publication Type"
                options={PUBLICATION_TYPE_OPTIONS.map((opt) => ({
                  label: opt.label,
                  value: opt.value,
                }))}
              />
            </div>

            {/* Publication Details */}
            <div className="grid gap-4">
              <h3 className="text-sm font-semibold">Publication Details</h3>

              <div className="grid grid-cols-2 gap-4">
                <FormInputField
                  control={form.control}
                  name="doi"
                  label="DOI"
                  placeholder="10.1234/example.2024.001"
                />

                <FormInputField
                  control={form.control}
                  name="published_date"
                  label="Published Date"
                  type="date"
                />
              </div>

              {/* Journal Selection */}
              <div className="flex flex-col gap-2">
                <Label>Journal</Label>
                <MultiSelect
                  single
                  values={
                    form.watch("journal") ? [String(form.watch("journal"))] : []
                  }
                  onValuesChange={(values) => {
                    const journalId = values[0] ? Number(values[0]) : null;
                    form.setValue("journal", journalId);
                    // Reset issue when journal changes
                    form.setValue("issue", null);
                  }}
                >
                  <MultiSelectTrigger className="w-full">
                    <MultiSelectValue placeholder="Select a journal" />
                  </MultiSelectTrigger>
                  <MultiSelectContent
                    search={{ placeholder: "Search journals..." }}
                  >
                    <MultiSelectGroup>
                      {journalsLoading && (
                        <div className="p-2 text-sm text-muted-foreground">
                          Loading journals...
                        </div>
                      )}
                      {!journalsLoading &&
                        journals &&
                        journals.map((journal) => (
                          <MultiSelectItem
                            key={journal.id}
                            value={String(journal.id)}
                            badgeLabel={journal.short_title || journal.title}
                          >
                            <div>
                              <div className="font-medium">{journal.title}</div>
                              {journal.short_title && (
                                <div className="text-xs text-muted-foreground">
                                  {journal.short_title}
                                </div>
                              )}
                            </div>
                          </MultiSelectItem>
                        ))}
                    </MultiSelectGroup>
                  </MultiSelectContent>
                </MultiSelect>
                {form.formState.errors.journal && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.journal.message}
                  </p>
                )}
              </div>

              {/* Issue Selection - only show if journal is selected */}
              {selectedJournalId ? (
                <div className="flex flex-col gap-2">
                  <Label>Issue (Optional)</Label>
                  <MultiSelect
                    single
                    values={
                      form.watch("issue") ? [String(form.watch("issue"))] : []
                    }
                    onValuesChange={(values) => {
                      const issueId = values[0] ? Number(values[0]) : null;
                      form.setValue("issue", issueId);
                    }}
                  >
                    <MultiSelectTrigger className="w-full">
                      <MultiSelectValue placeholder="Select an issue (optional)" />
                    </MultiSelectTrigger>
                    <MultiSelectContent
                      search={{ placeholder: "Search issues..." }}
                    >
                      <MultiSelectGroup>
                        {issuesLoading && (
                          <div className="p-2 text-sm text-muted-foreground">
                            Loading issues...
                          </div>
                        )}
                        {!issuesLoading && issues && issues.length === 0 && (
                          <div className="p-2 text-sm text-muted-foreground">
                            No issues available
                          </div>
                        )}
                        {!issuesLoading &&
                          issues &&
                          issues.map((issue) => (
                            <MultiSelectItem
                              key={issue.id}
                              value={String(issue.id)}
                              badgeLabel={`Vol ${issue.volume}, Issue ${issue.issue_number}`}
                            >
                              <div>
                                <div className="font-medium">
                                  Volume {issue.volume}, Issue{" "}
                                  {issue.issue_number}
                                </div>
                                <div className="flex items-center ">
                                  {issue.title && (
                                    <div className="text-xs text-muted-foreground">
                                      {issue.title} ●{"  "}
                                    </div>
                                  )}
                                  <div className="text-xs text-muted-foreground">
                                    {new Date(
                                      issue.publication_date,
                                    ).toLocaleDateString()}
                                  </div>
                                </div>
                              </div>
                            </MultiSelectItem>
                          ))}
                      </MultiSelectGroup>
                    </MultiSelectContent>
                  </MultiSelect>
                  {form.formState.errors.issue && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.issue.message}
                    </p>
                  )}
                </div>
              ) : null}

              <FormInputField
                control={form.control}
                name="pages"
                label="Pages"
                placeholder="123-145"
              />

              <FormInputField
                control={form.control}
                name="publisher"
                label="Publisher"
                placeholder="Academic Press"
              />

              <FormTextareaField
                control={form.control}
                name="co_authors"
                label="Co-Authors"
                placeholder="Jane Smith, John Doe, Alice Johnson"
                description="Comma-separated list of co-authors"
              />
            </div>

            {/* Topic Classification */}
            <div className="grid gap-4">
              <h3 className="text-sm font-semibold">Topic Classification</h3>

              <FormSelectField
                control={form.control}
                name="topic_branch"
                label="Topic Branch"
                options={topicBranchOptions}
                placeholder="Select topic branch"
              />
            </div>

            {/* MeSH Terms */}
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">MeSH Terms (Optional)</h3>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    appendMeshTerm({ term: "", term_type: "minor" })
                  }
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Term
                </Button>
              </div>

              {meshTermsFields.map((field, index) => (
                <div
                  key={field.id}
                  className="grid grid-cols-[1fr_auto_auto] gap-2 items-start"
                >
                  <FormInputField
                    control={form.control}
                    name={`mesh_terms_data.${index}.term`}
                    placeholder="e.g., Deep Learning"
                  />
                  <FormSelectField
                    control={form.control}
                    name={`mesh_terms_data.${index}.term_type`}
                    options={MESH_TERM_TYPE_OPTIONS.map((opt) => ({
                      label: opt.label,
                      value: opt.value,
                    }))}
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() => removeMeshTerm(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Link Outs */}
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">
                  Link Outs - External Resources (Optional)
                </h3>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    appendLinkOut({
                      link_type: "doi",
                      url: "",
                      description: "",
                    })
                  }
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Link
                </Button>
              </div>

              {linkOutsFields.map((field, index) => (
                <div key={field.id} className="grid gap-2">
                  <div className="grid grid-cols-[auto_1fr_auto] gap-2 items-start">
                    <FormSelectField
                      control={form.control}
                      name={`link_outs_data.${index}.link_type`}
                      options={LINK_OUT_TYPE_OPTIONS.map((opt) => ({
                        label: opt.label,
                        value: opt.value,
                      }))}
                    />
                    <FormInputField
                      control={form.control}
                      name={`link_outs_data.${index}.url`}
                      placeholder="https://..."
                      type="url"
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      onClick={() => removeLinkOut(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <FormInputField
                    control={form.control}
                    name={`link_outs_data.${index}.description`}
                    placeholder="Description (optional)"
                  />
                </div>
              ))}
            </div>

            {/* PDF Upload */}
            <div className="grid gap-4">
              <h3 className="text-sm font-semibold">File Upload (Optional)</h3>

              <div className="grid gap-2">
                <Label htmlFor="pdf_file">PDF File</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="pdf_file"
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setPdfFile(file);
                      }
                    }}
                  />
                  {publication?.pdf_url && (
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(publication.pdf_url, "_blank")}
                    >
                      <Upload className="w-4 h-4 mr-1" />
                      View
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Identifiers */}
            <div className="grid gap-4">
              <h3 className="text-sm font-semibold">External Identifiers</h3>

              <div className="grid grid-cols-3 gap-4">
                <FormInputField
                  control={form.control}
                  name="pubmed_id"
                  label="PubMed ID"
                  placeholder="12345678"
                />

                <FormInputField
                  control={form.control}
                  name="arxiv_id"
                  label="arXiv ID"
                  placeholder="2101.12345"
                />

                <FormInputField
                  control={form.control}
                  name="pubmed_central_id"
                  label="PMC ID"
                  placeholder="PMC1234567"
                />
              </div>
            </div>

            {/* Settings */}
            <div className="flex items-center justify-between py-2">
              <Label htmlFor="is_published">Publicly Visible</Label>
              <Switch
                id="is_published"
                checked={isPublished}
                onCheckedChange={(checked) =>
                  form.setValue("is_published", checked)
                }
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="ghost">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={create.isPending || update.isPending}
              >
                {create.isPending || update.isPending
                  ? "Saving..."
                  : isEdit
                    ? "Save"
                    : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
