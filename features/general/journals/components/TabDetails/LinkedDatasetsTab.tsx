export const LinkedDatasetsTab = () => {
  const datasets = [
    {
      id: 1,
      title: "Himalayan Climate Data Archive (2000-2025)",
      description:
        "Comprehensive climate data including temperature, precipitation, and snow cover measurements from 50+ monitoring stations across the Himalayan region.",
      repository: "Zenodo",
      doi: "10.5281/zenodo.1234567",
      articles: 8,
    },
    {
      id: 2,
      title: "Biodiversity Inventory of Nepal National Parks",
      description:
        "Species distribution data and ecological surveys conducted in major protected areas of Nepal from 2015-2024.",
      repository: "Dryad",
      doi: "10.5061/dryad.abc123",
      articles: 5,
    },
    {
      id: 3,
      title: "Water Quality Monitoring Dataset - Himalayan Rivers",
      description:
        "Physicochemical and biological water quality parameters from major river systems in the Himalayan watershed.",
      repository: "Figshare",
      doi: "10.6084/m9.figshare.7654321",
      articles: 12,
    },
  ];

  return (
    <div className="py-8">
      <p className="sub-body text-text-gray mb-6">
        Research datasets associated with articles published in this journal.
        These datasets are hosted in external repositories and are freely
        accessible.
      </p>
      <div className="space-y-6">
        {datasets.map((dataset) => (
          <div key={dataset.id} className="border rounded-lg p-6 space-y-3">
            <h3 className="heading-4 text-text-black">{dataset.title}</h3>
            <p className="sub-body">{dataset.description}</p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div>
                <span className="text-text-gray">Repository:</span>{" "}
                <span className="text-text-black font-medium">
                  {dataset.repository}
                </span>
              </div>
              <div>
                <span className="text-text-gray">DOI:</span>{" "}
                <a href="#" className="text-primary underline">
                  {dataset.doi}
                </a>
              </div>
              <div>
                <span className="text-text-gray">Linked articles:</span>{" "}
                <span className="text-text-black font-medium">
                  {dataset.articles}
                </span>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <a
                href="#"
                className="text-primary underline text-sm font-medium"
              >
                View dataset →
              </a>
              <a
                href="#"
                className="text-primary underline text-sm font-medium"
              >
                View related articles →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
