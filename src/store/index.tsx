import { createContext, FC, ReactNode, useContext } from "react";
import { enableStaticRendering } from "mobx-react-lite";
import Auth from "./auth";
import Lists from "./lists";

enableStaticRendering(typeof window === "undefined");

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
