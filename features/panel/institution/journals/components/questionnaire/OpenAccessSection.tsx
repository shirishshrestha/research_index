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

interface OpenAccessSectionProps {
  data: any;
  onChange: (data: any) => void;
}

export function OpenAccessSection({ data, onChange }: OpenAccessSectionProps) {
  const handleChange = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="is_open_access"
          checked={data.is_open_access || false}
          onCheckedChange={(checked) => handleChange("is_open_access", checked)}
        />
        <Label htmlFor="is_open_access" className="cursor-pointer">
          Journal is Open Access
        </Label>
      </div>

      {data.is_open_access && (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="oa_model">Open Access Model</Label>
            <Select
              value={data.oa_model || ""}
              onValueChange={(value) => handleChange("oa_model", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gold">Gold OA</SelectItem>
                <SelectItem value="hybrid">Hybrid OA</SelectItem>
                <SelectItem value="diamond">Diamond OA (no fees)</SelectItem>
                <SelectItem value="green">Green OA</SelectItem>
                <SelectItem value="bronze">Bronze OA</SelectItem>
                <SelectItem value="not_oa">Not Open Access</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="license_type">License Type</Label>
            <Select
              value={data.license_type || ""}
              onValueChange={(value) => handleChange("license_type", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select license" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cc_by">CC BY</SelectItem>
                <SelectItem value="cc_by_sa">CC BY-SA</SelectItem>
                <SelectItem value="cc_by_nc">CC BY-NC</SelectItem>
                <SelectItem value="cc_by_nc_sa">CC BY-NC-SA</SelectItem>
                <SelectItem value="cc_by_nd">CC BY-ND</SelectItem>
                <SelectItem value="cc_by_nc_nd">CC BY-NC-ND</SelectItem>
                <SelectItem value="cc0">CC0 (Public Domain)</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="has_apc"
            checked={data.has_apc || false}
            onCheckedChange={(checked) => handleChange("has_apc", checked)}
          />
          <Label htmlFor="has_apc" className="cursor-pointer">
            Charges Article Processing Charge (APC)
          </Label>
        </div>

        {data.has_apc && (
          <div className="grid gap-4 md:grid-cols-2 ml-6">
            <div className="space-y-2">
              <Label htmlFor="apc_amount">APC Amount</Label>
              <Input
                id="apc_amount"
                type="number"
                step="0.01"
                min="0"
                value={data.apc_amount || ""}
                onChange={(e) =>
                  handleChange("apc_amount", parseFloat(e.target.value) || null)
                }
                placeholder="2000.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="apc_currency">Currency</Label>
              <Input
                id="apc_currency"
                value={data.apc_currency || "USD"}
                onChange={(e) => handleChange("apc_currency", e.target.value)}
                placeholder="USD"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
