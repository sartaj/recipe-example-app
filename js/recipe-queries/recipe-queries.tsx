export interface Recipe {
  name: string;
  ingredients: {
    [key: string]: {
      value: number;
      unit: "lbs" | "oz" | "tsp" | "cloves" | "cup" | "loaf";
    };
  };
  steps: {
    description: string;
  }[];
}

const quesoDeCabra: Recipe = {
  name: "Quéso de Cabra",
  ingredients: {
    Baguettes: {
      value: 1,
      unit: "loaf",
    },
    Garlic: {
      value: 2,
      unit: "cloves",
    },
    "Goat Cheese": {
      value: 8,
      unit: "oz",
    },
    "Olive Oil": {
      value: 1,
      unit: "oz",
    },
    "Marinara Sauce": {
      value: 8,
      unit: "oz",
    },
    Basil: {
      value: 1,
      unit: "tsp",
    },
    Oregano: {
      value: 1,
      unit: "tsp",
    },
    Thyme: {
      value: 1,
      unit: "tsp",
    },
  },
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
  ingredients: {
    Rice: {
      value: 1,
      unit: "lbs",
    },
    Beans: {
      value: 1,
      unit: "lbs",
    },
  },
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

const RECIPES: Recipe[] = [quesoDeCabra, riceAndBeans];

// Mimic Network Request
// Ideally, this would be a graphql call
export const getRecipes = async (): Promise<Recipe[]> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(RECIPES);
    }, 1000);
  });
