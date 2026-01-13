import { PanelContainer } from "./PanelContainer";

interface PanelErrorCardProps {
  title: string;
  description: string;
  message?: string;
}

export function PanelErrorCard({
  title,
  description,
  message = "Unable to load dashboard data. Please try refreshing the page.",
}: PanelErrorCardProps) {
  return (
    <PanelContainer>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary">{title}</h1>
        <p className="mt-2 text-text-gray">{description}</p>
      </div>
      <div className="rounded-xl bg-destructive/10 p-6 text-destructive">
        {message}
      </div>
    </PanelContainer>
  );
}
