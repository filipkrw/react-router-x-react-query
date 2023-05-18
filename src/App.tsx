import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useMemo, useState } from "react";
import { Navigate, RouterProvider, useMatches, useParams } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import { Contact } from "./Contact/Contact";
import { contactLoader } from "./Contact/useContact";
import { Root } from "./Root";
import { Test, testLoader } from "./Test/Test";

const queryClient = new QueryClient();

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

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
            },
            {
              path: "/contact",
              element: <Contact />,
              loader: contactLoader(queryClient, setIsLoading),
              errorElement: <div>Failed to load contact</div>,
            },
            {
              path: "/about/:test?",
              element: <About />,
            },
            {
              path: "/test",
              element: <Test />,
              loader: testLoader(queryClient, setIsLoading),
            },
          ],
        },
      ]),
    []
  );

  return (
    <QueryClientProvider client={queryClient}>
      <div
        className="loading-bar"
        style={isLoading ? { opacity: 1 } : { opacity: 0 }}
      />
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

function About() {
  const params = useParams();

  if (!params.test) {
    return <Navigate to="/about/hi" replace />;
  }

  return <div>About</div>;
}
