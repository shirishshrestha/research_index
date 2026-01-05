"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface NavItem {
  id: string;
  label: string;
  href: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

interface JournalSidebarNavProps {
  sections: NavSection[];
}

export const JournalSidebarNav = ({ sections }: JournalSidebarNavProps) => {
  return (
    <div className="sticky top-32 max-h-150 overflow-y-auto px-4 bg-card rounded-md border ">
      <Accordion type="multiple" defaultValue={sections.map((s) => s.title)}>
        {sections.map((section) => (
          <AccordionItem key={section.title} value={section.title}>
            <AccordionTrigger className="text-primary font-medium text-base hover:no-underline">
              {section.title}
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col space-y-1">
                {section.items.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    className="text-primary text-sm py-1.5 px-2 rounded hover:bg-gray-100 transition-colors flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary shrink-0" />
                    {item.label}
                  </a>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
