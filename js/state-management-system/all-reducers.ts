import * as checkout from "../checkout-view/checkout.reducer";
import * as recipeView from "../recipe-view/recipe.reducer";
import * as recipesList from "../recipes-list-view/recipes-list.reducer";
import { combineReducers } from "redux";

export const allReducers = {
  ...recipesList.register,
  ...recipeView.register,
  //   ...checkout.register,
};
