import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AppLoading } from "expo";
import * as React from "react";
import { ErrorProvider } from "../error-provider/ErrorProvider";
import { RecipeListView } from "../recipe-list-view/RecipeListView";
import { useFonts } from "../use-fonts/useFonts";
import RecipeView from "../recipe-view/RecipeView";
import { Recipe } from "../recipe-queries/recipe-queries";

type RootStackParamList = {
  Recipes: undefined;
  Recipe: { recipe: Recipe };
};

const Stack = createStackNavigator<RootStackParamList>();

function App() {
  const fontsReady = useFonts();

  if (!fontsReady) {
    return <AppLoading />;
  }

  return (
    <ErrorProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Recipes">
          <Stack.Screen name="Recipes" component={RecipeListView} />
          <Stack.Screen
            name="Recipe"
            options={({ route }) => ({ title: route.params.recipe.name })}
          >
            {({ route }) => {
              const { recipe } = route.params;
              return <RecipeView recipe={recipe} />;
            }}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </ErrorProvider>
  );
}

export default App;
