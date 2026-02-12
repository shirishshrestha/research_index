import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

interface ExpertiseAreaItem {
  id: number;
  name: string;
  slug: string;
}

interface ExpertiseArea {
  results: ExpertiseAreaItem[];
}

export const useExpertiseAreasQuery = () => {
  return useQuery<ExpertiseAreaItem[]>({
    queryKey: ["expertise-areas"],
    queryFn: async () => {
      const response = await api.get<ExpertiseArea>("/publications/topics/");
      return response.results;
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};
