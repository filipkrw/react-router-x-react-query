import { QueryKey, useIsFetching } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useMemo, useState } from "react";
import { Navigate, RouterProvider, useMatches, useParams } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import { Contact } from "./Contact/Contact";
import { contactLoader } from "./Contact/useContact";
import { Root } from "./Root";
import { Test, testLoader } from "./Test/Test";
import { queryClient } from "./main";

export const App: React.FC = () => {
  const [currentlyLoading, setCurrentlyLoading] = useState<QueryKey | null>();

  const isLoading =
    useIsFetching({
      predicate: (query) => {
        return (
          query.state.status === "loading" &&
          query.queryKey[0] === currentlyLoading?.[0]
        );
      },
    }) > 0;

  function idleLoader() {
    setCurrentlyLoading(null);
    return null;
  }

  const router = useMemo(
    () =>
      createBrowserRouter([
        {
          path: "/",
          element: <Root />,
          children: [
            {
              path: "/",
              element: <div>Homepage</div>,
              loader: idleLoader,
            },
            {
              path: "/contact",
              element: <Contact />,
              loader: contactLoader(queryClient, setCurrentlyLoading),
              errorElement: <div>Failed to load contact</div>,
            },
            {
              path: "/about/:test?",
              element: <About />,
              loader: idleLoader,
            },
            {
              path: "/test",
              element: <Test />,
              loader: testLoader(queryClient, setCurrentlyLoading),
            },
          ],
        },
      ]),
    []
  );

  return (
    <>
      <div
        className="loading-bar"
        style={isLoading ? { opacity: 1 } : { opacity: 0 }}
      />
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
};

function About() {
  const params = useParams();

  if (!params.test) {
    return <Navigate to="/about/hi" replace />;
  }

  return <div>About</div>;
}
