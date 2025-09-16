export type ActionDefault<State> = { type: string; payload?: Partial<State> };
export type Reducer<State, Action = ActionDefault<State>> = (
  state: State,
  action: Action
) => State;
export type Dispatch<Action> = (action: Action) => void;

type Listener = () => void;

export type StoreApi<State, Action = ActionDefault<State>> = {
  getState: () => State;
  getInitialState: () => State;
  subscribe: (listener: () => void) => () => boolean;
  dispatch: (action: Action) => void;
};

export const createStore = <State, InitState extends State, Action = ActionDefault<State>>(
  reducer: Reducer<State, Action>,
  initialArg: InitState,
  init?: (init: InitState) => State
): StoreApi<State, Action> => {
  
  let state: State;
  
  const getInitialState = () => {
    if (init !== undefined) return init(initialArg);
    return initialArg;
  }

  state = getInitialState();

  const listeners: Set<() => void> = new Set();

  const getState = (): State => {
    return state;
  };

  const subscribe = (listener: Listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  const dispatch = (action: Action) => {
    const nextState = reducer(state, action);
    
    if (!Object.is(nextState, state)) {
      state = nextState;
      listeners.forEach((listener) => listener());
    }
  };

  return { getState, getInitialState, subscribe, dispatch };
};