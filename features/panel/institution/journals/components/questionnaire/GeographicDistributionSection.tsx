"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface GeographicDistributionSectionProps {
  data: any;
  onChange: (data: any) => void;
}

export function GeographicDistributionSection({
  data,
  onChange,
}: GeographicDistributionSectionProps) {
  const handleChange = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="total_authors_in_year">Total Authors in Year *</Label>
          <Input
            id="total_authors_in_year"
            type="number"
            value={data.total_authors_in_year || ""}
            onChange={(e) =>
              handleChange("total_authors_in_year", parseInt(e.target.value))
            }
            placeholder="350"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="foreign_authors_count">Foreign Authors Count *</Label>
          <Input
            id="foreign_authors_count"
            type="number"
            value={data.foreign_authors_count || ""}
            onChange={(e) =>
              handleChange("foreign_authors_count", parseInt(e.target.value))
            }
            placeholder="210"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="author_countries_count">
            Number of Countries Represented *
          </Label>
          <Input
            id="author_countries_count"
            type="number"
            value={data.author_countries_count || ""}
            onChange={(e) =>
              handleChange("author_countries_count", parseInt(e.target.value))
            }
            placeholder="45"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="foreign_authors_percentage">
            Foreign Authors Percentage (%) *
          </Label>
          <Input
            id="foreign_authors_percentage"
            type="number"
            step="0.01"
            min="0"
            max="100"
            value={data.foreign_authors_percentage || ""}
            onChange={(e) =>
              handleChange(
                "foreign_authors_percentage",
                parseFloat(e.target.value),
              )
            }
            placeholder="60.0"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="encourages_international_submissions"
          checked={data.encourages_international_submissions || false}
          onCheckedChange={(checked) =>
            handleChange("encourages_international_submissions", checked)
          }
        />
        <Label
          htmlFor="encourages_international_submissions"
          className="cursor-pointer"
        >
          Journal encourages international submissions
        </Label>
      </div>
    </div>
  );
}
