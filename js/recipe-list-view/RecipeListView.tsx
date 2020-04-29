import * as React from "react";
import { getRecipes, Recipe } from "../recipe-queries/recipe-queries";
import { Spinner, Container } from "native-base";
import RecipeView from "../recipe-view/RecipeView";
import { FlatList } from "react-native";

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
          <RecipeView recipe={item} key={index} />
        )}
        keyExtractor={(_, index) => index.toString()}
      />
    </Container>
  );
};
