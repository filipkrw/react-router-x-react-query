import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import { useLoadingBar } from "./components/LoadingBarProvider";
import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { contactQueryKey } from "./Contact/useContact";

export const Root: React.FC = () => {
  const { isLoading } = useLoadingBar();
  const queryClient = useQueryClient();

  // console.log(queryClient.getQueryCache());
  // const queries = queryClient.getQueriesData(["page"]);

  // const isLoading = queries.some((query) => query[1]);

  return (
    <div>
      {isLoading ? <div>Loading...</div> : null}
      <Link to="/">Home</Link> | <Link to="/contact">Contact</Link> |{" "}
      <Link to="/about">About</Link> | <Link to="/test">Test</Link>
      <br />
      <Outlet />
    </div>
  );
};
