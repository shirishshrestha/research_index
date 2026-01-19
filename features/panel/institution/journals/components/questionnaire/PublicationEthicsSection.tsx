"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface PublicationEthicsSectionProps {
  data: any;
  onChange: (data: any) => void;
}

export function PublicationEthicsSection({
  data,
  onChange,
}: PublicationEthicsSectionProps) {
  const handleChange = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="follows_publication_ethics"
          checked={data.follows_publication_ethics || false}
          onCheckedChange={(checked) =>
            handleChange("follows_publication_ethics", checked)
          }
        />
        <Label htmlFor="follows_publication_ethics" className="cursor-pointer">
          Journal follows publication ethics guidelines
        </Label>
      </div>

      <div className="space-y-4">
        <Label>Ethics Guidelines Based On</Label>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="ethics_based_on_cope"
              checked={data.ethics_based_on_cope || false}
              onCheckedChange={(checked) =>
                handleChange("ethics_based_on_cope", checked)
              }
            />
            <Label htmlFor="ethics_based_on_cope" className="cursor-pointer">
              COPE (Committee on Publication Ethics)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="ethics_based_on_icmje"
              checked={data.ethics_based_on_icmje || false}
              onCheckedChange={(checked) =>
                handleChange("ethics_based_on_icmje", checked)
              }
            />
            <Label htmlFor="ethics_based_on_icmje" className="cursor-pointer">
              ICMJE (International Committee of Medical Journal Editors)
            </Label>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="ethics_other_guidelines">Other Ethics Guidelines</Label>
        <Input
          id="ethics_other_guidelines"
          value={data.ethics_other_guidelines || ""}
          onChange={(e) =>
            handleChange("ethics_other_guidelines", e.target.value)
          }
          placeholder="Specify other guidelines"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="uses_plagiarism_detection"
              checked={data.uses_plagiarism_detection || false}
              onCheckedChange={(checked) =>
                handleChange("uses_plagiarism_detection", checked)
              }
            />
            <Label
              htmlFor="uses_plagiarism_detection"
              className="cursor-pointer"
            >
              Uses plagiarism detection
            </Label>
          </div>

          {data.uses_plagiarism_detection && (
            <div className="space-y-2 ml-6">
              <Label htmlFor="plagiarism_software_name">Software Name</Label>
              <Input
                id="plagiarism_software_name"
                value={data.plagiarism_software_name || ""}
                onChange={(e) =>
                  handleChange("plagiarism_software_name", e.target.value)
                }
                placeholder="e.g., iThenticate"
              />
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="has_retraction_policy"
              checked={data.has_retraction_policy || false}
              onCheckedChange={(checked) =>
                handleChange("has_retraction_policy", checked)
              }
            />
            <Label htmlFor="has_retraction_policy" className="cursor-pointer">
              Has retraction policy
            </Label>
          </div>
          {data.has_retraction_policy && (
            <Input
              id="retraction_policy_url"
              type="url"
              value={data.retraction_policy_url || ""}
              onChange={(e) =>
                handleChange("retraction_policy_url", e.target.value)
              }
              placeholder="Policy URL"
              className="ml-6"
            />
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="has_conflict_of_interest_policy"
              checked={data.has_conflict_of_interest_policy || false}
              onCheckedChange={(checked) =>
                handleChange("has_conflict_of_interest_policy", checked)
              }
            />
            <Label
              htmlFor="has_conflict_of_interest_policy"
              className="cursor-pointer"
            >
              Has conflict of interest policy
            </Label>
          </div>
          {data.has_conflict_of_interest_policy && (
            <Input
              id="conflict_of_interest_policy_url"
              type="url"
              value={data.conflict_of_interest_policy_url || ""}
              onChange={(e) =>
                handleChange("conflict_of_interest_policy_url", e.target.value)
              }
              placeholder="Policy URL"
              className="ml-6"
            />
          )}
        </div>
      </div>
    </div>
  );
}
