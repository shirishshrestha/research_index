export const AllIssuesTab = () => {
  const volumes = [
    {
      year: 2025,
      volume: 5,
      issues: [
        { issue: 2, month: "December", articles: 12 },
        { issue: 1, month: "June", articles: 10 },
      ],
    },
    {
      year: 2024,
      volume: 4,
      issues: [
        { issue: 2, month: "December", articles: 15 },
        { issue: 1, month: "June", articles: 11 },
      ],
    },
    {
      year: 2023,
      volume: 3,
      issues: [
        { issue: 2, month: "December", articles: 14 },
        { issue: 1, month: "June", articles: 13 },
      ],
    },
  ];

  return (
    <div className="py-8">
      <div className="space-y-8">
        {volumes.map((vol) => (
          <div key={vol.volume} className="space-y-4">
            <h3 className="heading-4 text-text-black">
              Volume {vol.volume} ({vol.year})
            </h3>
            <div className="grid gap-4">
              {vol.issues.map((issue) => (
                <div
                  key={issue.issue}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="heading-para text-text-black">
                        Issue {issue.issue} - {issue.month} {vol.year}
                      </p>
                      <p className="sub-body text-text-gray mt-1">
                        {issue.articles} articles
                      </p>
                    </div>
                    <a
                      href="#"
                      className="text-primary underline text-sm whitespace-nowrap"
                    >
                      View issue →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
