module.exports = {
  Query: {
    findAllRecipes: async (_, __, { dataSources }) => {
      const recipes = await dataSources.recipeAPI.findAllRecipes()
      // console.log('recipes', recipes)
      return recipes
    },
    findRecipeById: async (_, { id }, { dataSources }) => {
      const recipe = await dataSources.recipeAPI.findRecipeById(id)
      // console.log('recipe', recipe)
      return recipe
    },
    findAllIngredients: async (_, __, { dataSources }) => {
      const ingredients = await dataSources.ingredientAPI.findAllIngredients()
      // console.log('ingredients', ingredients)
      return ingredients
    },
    findIngredientById: async (_, { id }, { dataSources }) => {
      const ingredient = await dataSources.ingredientAPI.findIngredientById(id)
      // console.log('ingredient', ingredient)
      return ingredient
    }
  },
  Mutation: {
    findOrCreateRecipe: async (_, { name }, { dataSources }) => {
      const recipe = await dataSources.recipeAPI.findOrCreateRecipe(name)
      return recipe
    },
    updateRecipe: async (_, { id, name }, { dataSources }) => {
      const updatedRecipe = await dataSources.recipeAPI.updateRecipe(id, name)
      return updatedRecipe
    },
    findOrCreateIngredient: async (_, { name }, { dataSources }) => {
      const ingredient = await dataSources.ingredientAPI.findOrCreateIngredient(
        name
      )
      return ingredient
    },
    updateIngredient: async (
      _,
      { id, name, description, quantity },
      { dataSources }
    ) => {
      const updatedIngredient = await dataSources.ingredientAPI.updateIngredient(
        id,
        name,
        description,
        quantity
      )
      return updatedIngredient
    }
  }
}
