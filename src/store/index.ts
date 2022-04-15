import { createContext, useContext } from "react";
import Auth from "./auth";
import Lists from "./lists";

export const storesContext = createContext({
  auth: new Auth(),
  lists: new Lists(),
});

const useStores = () => useContext(storesContext);

export default useStores;
