import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AppLoading } from "expo";
import * as React from "react";
import { Provider } from "react-redux";
import CheckoutView from "../checkout-view/checkout.view";
import { ErrorProvider } from "../error-provider/error-provider";
import { HeaderRight } from "../header/header.view";
import RecipeView from "../recipe-view/recipe.view";
import { RecipeListView } from "../recipes-list-view/recipes-list.view";
import { createStore } from "../state-management-system";
import { useFonts } from "../use-fonts/use-fonts";

type RootStackParamList = {
  Recipes: undefined;
  Recipe: { title: string };
  Checkout: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function App() {
  const fontsReady = useFonts();
  const store = createStore();

  if (!fontsReady) {
    return <AppLoading />;
  }

  const options = () => ({
    headerRight: () => <HeaderRight />,
  });

  return (
    <>
      {/* Catch All Errors Created By Children */}
      <ErrorProvider>
        {/* Provide State via Redux */}
        <Provider store={store}>
          {/* Native Navigation System with React Navigation */}
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Recipes">
              {/* List or Recipes Screen */}
              <Stack.Screen
                name="Recipes"
                component={RecipeListView}
                options={options}
              />
              {/* Single Recipe Screen */}
              <Stack.Screen
                name="Recipe"
                options={({ route, navigation }) => ({
                  ...options(),
                  title: route.params?.title || "Recipe",
                })}
                component={RecipeView}
              />
              {/* Checkout Screen */}
              <Stack.Screen name="Checkout" component={CheckoutView} />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      </ErrorProvider>
    </>
  );
}

export default App;
