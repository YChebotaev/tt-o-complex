import { useQuery } from "@tanstack/react-query";
import { useApiClient } from "./useApiClient";

export const useGetReviews = () => {
  const apiClient = useApiClient();

  return useQuery({
    queryKey: ["reviews"],
    queryFn: () => apiClient.getReviews(),
  });
}
