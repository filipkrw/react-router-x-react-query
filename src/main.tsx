import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import ReactDOM from "react-dom/client";
import { Navigate, RouterProvider, useParams } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import { Contact } from "./Contact/Contact";
import { Root } from "./Root";
import "./index.css";
import { contactLoader } from "./Contact/useContact";
import { LoadingBarProvider } from "./components/LoadingBarProvider";

const queryClient = new QueryClient();

const router = createBrowserRouter([
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
        loader: contactLoader(queryClient),
        errorElement: <div>Failed to load contact</div>,
      },
      {
        path: "/about/:test?",
        element: <About />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <LoadingBarProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </LoadingBarProvider>
  </React.StrictMode>
);

function About() {
  const params = useParams();

  if (!params.test) {
    return <Navigate to="/about/hi" replace />;
  }

  return <div>About</div>;
}
