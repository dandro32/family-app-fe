import { createContext, FC, ReactNode, useContext } from "react";
import { enableStaticRendering } from "mobx-react-lite";
import Auth from "./auth";
import Lists from "./lists";
import ListDetails from "./listDetails";
import Notifications from "./notifications";
import Tasks from "./tasks";

enableStaticRendering(typeof window === "undefined");

const notificationStore = new Notifications();
const authStore = new Auth(notificationStore);
const StoresContext = createContext({
  auth: authStore,
  lists: new Lists(notificationStore),
  listDetails: new ListDetails(notificationStore),
  notifications: notificationStore,
  tasks: new Tasks(authStore, notificationStore),
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
