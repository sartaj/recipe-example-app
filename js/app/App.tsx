import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AppLoading } from "expo";
import * as React from "react";
import { ErrorProvider } from "../error-provider/ErrorProvider";
import { RecipeListView } from "../recipe-list-view/RecipeListView";
import { useFonts } from "../use-fonts/useFonts";

const Stack = createStackNavigator();

function App() {
  const fontsReady = useFonts();

  if (!fontsReady) {
    return <AppLoading />;
  }

  return (
    <ErrorProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Recipe" component={RecipeListView} />
        </Stack.Navigator>
      </NavigationContainer>
    </ErrorProvider>
  );
}

export default App;
