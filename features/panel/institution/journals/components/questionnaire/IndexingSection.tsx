"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

interface IndexingSectionProps {
  data: any;
  onChange: (data: any) => void;
}

export function IndexingSection({ data, onChange }: IndexingSectionProps) {
  const handleChange = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="indexed_databases">Indexed Databases *</Label>
        <Textarea
          id="indexed_databases"
          value={data.indexed_databases || ""}
          onChange={(e) => handleChange("indexed_databases", e.target.value)}
          placeholder="Comma-separated list of databases, e.g., Scopus, Web of Science, Google Scholar"
          className="min-h-[80px]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="year_first_indexed">Year First Indexed</Label>
        <Input
          id="year_first_indexed"
          type="number"
          value={data.year_first_indexed || ""}
          onChange={(e) =>
            handleChange("year_first_indexed", parseInt(e.target.value) || null)
          }
          placeholder="2021"
        />
      </div>

      <div className="space-y-4">
        <Label>Major Indexing Services</Label>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="indexed_in_google_scholar"
              checked={data.indexed_in_google_scholar || false}
              onCheckedChange={(checked) =>
                handleChange("indexed_in_google_scholar", checked)
              }
            />
            <Label
              htmlFor="indexed_in_google_scholar"
              className="cursor-pointer"
            >
              Google Scholar
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="indexed_in_doaj"
              checked={data.indexed_in_doaj || false}
              onCheckedChange={(checked) =>
                handleChange("indexed_in_doaj", checked)
              }
            />
            <Label htmlFor="indexed_in_doaj" className="cursor-pointer">
              DOAJ (Directory of Open Access Journals)
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="indexed_in_scopus"
              checked={data.indexed_in_scopus || false}
              onCheckedChange={(checked) =>
                handleChange("indexed_in_scopus", checked)
              }
            />
            <Label htmlFor="indexed_in_scopus" className="cursor-pointer">
              Scopus
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="indexed_in_web_of_science"
              checked={data.indexed_in_web_of_science || false}
              onCheckedChange={(checked) =>
                handleChange("indexed_in_web_of_science", checked)
              }
            />
            <Label
              htmlFor="indexed_in_web_of_science"
              className="cursor-pointer"
            >
              Web of Science
            </Label>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="abstracting_services">Abstracting Services</Label>
        <Textarea
          id="abstracting_services"
          value={data.abstracting_services || ""}
          onChange={(e) => handleChange("abstracting_services", e.target.value)}
          placeholder="Comma-separated list, e.g., Chemical Abstracts, INSPEC"
          className="min-h-[80px]"
        />
      </div>
    </div>
  );
}
