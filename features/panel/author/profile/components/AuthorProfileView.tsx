"use client";

import { useState } from "react";
import { AuthorProfile } from "../types";
import { Button } from "@/components/ui/button";
import { Pencil, Mail, Building, Award, Globe } from "lucide-react";
import { AuthorProfileForm } from "./AuthorProfileForm";
import Image from "next/image";

interface AuthorProfileViewProps {
  profile: AuthorProfile;
}

export function AuthorProfileView({ profile }: AuthorProfileViewProps) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <AuthorProfileForm
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
            {profile.profile_picture_url ? (
              <Image
                src={profile.profile_picture_url}
                alt={profile.full_name}
                className="h-20 w-20 rounded-full object-cover"
                width={80}
                height={80}
              />
            ) : (
              <span className="text-2xl font-bold text-primary">
                {profile.full_name?.charAt(0) ||
                  profile.email.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold">
              {profile.full_name || profile.email}
            </h2>
            <p className="text-text-gray">{profile.designation || "Author"}</p>
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
            <label className="block text-sm font-medium mb-1">Title</label>
            <p className="text-text-gray">{profile.title || "Not specified"}</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <p className="text-text-gray">
              {profile.full_name || "Not specified"}
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
              <Building className="h-4 w-4" />
              Institute
            </label>
            <p className="text-text-gray">
              {profile.institute || "Not specified"}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Designation
            </label>
            <p className="text-text-gray">
              {profile.designation || "Not specified"}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 flex items-center gap-2">
              <Award className="h-4 w-4" />
              Degree
            </label>
            <p className="text-text-gray">
              {profile.degree || "Not specified"}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Gender</label>
            <p className="text-text-gray">
              {profile.gender || "Not specified"}
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Bio</label>
          <p className="text-text-gray">{profile.bio || "Not specified"}</p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Research Interests
          </label>
          <p className="text-text-gray">
            {profile.research_interests
              .map((interest: string) => interest)
              .join(", ") || "Not specified"}
          </p>
        </div>
      </div>

      {/* Social Links */}
      <div className="rounded-xl bg-card p-6 shadow-sm ring-1 ring-border space-y-6">
        <h3 className="text-lg font-semibold border-b pb-2 flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Academic & Social Links
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">ORCID</label>
            <p className="text-text-gray">{profile.orcid || "Not specified"}</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Google Scholar
            </label>
            <p className="text-text-gray break-all">
              {profile.google_scholar || "Not specified"}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              ResearchGate
            </label>
            <p className="text-text-gray break-all">
              {profile.researchgate || "Not specified"}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">LinkedIn</label>
            <p className="text-text-gray break-all">
              {profile.linkedin || "Not specified"}
            </p>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">
              Personal Website
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
              {profile.stats.h_index}
            </p>
            <p className="text-sm text-text-gray">H-Index</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">
              {profile.stats.i10_index}
            </p>
            <p className="text-sm text-text-gray">i10-Index</p>
          </div>
        </div>
      </div>
    </div>
  );
}
