import { QueryClient, QueryFunction, QueryKey } from "@tanstack/react-query";

export function getQueryLoader<
  T = unknown,
  TQueryKey extends QueryKey = QueryKey
>(queryKey: TQueryKey, queryFn: QueryFunction<T, QueryKey>) {
  return (
    queryClient: QueryClient,
    setCurrentlyLoading?: (queryKey: QueryKey) => void
  ) => {
    return async () => {
      const data = queryClient.getQueryData<T>(queryKey);
      if (data) {
        return data;
      }

      setCurrentlyLoading?.(queryKey);
      return queryClient.fetchQuery(queryKey, queryFn);
    };
  };
}
