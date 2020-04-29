import { NavigationContainer, NavigationProp } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import { AppLoading } from "expo";
import * as React from "react";
import { ErrorProvider } from "../error-provider/ErrorProvider";
import { RecipeListView } from "../recipe-list-view/RecipeListView";
import { useFonts } from "../use-fonts/useFonts";
import RecipeView from "../recipe-view/RecipeView";
import { Recipe } from "../recipe-queries/recipe-queries";
import { Icon } from "native-base";

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
    </ErrorProvider>
  );
}

export default App;
