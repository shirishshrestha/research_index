import { Breadcrumb, commonBreadcrumbs } from "@/components/shared/Breadcrumb";
import { Container } from "@/components/shared";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Advanced Search - Resource Index",
  description: "Advanced search options for research resources",
};

export default function AdvancedSearchPage() {
  return (
    <Container>
      <Breadcrumb
        items={[
          commonBreadcrumbs.home,
          commonBreadcrumbs.search,
          commonBreadcrumbs.advancedSearch,
        ]}
      />
      <div className="container mx-auto px-4 py-8">
        <h1 className="heading-2 heading-gradient mb-8">Advanced Search</h1>
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <p className="text-gray-600 mb-6">
            Use advanced filters to refine your search results.
          </p>
          {/* Add advanced search form here */}
        </div>
      </div>
    </Container>
  );
}
