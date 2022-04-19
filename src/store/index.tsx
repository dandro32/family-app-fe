import { createContext, FC, ReactNode, useContext } from "react";
import Auth from "./auth";
import Lists from "./lists";

const StoresContext = createContext({
  auth: new Auth(),
  lists: new Lists(),
});

const useStores = () => useContext(StoresContext);

interface StoreProviderProps {
  children: ReactNode;
}

const StoreProvider: FC<StoreProviderProps> = ({ children }) => {
  const stores = useStores();

  return (
    <StoresContext.Provider value={stores}>{children}</StoresContext.Provider>
  );
};

export { useStores, StoresContext, StoreProvider };
