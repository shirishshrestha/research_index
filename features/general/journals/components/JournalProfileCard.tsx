import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import type { JournalDetails } from "../types";

export const JournalProfileCard = ({
  journal,
}: {
  journal: JournalDetails;
}) => {
  return (
    <Card className="p-0! border-0 bg-background shadow-none mb-0!">
      <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
        <div className="rounded-md ">
          {journal.journalCover ? (
            <Image
              src={journal.journalCover}
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
          <p className="sub-body mb-1.25">{journal.institution}</p>
          <div className="space-y-0.5">
            <p className="desc">
              ISSN:&nbsp;
              <a href="#" className="text-primary underline">
                {journal.issn}
              </a>
            </p>
            <p className="desc">
              DOI Prefix:&nbsp;
              <a href="#" className="text-primary underline">
                {journal.doiPrefix}
              </a>
            </p>
            <p className="desc">License: {journal.license}</p>
          </div>
          <Button size="sm" variant={"outline"} className="follow-button">
            Follow
          </Button>
        </div>
      </div>
    </Card>
  );
};
