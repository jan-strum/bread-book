module.exports = {
  Query: {
    recipes: async (_, __, { dataSources }) => {
      // console.log('dataSources', dataSources)
      const recipes = await dataSources.recipeAPI.getAllRecipes()
      console.log('recipes', recipes)
      return recipes
    },
    ingredients: async (_, __, { dataSources }) => {
      const ingredients = await dataSources.ingredientAPI.getAllIngredients()
      console.log('ingredients', ingredients)
      return ingredients
    }
  },
  Mutation: {
    findOrCreateRecipe: async (_, { name }, { dataSources }) => {
      const recipe = await dataSources.recipeAPI.findOrCreateRecipe(name)
      return recipe
    },
    findOrCreateIngredient: async (_, { name }, { dataSources }) => {
      const ingredient = await dataSources.ingredientAPI.findOrCreateIngredient(
        name
      )
      return ingredient
    }
  }
}
