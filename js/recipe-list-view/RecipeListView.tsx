import * as React from "react";
import { getRecipes, Recipe } from "../recipe-queries/recipe-queries";
import { Spinner, Container, Card, ListItem, Text } from "native-base";
import RecipeView from "../recipe-view/RecipeView";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackActions } from "@react-navigation/native";

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
    <ListItem onPress={navigateTo}>
      <Text>{recipe.name}</Text>
    </ListItem>
  );
  return <RecipeView recipe={recipe} />;
};

export const RecipeListView: React.FC = () => {
  const [recipes, setRecipes] = React.useState<Recipe[]>([]);

  React.useEffect(() => {
    async function getRecipesEffect() {
      const result = await getRecipes();
      setRecipes(result);
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
