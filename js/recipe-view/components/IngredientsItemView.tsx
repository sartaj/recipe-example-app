import {
  Body,
  CheckBox,
  ListItem,
  Right,
  Text,
  View,
  Picker,
  Item,
  Icon,
} from "native-base";
import * as React from "react";
import { Recipe } from "../../recipe-queries/recipe-queries";
import { TextInput } from "react-native";

interface IngredientItemProps {
  ingredient: string;
  value: number;
  unit: Recipe["ingredients"]["unit"];
}

export const IngredientsItemView: React.FC<IngredientItemProps> = ({
  ingredient,
  value,
  unit,
}) => {
  return (
    <View style={{ flex: 1 }}>
      <ListItem>
        <CheckBox checked={false} />
        <Body>
          <Text>{ingredient}</Text>
        </Body>
        <Right>
          <Item picker>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: 75, marginRight: 30 }}
              selectedValue={String(1)}
            >
              {Array.from(Array(10)).map((_, i) => (
                <Picker.Item
                  key={i}
                  label={String((i + 1) * value) + " " + unit}
                  value={String(i + 1)}
                />
              ))}
            </Picker>
          </Item>
          {/* <Text>
            {value} {unit}
          </Text> */}
        </Right>
      </ListItem>
    </View>
  );
};
