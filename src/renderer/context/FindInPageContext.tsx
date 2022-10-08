import { createContext, useState } from 'react';

type FindInPageContextProps = {
  isShowFind: boolean;
  setShowFind: React.Dispatch<React.SetStateAction<boolean>>;
};

export const FindInPageContext = createContext<Partial<FindInPageContextProps>>(
  {}
);

type FindInPageContextProviderProps = {
  children: React.ReactNode;
};

export const FindInPageProvider = ({
  children,
}: FindInPageContextProviderProps) => {
  const [isShowFind, setShowFind] = useState<boolean>(false);

  return (
    <FindInPageContext.Provider value={{ isShowFind, setShowFind }}>
      {children}
    </FindInPageContext.Provider>
  );
};
