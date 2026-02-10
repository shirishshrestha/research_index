import { ProfileSideList } from "@/features/shared/components";
import type { AuthorProfileProps } from "../../types";

const coWriters = [
  {
    id: "1",
    name: "Dr. Ram Prasad Yadav",
    position: "Associate Professor of Biostatistics, KIST Medical College",
    verifiedEmail: "kist.edu.np",
    href: "/authors/1",
  },
  {
    id: "2",
    name: "Dr. Ram Prasad Yadav",
    position: "Associate Professor of Biostatistics, KIST Medical College",
    verifiedEmail: "kist.edu.np",
    href: "/authors/2",
  },
  {
    id: "3",
    name: "Dr. Ram Prasad Yadav",
    position: "Associate Professor of Biostatistics, KIST Medical College",
    verifiedEmail: "kist.edu.np",
    href: "/authors/3",
  },
];

export const AuthorProfileTab = ({ author }: AuthorProfileProps) => {
  return (
    <div className="space-y-6 grid gap-12.5 xl:grid-cols-[2fr_1.4fr]">
      <div className="space-y-8.75">
        <div>
          <h4 className="heading-4 mb-3 text-text-black">About</h4>
          <p className="text-text-gray leading-relaxed">
            {author.about || "No information available."}
          </p>
        </div>
        <div>
          <h4 className="heading-4 mb-3 text-text-black">Discipline</h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {author.disciplines.length > 0 ? (
              author.disciplines.map((discipline) => (
                <li
                  key={discipline}
                  className="flex items-center gap-2 text-text-gray"
                >
                  <span className="w-1.5 h-1.5 rounded-[100%] bg-primary shrink-0" />
                  {discipline}
                </li>
              ))
            ) : (
              <li className="text-text-gray">No disciplines available.</li>
            )}
          </ul>
        </div>
      </div>
      <ProfileSideList title="Co-Writers" items={coWriters} viewAllHref="#" />
    </div>
  );
};
