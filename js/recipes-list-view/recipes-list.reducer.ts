import { Reducer } from "redux";
import { Recipe } from "../recipe-queries/recipe-queries";

type RecipeListState = {
  recipes: Recipe[];
};

type RecipeActions = {
  type: typeof RECIPES_LIST_SUCCESS_GET_DATA;
  payload: Recipe[];
};

export const RECIPES_LIST_SUCCESS_GET_DATA = "RECIPES_LIST_SUCCESS_GET_DATA";

const defaultState = {
  recipes: [],
};

export const reducer: Reducer<RecipeListState, RecipeActions> = (
  state = defaultState,
  action
) => {
  switch (action.type) {
    case RECIPES_LIST_SUCCESS_GET_DATA:
      return {
        ...state,
        recipes: action.payload,
      };
    default:
      return state;
  }
};

export const register = { RecipesList: reducer };
