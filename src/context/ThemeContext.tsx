import { createContext, useContext, useMemo, useReducer } from "react";

type Theme = "light" | "dark";
type State = { theme: Theme };
type Action = { type: "TOGGLE" };

function reducer(state: State, action: Action): State {
  if (action.type === "TOGGLE") {
    return { theme: state.theme === "light" ? "dark" : "light" };
  }
  return state;
}

const Ctx = createContext<{ theme: Theme; toggle: () => void } | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { theme: "light" });
  const value = useMemo(
    () => ({ theme: state.theme, toggle: () => dispatch({ type: "TOGGLE" }) }),
    [state.theme]
  );

  document.documentElement.dataset.theme = state.theme;
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useTheme() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useTheme deve ser usado dentro de <ThemeProvider>");
  return ctx;
}
