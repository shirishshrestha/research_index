import { Category, CategoryFilter, ListCard } from "@/features/shared";

const categories: Category[] = [
  { label: "Editorial Board", value: "editorial-board" },
  { label: "Editorial Chief", value: "editorial-chief" },
];

const mockAuthors = [
  {
    id: "1",
    name: "Dr. Ram Prasad Yadav",
    position: "Associate Professor of Biostatistics, KRI Medical College",
    affiliation: "Kathmandu University (KU)",
    verifiedAffiliation: "Verified central.kathmandu.p",
  },
  {
    id: "2",
    name: "Dr. Ram Prasad Yadav",
    position: "Associate Professor of Biostatistics, KRI Medical College",
    affiliation: "Kathmandu University (KU)",
    verifiedAffiliation: "Verified central.kathmandu.p",
  },
  {
    id: "3",
    name: "Dr. Ram Prasad Yadav",
    position: "Associate Professor of Biostatistics, KRI Medical College",
    affiliation: "Kathmandu University (KU)",
    verifiedAffiliation: "Verified central.kathmandu.p",
  },
  {
    id: "4",
    name: "Dr. Ram Prasad Yadav",
    position: "Associate Professor of Biostatistics, KRI Medical College",
    affiliation: "Kathmandu University (KU)",
    verifiedAffiliation: "Verified central.kathmandu.p",
  },
  {
    id: "5",
    name: "Dr. Ram Prasad Yadav",
    position: "Associate Professor of Biostatistics, KRI Medical College",
    affiliation: "Kathmandu University (KU)",
    verifiedAffiliation: "Verified central.kathmandu.p",
  },
];

export const EditorialBoard = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[287px_1fr] gap-6">
      <aside className="">
        <div className="flex flex-col gap-1.25 sticky top-32">
          <CategoryFilter categories={categories}  />
        </div>
      </aside>
      <aside className="space-y-6.25">
        {mockAuthors.map((author) => (
          <ListCard key={author.id} {...author} href="/authors/1" />
        ))}
      </aside>
    </div>
  );
};
