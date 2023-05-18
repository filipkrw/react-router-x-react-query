import { FC, ReactNode, createContext, useContext, useState } from "react";

export type WidgetLoadingBar = {
  isLoading: boolean;
  setPageIsLoading: (page: string) => void;
  setPageHasLoaded: (page: string) => void;
};

const LoadingBarContext = createContext<WidgetLoadingBar>(
  {} as WidgetLoadingBar
);

export const LoadingBarProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [latestPage, setLatestPage] = useState<string | null>(null);

  function setPageIsLoading(page: string) {
    setLatestPage(page);
  }

  function setPageHasLoaded(page: string) {
    if (latestPage === page) {
      setLatestPage(null);
    }
  }

  return (
    <LoadingBarContext.Provider
      value={{ isLoading: !!latestPage, setPageIsLoading, setPageHasLoaded }}
    >
      {children}
    </LoadingBarContext.Provider>
  );
};

export const useLoadingBar = () => useContext(LoadingBarContext);
