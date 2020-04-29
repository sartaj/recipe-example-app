import {
  Body,
  CheckBox,
  Icon,
  Item,
  ListItem,
  Picker,
  Right,
  Text,
  View,
} from "native-base";
import * as React from "react";
import { Platform } from "react-native";
import { Unit } from "../../recipe-queries/recipe-queries";

interface IngredientItemProps {
  name: string;
  value: number;
  unit: Unit;
  last: boolean;
}

export const IngredientsItemView: React.FC<IngredientItemProps> = ({
  name,
  value,
  unit,
  last,
}) => {
  const [checked, setChecked] = React.useState(false);

  return (
    <ListItem
      style={[last ? { borderColor: "transparent" } : null, { flex: 1 }]}
    >
      <CheckBox
        checked={checked}
        onPress={() => {
          setChecked(!checked);
        }}
      />
      <Body>
        <Text>{name}</Text>
      </Body>
      <Right>
        {checked ? (
          <Item picker>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={{
                width: Platform.OS === "ios" ? 70 : 100,
                marginRight: Platform.OS === "ios" ? 30 : undefined,
              }}
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
        ) : (
          <Text>
            {value} {unit}
          </Text>
        )}
      </Right>
    </ListItem>
  );
};
