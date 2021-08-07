import { createContext } from "react";

export const historyContext = createContext();

export function HistoryProvider(props) {
  return <historyContext.Provider {...props} />;
}
