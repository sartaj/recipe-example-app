import { StackActions, useNavigation } from "@react-navigation/native";
import { Container, ListItem, Spinner, Text } from "native-base";
import * as React from "react";
import { FlatList } from "react-native";
import { getRecipes } from "../graph-queries/graphq-queries";
import { Recipe } from "../graph-queries/types";
import { useSelector, useDispatch } from "../state-management-system";
import {
  RECIPES_LIST_SUCCESS_GET_DATA,
  RECIPES_LIST_SELECT_RECIPE,
} from "./recipes-list.reducer";

const RecipeListItem: React.FC<{ recipe: Recipe; recipeIndex: number }> = ({
  recipe,
  recipeIndex,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const navigateTo = () => {
    dispatch({
      type: RECIPES_LIST_SELECT_RECIPE,
      payload: recipeIndex,
    });
    navigation.dispatch(StackActions.push("Recipe"));
  };
  return (
    <ListItem noIndent onPress={navigateTo}>
      <Text>{recipe.name}</Text>
    </ListItem>
  );
};

export const RecipeListView: React.FC = () => {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.RecipesList.recipes);

  React.useEffect(() => {
    async function getRecipesEffect() {
      const result = await getRecipes();
      dispatch({ type: RECIPES_LIST_SUCCESS_GET_DATA, payload: result });
    }
    getRecipesEffect();
  }, []);

  if (!recipes.length) return <Spinner />;
  return (
    <Container>
      <FlatList<Recipe>
        data={recipes}
        renderItem={({ item, index }) => (
          <RecipeListItem recipe={item} recipeIndex={index} key={index} />
        )}
        keyExtractor={(_, index) => index.toString()}
      />
    </Container>
  );
};
