import { createContext, useContext } from "react";
import Lists from "./lists";

export const storesContext = createContext({
  lists: new Lists(),
});

const useStores = () => useContext(storesContext);

export default useStores;
