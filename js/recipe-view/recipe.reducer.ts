import { Reducer, Action } from "redux";
import { omit } from "lodash/fp";

export const RECIPE_VIEW_SELECT_INGREDIENT = "RECIPE_VIEW_SELECT_INGREDIENT";
export const RECIPE_VIEW_CHANGE_CART_VALUE = "RECIPE_VIEW_CHANGE_CART_VALUE";

type RecipeViewActions =
  | {
      type: typeof RECIPE_VIEW_SELECT_INGREDIENT;
      payload: number;
    }
  | {
      type: typeof RECIPE_VIEW_CHANGE_CART_VALUE;
      payload: {
        itemIndex: number;
        value: number;
      };
    };

type RecipeViewState = {
  cartDraft: {
    [s: number]: {
      value: number;
    };
  };
};
const defaultState = {
  cartDraft: {},
};

const reducer: Reducer<RecipeViewState, RecipeViewActions> = (
  state = defaultState,
  action
) => {
  switch (action.type) {
    case RECIPE_VIEW_SELECT_INGREDIENT:
      return {
        cartDraft: state.cartDraft[action.payload]
          ? omit(action.payload, state.cartDraft)
          : {
              ...state.cartDraft,
              [action.payload]: { value: 1 },
            },
      };
    case RECIPE_VIEW_CHANGE_CART_VALUE:
      return {
        cartDraft: {
          ...state.cartDraft,
          [action.payload.itemIndex]: { value: action.payload.value },
        },
      };
    default:
      return state;
  }
};

export const register = { RecipeView: reducer };
