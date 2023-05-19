import { useIsFetching } from "@tanstack/react-query";
import { Outlet, useLocation } from "react-router";
import { Link } from "react-router-dom";

export const Root: React.FC = () => {
  return (
    <div>
      <Link to="/">Home</Link> | <Link to="/contact">Contact</Link> |{" "}
      <Link to="/about">About</Link> | <Link to="/test">Test</Link>
      <br />
      <Outlet />
    </div>
  );
};
