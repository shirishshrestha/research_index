"use client";

import { RichTextDisplay } from "@/components/shared/RichTextDisplay";

import { useState } from "react";
import { InstitutionProfile } from "../types";
import { Button } from "@/components/ui/button";
import { Pencil, Mail, Building, Globe, Phone } from "lucide-react";
import { InstitutionProfileForm } from "./InstitutionProfileForm";
import Image from "next/image";

interface InstitutionProfileViewProps {
  profile: InstitutionProfile;
}

export function InstitutionProfileView({
  profile,
}: InstitutionProfileViewProps) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <InstitutionProfileForm
        profile={profile}
        onCancel={() => setIsEditing(false)}
        onSuccess={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Edit Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
            {profile.logo_url ? (
              <Image
                src={profile.logo_url}
                alt={profile.institution_name}
                className="h-20 w-20 rounded-full object-cover"
                width={80}
                height={80}
              />
            ) : (
              <Building className="h-10 w-10 text-primary" />
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold">
              {profile.institution_name || profile.email}
            </h2>
            <p className="text-text-gray">
              {profile.institution_type || "Institution"}
            </p>
          </div>
        </div>
        <Button onClick={() => setIsEditing(true)} variant="outline">
          <Pencil className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
      </div>

      {/* Profile Information */}
      <div className="rounded-xl bg-card p-6 shadow-sm ring-1 ring-border space-y-6">
        <h3 className="text-lg font-semibold border-b pb-2">
          Basic Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-1 flex items-center gap-2">
              <Building className="h-4 w-4" />
              Institution Name
            </label>
            <p className="text-text-gray">
              {profile.institution_name || "Not specified"}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Institution Type
            </label>
            <p className="text-text-gray">
              {profile.institution_type || "Not specified"}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email
            </label>
            <p className="text-text-gray">{profile.email}</p>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Phone
            </label>
            <p className="text-text-gray">{profile.phone || "Not specified"}</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Established Year
            </label>
            <p className="text-text-gray">
              {profile.established_year || "Not specified"}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Total Researchers
            </label>
            <p className="text-text-gray">
              {profile.total_researchers || "Not specified"}
            </p>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <div className="text-text-gray">
              {profile.description ? (
                <RichTextDisplay content={profile.description} />
              ) : (
                <p>Not specified</p>
              )}
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">
              Research Areas
            </label>
            <p className="text-text-gray">
              {profile.research_areas.map((area) => area).join(", ") ||
                "Not specified"}
            </p>
          </div>
        </div>
      </div>

      {/* Address Information */}
      <div className="rounded-xl bg-card p-6 shadow-sm ring-1 ring-border space-y-6">
        <h3 className="text-lg font-semibold border-b pb-2">
          Address Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">
              Street Address
            </label>
            <p className="text-text-gray">
              {profile.address || "Not specified"}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <p className="text-text-gray">{profile.city || "Not specified"}</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              State/Province
            </label>
            <p className="text-text-gray">{profile.state || "Not specified"}</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Country</label>
            <p className="text-text-gray">
              {profile.country || "Not specified"}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Postal Code
            </label>
            <p className="text-text-gray">
              {profile.postal_code || "Not specified"}
            </p>
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium mb-1 flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Website
            </label>
            <p className="text-text-gray break-all">
              {profile.website || "Not specified"}
            </p>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="rounded-xl bg-card p-6 shadow-sm ring-1 ring-border">
        <h3 className="text-lg font-semibold border-b pb-2 mb-4">
          Research Statistics
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">
              {profile.stats.total_publications}
            </p>
            <p className="text-sm text-text-gray">Publications</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">
              {profile.stats.total_citations}
            </p>
            <p className="text-sm text-text-gray">Citations</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">
              {profile.stats.total_authors}
            </p>
            <p className="text-sm text-text-gray">Authors</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">
              {profile.stats.total_reads}
            </p>
            <p className="text-sm text-text-gray">Total Reads</p>
          </div>
        </div>
      </div>
    </div>
  );
}
