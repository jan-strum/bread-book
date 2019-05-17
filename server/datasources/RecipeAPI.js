const { DataSource } = require('apollo-datasource')

class RecipeAPI extends DataSource {
  constructor({ store }) {
    super()
    this.store = store
  }

  initialize(config) {
    this.context = config.context
  }
  async findOrCreateRecipe(name) {
    try {
      const recipe = await this.store.recipes.findOrCreate({
        where: { name }
      })
      return recipe[0]
    } catch (e) {
      console.log(e)
    }
  }
  async findAllRecipes() {
    try {
      const recipes = await this.store.recipes.findAll()
      return recipes
    } catch (e) {
      console.log(e)
    }
  }
  async findRecipeById(id) {
    try {
      const recipe = await this.store.recipes.findByPk(id)
      return recipe
    } catch (e) {
      console.log(e)
    }
  }
  async updateRecipe(id, name) {
    try {
      const recipeToUpdate = await this.findRecipeById(id)
      console.log('recipeToUpdate', recipeToUpdate)
      const updatedRecipe = await recipeToUpdate.update({ name })
      console.log('updatedRecipe', updatedRecipe)
      return updatedRecipe
    } catch (e) {
      console.log(e)
    }
  }
  // deleteRecipe
}

module.exports = RecipeAPI
