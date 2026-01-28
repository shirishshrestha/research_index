import { Card } from "@/components/ui/card";
import Image from "next/image";
import type { JournalDetail } from "../api/journals.server";

export const JournalProfileCard = ({ journal }: { journal: JournalDetail }) => {
  return (
    <Card className="p-0! border-0 bg-background shadow-none mb-0!">
      <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
        <div className="rounded-md ">
          {journal.cover_image_url ? (
            <Image
              src={journal.cover_image_url}
              alt={`${journal.title} Cover`}
              width={130}
              height={175}
              className=" object-cover"
            />
          ) : (
            <Image
              src={"/placeholder.jpg"}
              alt="Placeholder Cover"
              width={130}
              height={175}
              className=" object-cover"
            />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="heading-4 text-text-black mb-1.25 wrap-break-word">
            {journal.title}
          </h4>
          <p className="sub-body mb-1.25">{journal.institution_name}</p>
          <div className="space-y-0.5">
            {journal.issn && (
              <p className="desc">
                ISSN:&nbsp;
                <a href="#" className="text-primary underline">
                  {journal.issn}
                </a>
              </p>
            )}
            {journal.e_issn && (
              <p className="desc">
                E-ISSN:&nbsp;
                <a href="#" className="text-primary underline">
                  {journal.e_issn}
                </a>
              </p>
            )}
            {journal.doi_prefix && (
              <p className="desc">
                DOI Prefix:&nbsp;
                <a href="#" className="text-primary underline">
                  {journal.doi_prefix}
                </a>
              </p>
            )}
            <p className="desc">
              License: {journal.is_open_access ? "Open Access" : "Subscription"}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};
