const { DataSource } = require('apollo-datasource')

class RecipeAPI extends DataSource {
  constructor({ store }) {
    super()
    this.store = store
  }

  initialize(config) {
    this.context = config.context
  }
  async findOrCreateRecipe({ name: nameArg }) {
    const recipe =
      this.context && this.context.recipe ? this.context.recipe.name : nameArg

    const recipes = await this.store.recipes.findOrCreate({ where: { recipe } })
    return recipes && recipes[0] ? recipes[0] : null
  }
  async getAllRecipes() {
    const recipes = await this.store.recipes.findAll()
    // .then(() => console.log('recipes', recipes))
    // console.log('recipes', recipes)
    return recipes
  }
  // getRecipeById
  // updateRecipe
  // deleteRecipe
}

module.exports = RecipeAPI
