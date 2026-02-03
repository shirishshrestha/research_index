import { JournalSidebarNav } from "../JournalSidebarNav";
import type { JournalDetail } from "../../api/journals.server";
import { RichTextDisplay } from "@/components/shared/RichTextDisplay";

interface JournalOverviewTabProps {
  journal: JournalDetail;
}

export const JournalOverviewTab = ({ journal }: JournalOverviewTabProps) => {
  // Generate sidebar sections based on available data
  const sidebarSections = [];

  if (journal.scope || journal.description) {
    sidebarSections.push({
      title: "About the Journal",
      items: [
        { id: "aims-scope", label: "Aims and Scope", href: "#aims-scope" },
        { id: "description", label: "Description", href: "#description" },
      ],
    });
  }

  if (journal.ethics_policies) {
    sidebarSections.push({
      title: "Ethics and Policies",
      items: [
        {
          id: "ethics-policies",
          label: "Ethics and Policies",
          href: "#ethics-policies",
        },
      ],
    });
  }

  if (journal.writing_formatting) {
    sidebarSections.push({
      title: "Author Guidelines",
      items: [
        {
          id: "writing-formatting",
          label: "Writing and Formatting",
          href: "#writing-formatting",
        },
      ],
    });
  }

  if (journal.submitting_manuscript) {
    sidebarSections.push({
      title: "Submission Guidelines",
      items: [
        {
          id: "submitting-manuscript",
          label: "Submitting Your Manuscript",
          href: "#submitting-manuscript",
        },
      ],
    });
  }

  if (journal.help_support) {
    sidebarSections.push({
      title: "Help and Support",
      items: [
        {
          id: "help-support",
          label: "Help and Support",
          href: "#help-support",
        },
      ],
    });
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[287px_1fr] gap-6">
      <aside className="">
        <div className="flex flex-col gap-1.25 sticky top-32">
          {sidebarSections.length > 0 && (
            <JournalSidebarNav sections={sidebarSections} />
          )}
        </div>
      </aside>
      <div>
        {/* About the Journal */}
        {(journal.scope || journal.description) && (
          <section id="about-journal" className="mb-8">
            <h2 className="text-2xl font-bold mb-4">About the Journal</h2>

            {journal.scope && (
              <div id="aims-scope" className="mb-6">
                <h3 className="text-xl font-semibold mb-3">Aims and Scope</h3>
                <div className="prose max-w-none text-text-gray">
                  <RichTextDisplay content={journal.scope} />
                </div>
              </div>
            )}

            {journal.description && (
              <div id="description" className="mb-6">
                <h3 className="text-xl font-semibold mb-3">Description</h3>
                <div className="prose max-w-none text-text-gray">
                  <RichTextDisplay content={journal.description} />
                </div>
              </div>
            )}
          </section>
        )}

        {/* Ethics and Policies */}
        {journal.ethics_policies && (
          <section id="ethics-policies" className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Ethics and Policies</h2>
            <div className="prose max-w-none text-text-gray">
              <RichTextDisplay content={journal.ethics_policies} />
            </div>
          </section>
        )}

        {/* Writing and Formatting */}
        {journal.writing_formatting && (
          <section id="writing-formatting" className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Writing and Formatting</h2>
            <div className="prose max-w-none text-text-gray">
              <RichTextDisplay content={journal.writing_formatting} />
            </div>
          </section>
        )}

        {/* Submitting Your Manuscript */}
        {journal.submitting_manuscript && (
          <section id="submitting-manuscript" className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              Submitting Your Manuscript
            </h2>
            <div className="prose max-w-none text-text-gray">
              <RichTextDisplay content={journal.submitting_manuscript} />
            </div>
          </section>
        )}

        {/* Help and Support */}
        {journal.help_support && (
          <section id="help-support" className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Help and Support</h2>
            <div className="prose max-w-none text-text-gray">
              <RichTextDisplay content={journal.help_support} />
            </div>
          </section>
        )}

        {/* Default message if no content */}
        {!journal.scope &&
          !journal.description &&
          !journal.ethics_policies &&
          !journal.writing_formatting &&
          !journal.submitting_manuscript &&
          !journal.help_support && (
            <div className="text-center py-12">
              <p className="text-text-gray">
                No overview information available yet.
              </p>
            </div>
          )}
      </div>
    </div>
  );
};
