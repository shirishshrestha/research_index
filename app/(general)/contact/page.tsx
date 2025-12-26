import { MainLayout } from "@/components/layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact - Resource Index",
  description: "Get in touch with us",
};

export default function ContactPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="heading-2 heading-gradient mb-8">Contact Us</h1>
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <p className="text-gray-600 mb-6">
            Have questions or suggestions? We'd love to hear from you.
          </p>
          <form className="space-y-4">
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "#131313" }}
              >
                Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#023B8B]"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "#131313" }}
              >
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#023B8B]"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "#131313" }}
              >
                Message
              </label>
              <textarea
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#023B8B]"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#023B8B] text-white py-3 rounded-lg hover:bg-[#012558] transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}
