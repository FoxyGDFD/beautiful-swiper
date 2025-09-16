// useSliderSelector.ts
import { LinkedList } from "@shared/lib/data-structures/linked-list";
import { createReactStore } from "@shared/lib/store";

export type SelectSliderButton = {id: number};

export const SELECT_SLIDER_BUTTONS = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 }
];

// Базовое состояние
const initialSliderState = (() =>  {
  const list = new LinkedList<SelectSliderButton>();
  SELECT_SLIDER_BUTTONS.forEach(item => list.add(item));
  return {
    list,
    get currentIndex() { return this.list.currentIndex; },
    get currentItem() { return this.list.current; },
    get total() { return this.list.length; },
    get items() { return this.list.toArray(); }
  };
})()


type NumberSliderState = typeof initialSliderState;

type NumberSliderAction =
  | { type: 'NEXT' }
  | { type: 'PREV' }
  | { type: 'SET_CURRENT'; payload: SelectSliderButton }
  | { type: 'SET_INDEX'; payload: SelectSliderButton }
  | { type: 'ADD_ITEM'; payload: SelectSliderButton }
  | { type: 'REMOVE_CURRENT' }
  | { type: 'RESET' };


const sliderReducer = (
  state: NumberSliderState,
  action: NumberSliderAction
): NumberSliderState => {
  switch (action.type) {
    case 'NEXT': {
      state.list.next();
      return { ...state };
    }

    case 'PREV': {
      state.list.prev();
      return { ...state };
    }

    case 'SET_CURRENT': {
      state.list.setCurrent(action.payload);
      return { ...state };
    }

    case 'ADD_ITEM': {
      state.list.add(action.payload);
      return { ...state };
    }

    case 'REMOVE_CURRENT': {
      if (state.list.length > 0) {
        state.list.removeCurrent();
      }
      return { ...state };
    }

    default:
      return state;
  }
};

export const useSliderSelector = createReactStore(
  sliderReducer,
  initialSliderState
);