"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface PublicationStatisticsSectionProps {
  data: any;
  onChange: (data: any) => void;
}

export function PublicationStatisticsSection({
  data,
  onChange,
}: PublicationStatisticsSectionProps) {
  const handleChange = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="issues_published_in_year">
            Issues Published in Year *
          </Label>
          <Input
            id="issues_published_in_year"
            type="number"
            value={data.issues_published_in_year || ""}
            onChange={(e) =>
              handleChange("issues_published_in_year", parseInt(e.target.value))
            }
            placeholder="4"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="articles_published_in_year">
            Articles Published in Year *
          </Label>
          <Input
            id="articles_published_in_year"
            type="number"
            value={data.articles_published_in_year || ""}
            onChange={(e) =>
              handleChange(
                "articles_published_in_year",
                parseInt(e.target.value),
              )
            }
            placeholder="120"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="submissions_rejected">Submissions Rejected *</Label>
          <Input
            id="submissions_rejected"
            type="number"
            value={data.submissions_rejected || ""}
            onChange={(e) =>
              handleChange("submissions_rejected", parseInt(e.target.value))
            }
            placeholder="200"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="average_acceptance_rate">
            Average Acceptance Rate (%) *
          </Label>
          <Input
            id="average_acceptance_rate"
            type="number"
            step="0.01"
            min="0"
            max="100"
            value={data.average_acceptance_rate || ""}
            onChange={(e) =>
              handleChange(
                "average_acceptance_rate",
                parseFloat(e.target.value),
              )
            }
            placeholder="37.5"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="all_issues_published_on_time"
          checked={data.all_issues_published_on_time || false}
          onCheckedChange={(checked) =>
            handleChange("all_issues_published_on_time", checked)
          }
        />
        <Label
          htmlFor="all_issues_published_on_time"
          className="cursor-pointer"
        >
          All declared issues were published on time
        </Label>
      </div>
    </div>
  );
}
