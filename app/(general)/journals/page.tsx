import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Journals - Resource Index",
  description: "Browse academic journals",
};

export default function JournalsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="heading-2 heading-gradient mb-8">Academic Journals</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Journal cards will go here */}
        <p className="col-span-full text-center text-gray-600">
          Journal listings coming soon...
        </p>
      </div>
    </div>
  );
}
