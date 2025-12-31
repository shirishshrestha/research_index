import {
  ProfileCard,
  ProfileStats,
  ProfileTabs,
} from "@/features/shared/components/profile";
import { ChevronDown } from "lucide-react";
import { InstitutionProfileTab, ResearchTab } from "./TabDetails";

export function InstitutionDetails() {
  // Mock data for demonstration
  const institution = {
    name: "KAHS",
    position: "Karnali Academy of Health Sciences (KAHS)",
    affiliation: "Karnali Province",
    verifiedEmail: "kahs.org.np",
    hIndex: 40,
    iIndex: 0,
    citations: 7465,
    about: `The Journal of Karnali Academy of Health Sciences (JKAHS) is a peer-reviewed, open-access journal dedicated to advancing medical and health sciences research in Nepal and beyond. It publishes original research articles, reviews, and case studies that address clinical practice, public health, and biomedical innovation. The journal aims to foster evidence-based healthcare, promote academic integrity, and support the dissemination of knowledge that contributes to improving health outcomes in rural and urban communities alike.`,
    disciplines: [
      "Medical Science",
      "Clinical Research",
      "Public Health",
      "Nursing and Allied Health",
      "Biomedical Research",
    ],
  };

  return (
    <div className="section-padding pt-0!">
      <div className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 xl:gap-20">
          <ProfileCard
            name={institution.name}
            position={institution.position}
            affiliation={institution.affiliation}
            verifiedEmail={institution.verifiedEmail}
            isInstitution
          />
          <ProfileStats
            hIndex={institution.hIndex}
            iIndex={institution.iIndex}
            citations={institution.citations}
          />
        </div>
      </div>
      <div className="">
        <ProfileTabs
          tabs={[
            {
              label: "Profile",
              value: "profile",
              content: <InstitutionProfileTab institution={institution} />,
            },
            {
              label: "Research",
              value: "research",
              content: <ResearchTab />,
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
              label: "Members",
              value: "members",
              content: (
                <div className="text-center py-16">
                  <p className="text-text-gray">
                    Institution members will be displayed here
                  </p>
                </div>
              ),
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
