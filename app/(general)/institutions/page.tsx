import { MainLayout } from "@/components/layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Institutions - Resource Index",
  description: "Browse academic institutions",
};

export default function InstitutionsPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="heading-2 heading-gradient mb-8">
          Academic Institutions
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Institution cards will go here */}
          <p className="col-span-full text-center text-gray-600">
            Institution listings coming soon...
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
