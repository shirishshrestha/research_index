import { ProfileSideList } from "@/features/shared/components";
import type { InstitutionProfileProps } from "../../types";
import { RichTextDisplay } from "@/components/shared/RichTextDisplay";

const members = [
  {
    id: "1",
    name: "Dr. Ram Prasad Yadav",
    position: "Associate Professor of Biostatistics, KIST Medical College",
    verifiedEmail: "kist.edu.np",
    href: "/authors/1",
  },
  {
    id: "2",
    name: "Dr. Sita Sharma",
    position: "Professor of Clinical Research, KIST Medical College",
    verifiedEmail: "kist.edu.np",
    href: "/authors/2",
  },
  {
    id: "3",
    name: "Dr. Bikash Thapa",
    position: "Assistant Professor of Public Health, KIST Medical College",
    verifiedEmail: "kist.edu.np",
    href: "/authors/3",
  },
];

export const InstitutionProfileTab = ({
  institution,
}: InstitutionProfileProps) => {
  return (
    <div className="space-y-6 grid gap-12.5 xl:grid-cols-[2fr_1.4fr]">
      <div className="space-y-8.75">
        <div>
          <h4 className="heading-4 mb-3 text-text-black">About</h4>
          <RichTextDisplay content={institution.about} />
        </div>
        <div>
          <h4 className="heading-4 mb-3 text-text-black">Discipline</h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {institution.disciplines.map((discipline) => (
              <li
                key={discipline}
                className="flex items-center gap-2 text-text-gray"
              >
                <span className="w-1.5 h-1.5 rounded-[100%] bg-primary shrink-0" />
                {discipline}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ProfileSideList
        title="Members"
        items={members}
        viewAllHref="/institutions/1/members"
      />
    </div>
  );
};
