"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface TransparencySectionProps {
  data: any;
  onChange: (data: any) => void;
}

export function TransparencySection({
  data,
  onChange,
}: TransparencySectionProps) {
  const handleChange = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>Website Quality & Transparency</Label>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="author_guidelines_available"
              checked={data.author_guidelines_available || false}
              onCheckedChange={(checked) =>
                handleChange("author_guidelines_available", checked)
              }
            />
            <Label
              htmlFor="author_guidelines_available"
              className="cursor-pointer"
            >
              Author guidelines are publicly available
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="peer_review_rules_available"
              checked={data.peer_review_rules_available || false}
              onCheckedChange={(checked) =>
                handleChange("peer_review_rules_available", checked)
              }
            />
            <Label
              htmlFor="peer_review_rules_available"
              className="cursor-pointer"
            >
              Peer review rules are publicly available
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="apcs_clearly_stated"
              checked={data.apcs_clearly_stated || false}
              onCheckedChange={(checked) =>
                handleChange("apcs_clearly_stated", checked)
              }
            />
            <Label htmlFor="apcs_clearly_stated" className="cursor-pointer">
              APCs are clearly stated on website
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="journal_archive_accessible"
              checked={data.journal_archive_accessible || false}
              onCheckedChange={(checked) =>
                handleChange("journal_archive_accessible", checked)
              }
            />
            <Label
              htmlFor="journal_archive_accessible"
              className="cursor-pointer"
            >
              Journal archive is publicly accessible
            </Label>
          </div>
        </div>
      </div>

      <div className="border-t pt-6 space-y-4">
        <Label>Declarations & Verification</Label>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="data_is_verifiable"
              checked={data.data_is_verifiable || false}
              onCheckedChange={(checked) =>
                handleChange("data_is_verifiable", checked)
              }
            />
            <Label
              htmlFor="data_is_verifiable"
              className="cursor-pointer font-medium"
            >
              All data provided is true and verifiable *
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="data_matches_website"
              checked={data.data_matches_website || false}
              onCheckedChange={(checked) =>
                handleChange("data_matches_website", checked)
              }
            />
            <Label
              htmlFor="data_matches_website"
              className="cursor-pointer font-medium"
            >
              Data corresponds to information on the journal website *
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="consent_to_evaluation"
              checked={data.consent_to_evaluation || false}
              onCheckedChange={(checked) =>
                handleChange("consent_to_evaluation", checked)
              }
            />
            <Label
              htmlFor="consent_to_evaluation"
              className="cursor-pointer font-medium"
            >
              I consent to evaluation and indexing *
            </Label>
          </div>
        </div>
      </div>

      <div className="border-t pt-6 grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="completed_by_name">Completed By (Name) *</Label>
          <Input
            id="completed_by_name"
            value={data.completed_by_name || ""}
            onChange={(e) => handleChange("completed_by_name", e.target.value)}
            placeholder="Your full name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="completed_by_role">Role/Position *</Label>
          <Input
            id="completed_by_role"
            value={data.completed_by_role || ""}
            onChange={(e) => handleChange("completed_by_role", e.target.value)}
            placeholder="e.g., Managing Editor"
          />
        </div>
      </div>
    </div>
  );
}
