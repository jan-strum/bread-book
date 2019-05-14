const { DataSource } = require('apollo-datasource')

class RecipeAPI extends DataSource {
  constructor({ store }) {
    super()
    this.store = store
  }

  initialize(config) {
    this.context = config.context
  }
  findOrCreateRecipe = async ({ name: nameArg }) => {
    const recipe =
      this.context && this.context.recipe ? this.context.recipe.name : nameArg

    const recipes = await this.store.recipes.findOrCreate({ where: { recipe } })
    return recipes && recipes[0] ? recipes[0] : null
  }

  // updateRecipe
  // deleteRecipe
}

module.exports = RecipeAPI
