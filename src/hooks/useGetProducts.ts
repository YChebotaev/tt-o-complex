import { useInfiniteQuery } from "@tanstack/react-query";
import type { Pagination } from "@/lib/apiClient/types";
import { useApiClient } from "./useApiClient";

export const useGetProducts = ({ page, pageSize }: Pagination) => {
  const apiClient = useApiClient();

  return useInfiniteQuery({
    queryKey: ["products", { page, pageSize }],
    queryFn: ({ pageParam }) => apiClient.getProducts(pageParam),
    initialPageParam: { page, pageSize },
    getNextPageParam(_lastPage, _allPages, lastPageParam) {
      return { ...lastPageParam, page: lastPageParam.page + 1 }
    },
    getPreviousPageParam(_firstPage, _allPages, firstPageParam) {
      return { ...firstPageParam, page: firstPageParam.page - 1 }
    }
  });
}
