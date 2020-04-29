import { NavigationContainer, NavigationProp } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import { AppLoading } from "expo";
import * as React from "react";
import { ErrorProvider } from "../error-provider/error-provider";
import { RecipeListView } from "../recipes-list-view/recipes-list.view";
import { useFonts } from "../use-fonts/use-fonts";
import RecipeView from "../recipe-view/recipe.view";
import { Recipe } from "../recipe-queries/recipe-queries";
import { Icon } from "native-base";
import { createStore } from "../state-management-system";
import { Provider } from "react-redux";

type Cart = [];

type RootStackParamList = {
  Recipes: undefined;
  Recipe: { recipe: Recipe };
  Checkout: { cart: Cart };
};

const CheckoutView = () => <></>;

const Stack = createStackNavigator<RootStackParamList>();

function App() {
  const fontsReady = useFonts();
  const store = createStore();

  if (!fontsReady) {
    return <AppLoading />;
  }

  const options = ({
    navigation,
  }: {
    navigation: NavigationProp<RootStackParamList>;
  }) => ({
    headerRight: () => {
      return (
        <Icon
          onPress={() => navigation.navigate("Checkout")}
          name="md-cart"
          style={{ marginRight: 20 }}
        />
      );
    },
  });

  return (
    <ErrorProvider>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Recipes">
            <Stack.Screen
              name="Recipes"
              component={RecipeListView}
              options={options}
            />
            <Stack.Screen
              name="Recipe"
              options={({ route, navigation }) => ({
                ...options({ navigation }),
                title: route.params.recipe.name,
              })}
            >
              {({ route }) => {
                const { recipe } = route.params;
                return <RecipeView recipe={recipe} />;
              }}
            </Stack.Screen>
            <Stack.Screen name="Checkout" component={CheckoutView} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </ErrorProvider>
  );
}

export default App;
