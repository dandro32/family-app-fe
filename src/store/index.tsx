import { createContext, FC, ReactNode, useContext } from "react";
import { enableStaticRendering } from "mobx-react-lite";
import Auth from "./auth";
import Lists from "./lists";
import ListDetails from "./listDetails";
import Tasks from "./tasks";

enableStaticRendering(typeof window === "undefined");

const authStore = new Auth();
const StoresContext = createContext({
  auth: authStore,
  lists: new Lists(),
  listDetails: new ListDetails(),
  tasks: new Tasks(authStore),
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
