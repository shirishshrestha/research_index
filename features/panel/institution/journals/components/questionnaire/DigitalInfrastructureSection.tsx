"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DigitalInfrastructureSectionProps {
  data: any;
  onChange: (data: any) => void;
}

export function DigitalInfrastructureSection({
  data,
  onChange,
}: DigitalInfrastructureSectionProps) {
  const handleChange = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="assigns_dois"
            checked={data.assigns_dois || false}
            onCheckedChange={(checked) => handleChange("assigns_dois", checked)}
          />
          <Label htmlFor="assigns_dois" className="cursor-pointer">
            Journal assigns DOIs to articles
          </Label>
        </div>

        {data.assigns_dois && (
          <div className="space-y-2 ml-6">
            <Label htmlFor="doi_registration_agency">
              DOI Registration Agency
            </Label>
            <Input
              id="doi_registration_agency"
              value={data.doi_registration_agency || ""}
              onChange={(e) =>
                handleChange("doi_registration_agency", e.target.value)
              }
              placeholder="e.g., Crossref"
            />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="metadata_standards_used">Metadata Standards Used</Label>
        <Input
          id="metadata_standards_used"
          value={data.metadata_standards_used || ""}
          onChange={(e) =>
            handleChange("metadata_standards_used", e.target.value)
          }
          placeholder="e.g., Dublin Core, JATS"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="uses_online_submission_system"
            checked={data.uses_online_submission_system || false}
            onCheckedChange={(checked) =>
              handleChange("uses_online_submission_system", checked)
            }
          />
          <Label
            htmlFor="uses_online_submission_system"
            className="cursor-pointer"
          >
            Uses online submission system
          </Label>
        </div>

        {data.uses_online_submission_system && (
          <div className="space-y-2 ml-6">
            <Label htmlFor="submission_system_name">
              Submission System Name
            </Label>
            <Input
              id="submission_system_name"
              value={data.submission_system_name || ""}
              onChange={(e) =>
                handleChange("submission_system_name", e.target.value)
              }
              placeholder="e.g., Open Journal Systems"
            />
          </div>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="digital_archiving_system">
            Digital Archiving System
          </Label>
          <Select
            value={data.digital_archiving_system || ""}
            onValueChange={(value) =>
              handleChange("digital_archiving_system", value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select system" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lockss">LOCKSS</SelectItem>
              <SelectItem value="clockss">CLOCKSS</SelectItem>
              <SelectItem value="portico">Portico</SelectItem>
              <SelectItem value="institutional">
                Institutional repository
              </SelectItem>
              <SelectItem value="pmc">PubMed Central</SelectItem>
              <SelectItem value="other">Other</SelectItem>
              <SelectItem value="none">None</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {data.digital_archiving_system === "other" && (
          <div className="space-y-2">
            <Label htmlFor="other_archiving_system">
              Other Archiving System
            </Label>
            <Input
              id="other_archiving_system"
              value={data.other_archiving_system || ""}
              onChange={(e) =>
                handleChange("other_archiving_system", e.target.value)
              }
              placeholder="Specify other system"
            />
          </div>
        )}
      </div>
    </div>
  );
}
