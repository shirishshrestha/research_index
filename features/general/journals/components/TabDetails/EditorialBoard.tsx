import { Category, CategoryFilter, ListCard } from "@/features/shared";
import type { EditorialBoardMember } from "../../api/journals.server";

const categories: Category[] = [
  { label: "All Members", value: "all" },
  { label: "Editor-in-Chief", value: "editor-in-chief" },
  { label: "Associate Editors", value: "associate-editor" },
  { label: "Editorial Board", value: "editorial-board" },
  { label: "Reviewers", value: "reviewer" },
];

interface EditorialBoardProps {
  editorialBoard: EditorialBoardMember[];
}

export const EditorialBoard = ({ editorialBoard }: EditorialBoardProps) => {
  if (!editorialBoard || editorialBoard.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-text-gray">No editorial board members listed yet.</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[287px_1fr] gap-6">
      <aside className="">
        <div className="flex flex-col gap-1.25 sticky top-32">
          <CategoryFilter categories={categories} />
        </div>
      </aside>
      <div className="space-y-3">
        {editorialBoard.map((member) => (
          <ListCard
            key={member.id}
            id={member.id.toString()}
            name={member.name}
            position={member.role}
          />
        ))}
      </div>
    </div>
  );
};
