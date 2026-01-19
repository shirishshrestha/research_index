"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface EditorialBoardSectionProps {
  data: any;
  onChange: (data: any) => void;
}

export function EditorialBoardSection({
  data,
  onChange,
}: EditorialBoardSectionProps) {
  const handleChange = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="editor_in_chief_name">Editor-in-Chief Name *</Label>
          <Input
            id="editor_in_chief_name"
            value={data.editor_in_chief_name || ""}
            onChange={(e) =>
              handleChange("editor_in_chief_name", e.target.value)
            }
            placeholder="Dr. John Smith"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="editor_in_chief_affiliation">
            Editor-in-Chief Affiliation *
          </Label>
          <Input
            id="editor_in_chief_affiliation"
            value={data.editor_in_chief_affiliation || ""}
            onChange={(e) =>
              handleChange("editor_in_chief_affiliation", e.target.value)
            }
            placeholder="University Name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="editor_in_chief_country">
            Editor-in-Chief Country *
          </Label>
          <Input
            id="editor_in_chief_country"
            value={data.editor_in_chief_country || ""}
            onChange={(e) =>
              handleChange("editor_in_chief_country", e.target.value)
            }
            placeholder="Country"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="editorial_board_members_count">
            Number of Editorial Board Members *
          </Label>
          <Input
            id="editorial_board_members_count"
            type="number"
            value={data.editorial_board_members_count || ""}
            onChange={(e) =>
              handleChange(
                "editorial_board_members_count",
                parseInt(e.target.value),
              )
            }
            placeholder="25"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="editorial_board_countries">
            Editorial Board Countries *
          </Label>
          <Input
            id="editorial_board_countries"
            value={data.editorial_board_countries || ""}
            onChange={(e) =>
              handleChange("editorial_board_countries", e.target.value)
            }
            placeholder="USA, UK, Germany, France"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="foreign_board_members_percentage">
            Foreign Board Members (%) *
          </Label>
          <Input
            id="foreign_board_members_percentage"
            type="number"
            step="0.01"
            min="0"
            max="100"
            value={data.foreign_board_members_percentage || ""}
            onChange={(e) =>
              handleChange(
                "foreign_board_members_percentage",
                parseFloat(e.target.value),
              )
            }
            placeholder="60.0"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="board_details_published"
          checked={data.board_details_published || false}
          onCheckedChange={(checked) =>
            handleChange("board_details_published", checked)
          }
        />
        <Label htmlFor="board_details_published" className="cursor-pointer">
          Full editorial board details are published on the website
        </Label>
      </div>
    </div>
  );
}
