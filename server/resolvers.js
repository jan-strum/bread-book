module.exports = {
  Query: {
    recipes: (_, __, { dataSources }) => {
      // console.log('datasources', dataSources)
      dataSources.recipeAPI.getAllRecipes()
    }
  }
}
