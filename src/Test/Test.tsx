import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { Await, defer, useLoaderData } from "react-router";
import { colorQueryKey } from "../Color/useColor";
import {
  contactLoader,
  contactQueryKey,
  useContact,
} from "../Contact/useContact";
import { UserService } from "../services/UserService";
import { Suspense } from "react";
import { LoaderData } from "../helpers/types";
import { getQueryLoader } from "../helpers/getQueryLoader";

// export function testLoader(
//   queryClient: QueryClient,
//   setIsLoading?: (isLoading: boolean) => void
// ) {
//   return async () => {
//     // queryClient.fetchQuery(contactQueryKey, UserService.getDetails);

//     setIsLoading?.(true);
//     return queryClient
//       .fetchQuery(colorQueryKey, UserService.getFavoriteColor)
//       .finally(() => setIsLoading?.(false));
//   };
// }

export const testLoader = getQueryLoader(
  colorQueryKey,
  UserService.getFavoriteColor
);

function useColor() {
  const data = useLoaderData() as LoaderData<typeof testLoader>;
  return useQuery(colorQueryKey, UserService.getFavoriteColor, {
    initialData: data,
  });
}

export const Test: React.FC = () => {
  const queryClient = useQueryClient();
  const color = useColor();

  return (
    <div>
      {JSON.stringify(color.data)}

      {/* <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={contactLoader(queryClient)()}>
          <TestContact />
        </Await>
      </Suspense> */}
    </div>
  );
};

function TestContact() {
  const contact = useContact();

  return <div>{JSON.stringify(contact.data)}</div>;
}
