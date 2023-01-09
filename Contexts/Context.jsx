import { createContext, useReducer } from "react";
import produce from "immer";
import { useState } from "react";

export const AppContext = createContext({
  tab: {},
  updateTab: () => {},
  resetTab: () => {},
  activePlayer: null,
  switchPlayer: () => {},
});
const ContextProvider = ({ children }) => {
  const Board = {
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
    9: "",
  };
  const [activePlayer, setActivePlayer] = useState(true);
  const [tab, setTab] = useReducer((state, action) => {
    switch (action.type) {
      case "play":
        const updated = produce(state, (draft) => {
          draft[action.payload.e] = action.payload.character;
        });
        return updated;
      case "reset":
        return Board;
      default:
        return state;
    }
  }, Board);

  const updateTab = (e, character) => {
    setTab({ type: "play", payload: { character, e } });
    return tab;
  };
  const switchPlayer = () => setActivePlayer(!activePlayer);
  const resetTab = () => setTab({ type: "reset" });
  const value = {
    tab,
    updateTab,
    resetTab,
    activePlayer,
    switchPlayer,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default ContextProvider;
