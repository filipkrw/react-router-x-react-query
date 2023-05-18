import { useLoaderData } from "react-router";
import { UserService } from "../services/UserService";
import { getQueryLoader } from "../helpers/getQueryLoader";
import { LoaderData } from "../helpers/types";
import { useQuery } from "@tanstack/react-query";

export const contactQueryKey = ["contact"];

export const contactLoader = getQueryLoader(
  contactQueryKey,
  UserService.getDetails
);

export function useContact() {
  const initialData = useLoaderData() as LoaderData<typeof contactLoader>;
  return useQuery(contactQueryKey, UserService.getDetails, { initialData });
}
