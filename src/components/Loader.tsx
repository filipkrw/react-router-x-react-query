import { Suspense } from "react";
import { Await, AwaitProps } from "react-router";

export const Loader: React.FC<
  AwaitProps & {
    fallback: React.ReactNode;
    children: (data: any) => React.ReactNode;
  }
> = ({ resolve, fallback, errorElement, children }) => {
  return (
    <Suspense fallback={fallback}>
      <Await resolve={resolve} errorElement={errorElement}>
        {(data) => <pre>{JSON.stringify(data, null, 2)}</pre>}
      </Await>
    </Suspense>
  );
};
