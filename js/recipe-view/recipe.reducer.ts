import { Reducer, Action } from "redux";

type RecipeViewActions = {
  type: "CHECKOUT";
};

const defaultState = {};
const reducer: Reducer<typeof defaultState, RecipeViewActions> = (
  state = defaultState,
  action
) => {
  return state;
};

export const register = { RecipeView: reducer };
