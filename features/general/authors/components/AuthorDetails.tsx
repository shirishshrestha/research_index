import {
  ProfileCard,
  ProfileStats,
  ProfileTabs,
} from "@/features/shared/components/profile";
import { ChevronDown } from "lucide-react";
import { AuthorProfileTab, FollowingTab, ResearchTab } from "./TabDetails";

export function AuthorDetails() {
  // Mock data for demonstration
  const author = {
    name: "Dr. Ram Prasad Yadav",
    position: "Associate Professor of Biostatistics",
    affiliation: "KIST Medical College, Nepal",
    verifiedEmail: "kist.edu.np",
    hIndex: 40,
    iIndex: 0,
    citations: 7465,
    about: `I am an Associate Professor of Biostatistics at KIST Medical College, Nepal. My work focuses on applying statistical modeling and data analysis to medical and epidemiological research. I am passionate about advancing evidence-based studies and supporting interdisciplinary collaborations that integrate quantitative methods into clinical sciences.`,
    disciplines: [
      "Biostatistics",
      "Epidemiology",
      "Public Health Research",
      "Data Analysis",
      "Research Methodology",
    ],
  };

  return (
    <div className="section-padding pt-0!">
      <div className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 xl:gap-20">
          <ProfileCard
            name={author.name}
            position={author.position}
            affiliation={author.affiliation}
            verifiedEmail={author.verifiedEmail}
          />
          <ProfileStats
            hIndex={author.hIndex}
            iIndex={author.iIndex}
            citations={author.citations}
          />
        </div>
      </div>
      <div className="">
        <ProfileTabs
          clearParamsOnTabSwitch={{ research: ["category"] }}
          tabs={[
            {
              label: "Profile",
              value: "profile",
              content: <AuthorProfileTab author={author} />,
            },
            {
              label: "Research",
              value: "research",
              content: <ResearchTab />,
            },
            {
              label: "Reviews",
              value: "reviews",
              content: (
                <div className="text-center py-16">
                  <p className="text-text-gray">
                    Reviews will be displayed here
                  </p>
                </div>
              ),
            },
            {
              label: "Stats",
              value: "stats",
              content: (
                <div className="text-center py-16">
                  <p className="text-text-gray">
                    Detailed statistics will be displayed here
                  </p>
                </div>
              ),
            },
            {
              label: "Following",
              value: "following",
              content: <FollowingTab />,
            },
          ]}
          moreOptions={
            <div>
              <p className="flex items-center gap-1.5 heading-para">
                More <ChevronDown className="stroke-[1.6px] " size={18} />
              </p>
            </div>
          }
        />
      </div>
    </div>
  );
}
