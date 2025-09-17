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

const list = new LinkedList<SelectSliderButton>();

const initialSliderState = (() =>  {
  SELECT_SLIDER_BUTTONS.forEach(item => list.add(item));
  return {
    currentIndex:list.currentIndex,
    currentItem:list.current ,
    total:list.length ,
    items:list.toArray()
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
      list.next();
      return { 
        ...state,
        currentIndex: list.currentIndex,
        currentItem: list.current 
      };
    }

    case 'PREV': {
      list.prev();
      return { 
        ...state,
        currentIndex: list.currentIndex,
        currentItem: list.current 
      };
    }

    case 'SET_CURRENT': {
      list.setCurrent(action.payload);
      return {
        ...state,
        currentIndex: list.currentIndex,
        currentItem: list.current
      };
    }

    case 'ADD_ITEM': {
      list.add(action.payload);
      return { 
        ...state, 
        total: list.length,
        items: list.toArray()
       };
    }

    default:
      return state;
  }
};

export const useSliderSelector = createReactStore(
  sliderReducer,
  initialSliderState
);