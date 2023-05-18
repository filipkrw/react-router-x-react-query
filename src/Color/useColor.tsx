import { useQuery } from "@tanstack/react-query";
import { UserService } from "../services/UserService";
import { getQueryLoader } from "../helpers/getQueryLoader";
import { LoaderData } from "../helpers/types";
import { useLoaderData } from "react-router";

export const colorQueryKey = ["color"];

export const colorLoader = getQueryLoader(
  colorQueryKey,
  UserService.getFavoriteColor
);

export function useColor() {
  const initialData = useLoaderData() as LoaderData<typeof colorLoader>;
  return useQuery(colorQueryKey, UserService.getFavoriteColor, {
    initialData,
  });
}
