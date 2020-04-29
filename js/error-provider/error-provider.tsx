import { Text } from "native-base";
import * as React from "react";
import { View } from "react-native";

export class ErrorProvider extends React.Component {
  state = {
    errorMessage: "",
  };
  componentDidCatch(e: Error) {
    // TODO: log error to log service
    console.log(e);
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { errorMessage: "Sorry, something went wrong :(" };
  }

  render() {
    if (this.state.errorMessage) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>{this.state.errorMessage}</Text>
        </View>
      );
    }
    return this.props.children;
  }
}
