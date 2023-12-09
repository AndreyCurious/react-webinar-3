import { useContext } from "react";
import { DictionaryContext } from "./context";

export default function useDictionary() {
  return useContext(DictionaryContext);
}
