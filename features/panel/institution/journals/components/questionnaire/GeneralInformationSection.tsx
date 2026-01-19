"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GeneralInformationSectionProps {
  data: any;
  onChange: (data: any) => void;
}

export function GeneralInformationSection({
  data,
  onChange,
}: GeneralInformationSectionProps) {
  const handleChange = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="journal_title">Journal Title *</Label>
          <Input
            id="journal_title"
            value={data.journal_title || ""}
            onChange={(e) => handleChange("journal_title", e.target.value)}
            placeholder="Enter journal title"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="issn">ISSN</Label>
          <Input
            id="issn"
            value={data.issn || ""}
            onChange={(e) => handleChange("issn", e.target.value)}
            placeholder="1234-5678"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="e_issn">E-ISSN</Label>
          <Input
            id="e_issn"
            value={data.e_issn || ""}
            onChange={(e) => handleChange("e_issn", e.target.value)}
            placeholder="9876-5432"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="publisher_name">Publisher Name *</Label>
          <Input
            id="publisher_name"
            value={data.publisher_name || ""}
            onChange={(e) => handleChange("publisher_name", e.target.value)}
            placeholder="Enter publisher name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="publisher_country">Publisher Country *</Label>
          <Input
            id="publisher_country"
            value={data.publisher_country || ""}
            onChange={(e) => handleChange("publisher_country", e.target.value)}
            placeholder="Enter country"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="year_first_publication">
            Year of First Publication *
          </Label>
          <Input
            id="year_first_publication"
            type="number"
            value={data.year_first_publication || ""}
            onChange={(e) =>
              handleChange("year_first_publication", parseInt(e.target.value))
            }
            placeholder="2020"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="publication_frequency">Publication Frequency *</Label>
          <Select
            value={data.publication_frequency || ""}
            onValueChange={(value) =>
              handleChange("publication_frequency", value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="biweekly">Bi-weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="bimonthly">Bi-monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="biannual">Bi-annual</SelectItem>
              <SelectItem value="annual">Annual</SelectItem>
              <SelectItem value="irregular">Irregular</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="publication_format">Publication Format *</Label>
          <Select
            value={data.publication_format || ""}
            onValueChange={(value) => handleChange("publication_format", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="print">Print Only</SelectItem>
              <SelectItem value="online">Online Only</SelectItem>
              <SelectItem value="both">Both Print and Online</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="journal_website_url">Journal Website URL *</Label>
        <Input
          id="journal_website_url"
          type="url"
          value={data.journal_website_url || ""}
          onChange={(e) => handleChange("journal_website_url", e.target.value)}
          placeholder="https://journal.example.com"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact_email">Contact Email *</Label>
        <Input
          id="contact_email"
          type="email"
          value={data.contact_email || ""}
          onChange={(e) => handleChange("contact_email", e.target.value)}
          placeholder="editor@journal.com"
        />
      </div>
    </div>
  );
}
