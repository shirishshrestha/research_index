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

interface PeerReviewSectionProps {
  data: any;
  onChange: (data: any) => void;
}

export function PeerReviewSection({ data, onChange }: PeerReviewSectionProps) {
  const handleChange = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="uses_peer_review"
          checked={data.uses_peer_review || false}
          onCheckedChange={(checked) =>
            handleChange("uses_peer_review", checked)
          }
        />
        <Label htmlFor="uses_peer_review" className="cursor-pointer">
          Journal uses peer review
        </Label>
      </div>

      {data.uses_peer_review && (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="peer_review_type">Peer Review Type</Label>
              <Select
                value={data.peer_review_type || ""}
                onValueChange={(value) =>
                  handleChange("peer_review_type", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single_blind">Single-blind</SelectItem>
                  <SelectItem value="double_blind">Double-blind</SelectItem>
                  <SelectItem value="open">Open peer review</SelectItem>
                  <SelectItem value="post_publication">
                    Post-publication review
                  </SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reviewers_per_manuscript">
                Reviewers per Manuscript
              </Label>
              <Input
                id="reviewers_per_manuscript"
                type="number"
                value={data.reviewers_per_manuscript || ""}
                onChange={(e) =>
                  handleChange(
                    "reviewers_per_manuscript",
                    parseInt(e.target.value) || null,
                  )
                }
                placeholder="2"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="average_review_time_weeks">
                Average Review Time (weeks)
              </Label>
              <Input
                id="average_review_time_weeks"
                type="number"
                value={data.average_review_time_weeks || ""}
                onChange={(e) =>
                  handleChange(
                    "average_review_time_weeks",
                    parseInt(e.target.value) || null,
                  )
                }
                placeholder="4"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="peer_review_procedure_url">
                Peer Review Procedure URL
              </Label>
              <Input
                id="peer_review_procedure_url"
                type="url"
                value={data.peer_review_procedure_url || ""}
                onChange={(e) =>
                  handleChange("peer_review_procedure_url", e.target.value)
                }
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="reviewers_external"
                checked={data.reviewers_external || false}
                onCheckedChange={(checked) =>
                  handleChange("reviewers_external", checked)
                }
              />
              <Label htmlFor="reviewers_external" className="cursor-pointer">
                Reviewers are external to the authors' institutions
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="peer_review_procedure_published"
                checked={data.peer_review_procedure_published || false}
                onCheckedChange={(checked) =>
                  handleChange("peer_review_procedure_published", checked)
                }
              />
              <Label
                htmlFor="peer_review_procedure_published"
                className="cursor-pointer"
              >
                Peer review procedure is described on the website
              </Label>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
