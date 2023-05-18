import { QueryClient, QueryFunction, QueryKey } from "@tanstack/react-query";

export function getQueryLoader<
  T = unknown,
  TQueryKey extends QueryKey = QueryKey
>(queryKey: TQueryKey, queryFn: QueryFunction<T, QueryKey>) {
  return (queryClient: QueryClient) => {
    return async () => {
      const data = queryClient.getQueryData<T>(queryKey);
      return data ?? queryClient.fetchQuery(queryKey, queryFn);
    };
  };
}
