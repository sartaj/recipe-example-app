import { StackActions, useNavigation } from "@react-navigation/native";
import { Container, ListItem, Spinner, Text } from "native-base";
import * as React from "react";
import { FlatList } from "react-native";
import { getRecipes, Recipe } from "../recipe-queries/recipe-queries";
import { useSelector, useDispatch } from "../state-management-system";
import { RECIPES_LIST_SUCCESS_GET_DATA } from "./recipes-list.reducer";

const RecipeListItem: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  const navigation = useNavigation();
  const navigateTo = () => {
    navigation.dispatch(
      StackActions.push("Recipe", {
        recipe,
      })
    );
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
          <RecipeListItem recipe={item} key={index} />
        )}
        keyExtractor={(_, index) => index.toString()}
      />
    </Container>
  );
};
