import { StackActions, useNavigation } from "@react-navigation/native";
import { Card, CardItem, Container, Text, View } from "native-base";
import * as React from "react";
import { FlatList, Image } from "react-native";
import { getRecipes } from "../graph-queries/graphq-queries";
import { Recipe } from "../graph-queries/types";
import { useDispatch, useSelector } from "../state-management-system";
import {
  RECIPES_LIST_SELECT_RECIPE,
  RECIPES_LIST_SUCCESS_GET_DATA,
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
    <View style={{ width: "100%" }}>
      <Card onTouchEnd={navigateTo}>
        <CardItem cardBody>
          <Image
            style={{ height: 200, flex: 1 }}
            source={{
              uri: recipe.image,
            }}
          />
        </CardItem>
        <CardItem>
          <Text>{recipe.name}</Text>
        </CardItem>
      </Card>
    </View>
  );
};

export const RecipeListView: React.FC = () => {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.RecipesList.recipes);
  const [refreshState, setRefreshState] = React.useState(0);
  const refresh = () => setRefreshState(refreshState + 1);

  React.useEffect(() => {
    async function getRecipesEffect() {
      const result = await getRecipes();
      dispatch({ type: RECIPES_LIST_SUCCESS_GET_DATA, payload: result });
    }
    getRecipesEffect();
  }, []);

  return (
    <Container>
      <FlatList<Recipe>
        data={recipes}
        onRefresh={refresh}
        refreshing={!recipes.length}
        renderItem={({ item, index }) => (
          <RecipeListItem recipe={item} recipeIndex={index} key={index} />
        )}
        keyExtractor={(_, index) => index.toString()}
      />
    </Container>
  );
};
