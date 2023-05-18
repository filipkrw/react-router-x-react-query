import { QueryClient, QueryFunction, QueryKey } from "@tanstack/react-query";

export function getQueryLoader<
  T = unknown,
  TQueryKey extends QueryKey = QueryKey
>(queryKey: TQueryKey, queryFn: QueryFunction<T, QueryKey>) {
  return (
    queryClient: QueryClient,
    setIsLoading?: (isLoading: boolean) => void
  ) => {
    return async () => {
      const data = queryClient.getQueryData<T>(queryKey);
      if (data) {
        return data;
      }
      setIsLoading?.(true);
      const result = await queryClient.fetchQuery(queryKey, queryFn);
      setIsLoading?.(false);
      return result;
    };
  };
}
