"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

interface SubjectAreaSectionProps {
  data: any;
  onChange: (data: any) => void;
}

export function SubjectAreaSection({
  data,
  onChange,
}: SubjectAreaSectionProps) {
  const handleChange = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="main_discipline">Main Scientific Discipline *</Label>
        <Input
          id="main_discipline"
          value={data.main_discipline || ""}
          onChange={(e) => handleChange("main_discipline", e.target.value)}
          placeholder="e.g., Computer Science"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="secondary_disciplines">Secondary Disciplines</Label>
        <Input
          id="secondary_disciplines"
          value={data.secondary_disciplines || ""}
          onChange={(e) =>
            handleChange("secondary_disciplines", e.target.value)
          }
          placeholder="Comma-separated list"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="aims_and_scope">Aims and Scope *</Label>
        <Textarea
          id="aims_and_scope"
          value={data.aims_and_scope || ""}
          onChange={(e) => handleChange("aims_and_scope", e.target.value)}
          placeholder="Describe the aims and scope of the journal"
          className="min-h-[120px]"
        />
      </div>

      <div className="space-y-4">
        <Label>Types of Articles Published</Label>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="publishes_original_research"
              checked={data.publishes_original_research || false}
              onCheckedChange={(checked) =>
                handleChange("publishes_original_research", checked)
              }
            />
            <Label
              htmlFor="publishes_original_research"
              className="cursor-pointer"
            >
              Original Research Articles
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="publishes_review_articles"
              checked={data.publishes_review_articles || false}
              onCheckedChange={(checked) =>
                handleChange("publishes_review_articles", checked)
              }
            />
            <Label
              htmlFor="publishes_review_articles"
              className="cursor-pointer"
            >
              Review Articles
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="publishes_case_studies"
              checked={data.publishes_case_studies || false}
              onCheckedChange={(checked) =>
                handleChange("publishes_case_studies", checked)
              }
            />
            <Label htmlFor="publishes_case_studies" className="cursor-pointer">
              Case Studies
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="publishes_short_communications"
              checked={data.publishes_short_communications || false}
              onCheckedChange={(checked) =>
                handleChange("publishes_short_communications", checked)
              }
            />
            <Label
              htmlFor="publishes_short_communications"
              className="cursor-pointer"
            >
              Short Communications
            </Label>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="publishes_other">Other Types of Articles</Label>
        <Input
          id="publishes_other"
          value={data.publishes_other || ""}
          onChange={(e) => handleChange("publishes_other", e.target.value)}
          placeholder="Specify other article types"
        />
      </div>
    </div>
  );
}
