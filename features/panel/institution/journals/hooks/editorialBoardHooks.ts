import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

interface ExpertiseArea {
  id: number;
  name: string;
  slug: string;
}

export const useExpertiseAreasQuery = () => {
  return useQuery<ExpertiseArea[]>({
    queryKey: ["expertise-areas"],
    queryFn: async () => {
      const response = await api.get<ExpertiseArea[]>("/publications/topics/");
      return response;
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};
