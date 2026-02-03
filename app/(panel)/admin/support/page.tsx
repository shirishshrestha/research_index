"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useAuthorSupporterQuery,
  useInstitutionalSupporterQuery,
  useSponsorshipPartnershipQuery,
} from "@/features/general/support/hooks";
import { SupportPageEditor } from "@/features/panel/admin/support/components/SupportPageEditor";
import { Loader2 } from "lucide-react";

export default function AdminSupportPage() {
  const [activeTab, setActiveTab] = useState<
    "author" | "institutional" | "sponsorship"
  >("author");

  const authorQuery = useAuthorSupporterQuery();
  const institutionalQuery = useInstitutionalSupporterQuery();
  const sponsorshipQuery = useSponsorshipPartnershipQuery();

  return (
    <div className="section-padding py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="heading-2 text-text-black">Manage Support Pages</h1>
          <p className="sub-body text-text-gray mt-2">
            Edit support page content, pricing tiers, benefits, and manage
            sponsors.
          </p>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as typeof activeTab)}
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="author">Author Supporter</TabsTrigger>
            <TabsTrigger value="institutional">
              Institutional Supporter
            </TabsTrigger>
            <TabsTrigger value="sponsorship">
              Sponsorship & Partnership
            </TabsTrigger>
          </TabsList>

          <TabsContent value="author" className="mt-6">
            {authorQuery.isLoading ? (
              <Card>
                <CardContent className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </CardContent>
              </Card>
            ) : authorQuery.error ? (
              <Card>
                <CardContent className="py-12">
                  <p className="text-center text-red-500">
                    Failed to load page data
                  </p>
                </CardContent>
              </Card>
            ) : authorQuery.data ? (
              <SupportPageEditor
                data={authorQuery.data}
                pageType="author_supporter"
              />
            ) : null}
          </TabsContent>

          <TabsContent value="institutional" className="mt-6">
            {institutionalQuery.isLoading ? (
              <Card>
                <CardContent className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </CardContent>
              </Card>
            ) : institutionalQuery.error ? (
              <Card>
                <CardContent className="py-12">
                  <p className="text-center text-red-500">
                    Failed to load page data
                  </p>
                </CardContent>
              </Card>
            ) : institutionalQuery.data ? (
              <SupportPageEditor
                data={institutionalQuery.data}
                pageType="institutional_supporter"
              />
            ) : null}
          </TabsContent>

          <TabsContent value="sponsorship" className="mt-6">
            {sponsorshipQuery.isLoading ? (
              <Card>
                <CardContent className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </CardContent>
              </Card>
            ) : sponsorshipQuery.error ? (
              <Card>
                <CardContent className="py-12">
                  <p className="text-center text-red-500">
                    Failed to load page data
                  </p>
                </CardContent>
              </Card>
            ) : sponsorshipQuery.data ? (
              <SupportPageEditor
                data={sponsorshipQuery.data}
                pageType="sponsorship_partnership"
              />
            ) : null}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
