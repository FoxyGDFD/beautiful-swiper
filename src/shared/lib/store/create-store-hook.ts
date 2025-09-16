import { useSyncExternalStore } from "react";
import { createStore, type ActionDefault, type Dispatch, type Reducer } from "./create-store";


// Source https://habr.com/ru/articles/881668/ (I quoted it from my article because I`m too lazy for installing zustand for 1 tiny store)
export const createReactStore = <
  State extends object,
  Action = ActionDefault<State>
>(
  reducer: Reducer<State, Action>,
  initialValue: State
) => {
  const vanillaStore = createStore(reducer, initialValue);

  const useStore = <Selected = State>(
    selector: (state: State) => Selected = (state) =>
      state as unknown as Selected
  ): Selected & { dispatch: Dispatch<Action> } => {
    return {
      ...useSyncExternalStore(
        vanillaStore.subscribe,
        () => selector(vanillaStore.getState()) as Selected
      ),
      dispatch: vanillaStore.dispatch,
    };
  };

  return useStore;
};