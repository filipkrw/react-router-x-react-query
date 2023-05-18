import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navigate, RouterProvider, useParams } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import { Contact } from "./Contact/Contact";
import { contactLoader } from "./Contact/useContact";
import { Root } from "./Root";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useMemo, useState } from "react";

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
