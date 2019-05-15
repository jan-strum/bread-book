module.exports = {
  Query: {
    recipes: (_, __, { dataSources }) => {
      // console.log('dataSources', dataSources)
      const recipes = dataSources.recipeAPI.getAllRecipes()
      return recipes
    },
    ingredients: (_, __, { dataSources }) => {
      const ingredients = dataSources.ingredientAPI.getAllIngredients()
      return ingredients
    }
  },
  Mutation: {
    createRecipe: async (_, { name }, { dataSources }) => {
      const recipe = await dataSources.recipeAPI.findOrCreateRecipe({ name })
      return recipe
    }
  }
}
