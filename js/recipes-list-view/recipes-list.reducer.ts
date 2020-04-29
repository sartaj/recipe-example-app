import { Reducer } from "redux";
import { Recipe } from "../recipe-queries/recipe-queries";

type RecipeListState = {
  recipes: Recipe[];
  selectedRecipe: number;
};

type RecipeActions =
  | {
      type: typeof RECIPES_LIST_SUCCESS_GET_DATA;
      payload: Recipe[];
    }
  | {
      type: typeof RECIPES_LIST_SELECT_RECIPE;
      payload: number;
    };

export const RECIPES_LIST_SUCCESS_GET_DATA = "RECIPES_LIST_SUCCESS_GET_DATA";
export const RECIPES_LIST_SELECT_RECIPE = "RECIPES_LIST_SELECT_RECIPE";

const defaultState = {
  recipes: [],
  selectedRecipe: 0,
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
    case RECIPES_LIST_SELECT_RECIPE:
      return {
        ...state,
        selectedRecipe: action.payload,
      };
    default:
      return state;
  }
};

export const register = { RecipesList: reducer };
