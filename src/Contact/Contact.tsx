import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Await } from "react-router";
import { Color } from "../Color/Color";
import { colorLoader } from "../Color/useColor";
import { useContact } from "./useContact";

export const Contact: React.FC = () => {
  const queryClient = useQueryClient();
  const { data } = useContact();

  return (
    <div>
      hi {data.name}
      {/* <React.Suspense fallback={<p>Loading color...</p>}>
        <Await
          resolve={colorLoader(queryClient)()}
          errorElement={<p>Error loading color!</p>}
        >
          <Color />
        </Await>
      </React.Suspense> */}
    </div>
  );
};
