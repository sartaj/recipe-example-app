import { Recipe } from "./types";
import { map, mapValues } from "lodash/fp";

const quesoDeCabra: Recipe = {
  name: "Quéso de Cabra",
  ingredients: [
    {
      name: "Baguettes",
      value: 1,
      unit: "loaf",
    },
    {
      name: "Garlic",
      value: 2,
      unit: "cloves",
    },
    {
      name: "Goat Cheese",
      value: 8,
      unit: "oz",
    },
    {
      name: "Olive Oil",
      value: 1,
      unit: "oz",
    },
    {
      name: "Marinara Sauce",
      value: 8,
      unit: "oz",
    },
    {
      name: "Basil",
      value: 1,
      unit: "tsp",
    },
    {
      name: "Oregano",
      value: 1,
      unit: "tsp",
    },
    {
      name: "Thyme",
      value: 1,
      unit: "tsp",
    },
  ],
  steps: [
    {
      description: "Preheat oven to 350 degrees F/180 degrees C",
    },
    {
      description: "Mince garlic cloves, mix with quarter cup olive oil",
    },
    {
      description: "Spread mix over baguettes",
    },
    {
      description: "Bake for 25 mins until brown/crispy",
    },
    {
      description: "Put goat cheese in baking dish",
    },
    {
      description: "Surround in marinara sauce leaving top exposed",
    },
    {
      description: "Bake until bubbling for 25-30 mins",
    },
    {
      description: "Serve with garnish",
    },
  ],
};

const riceAndBeans: Recipe = {
  name: "Rice And Beans",
  ingredients: [
    {
      name: "Rice",
      value: 1,
      unit: "lbs",
    },
    {
      name: "Beans",
      value: 1,
      unit: "lbs",
    },
  ],
  steps: [
    {
      description: "Preheat oven to 350 degrees F/180 degrees C",
    },
    {
      description: "Mince garlic cloves, mix with quarter cup olive oil",
    },
    {
      description: "Spread mix over baguettes",
    },
    {
      description: "Bake for 25 mins until brown/crispy",
    },
    {
      description: "Put goat cheese in baking dish",
    },
    {
      description: "Surround in marinara sauce leaving top exposed",
    },
    {
      description: "Bake until bubbling for 25-30 mins",
    },
    {
      description: "Serve with garnish",
    },
  ],
};

const defaultPrices = {
  Baguettes: 2.2,
  Garlic: 0.2,
  "Goat Cheese": 3,
  "Olive Oil": 1.3,
  "Marinara Sauce": 1.2,
  Basil: 1.5,
  Oregano: 0.5,
  Thyme: 0.5,
  Rice: 5.2,
  Beans: 3.2,
};

export const groceryStorePrices = {
  "Whole Foods": mapValues((value) => value * 1.3, defaultPrices),
  Wheatsville: mapValues((value) => value * 1.15, defaultPrices),
  HEB: mapValues((value) => value * 1, defaultPrices),
  ALDI: mapValues((value) => value * 0.85, defaultPrices),
};

export const defaultGroceryStore = "Wheatsville";

const RECIPES: Recipe[] = [quesoDeCabra, riceAndBeans];

// Mimic Network Request
// Ideally, this would be a graphql call
export const getRecipes = async (): Promise<Recipe[]> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(RECIPES);
    }, 1000);
  });
