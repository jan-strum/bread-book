const { DataSource } = require('apollo-datasource')

class IngredientAPI extends DataSource {
  constructor({ store }) {
    super()
    this.store = store
  }

  initialize(config) {
    this.context = config.context
  }
  async findOrCreateIngredient({ name: nameArg }) {
    const ingredient =
      this.context && this.context.ingredient
        ? this.context.ingredient.name
        : nameArg

    const ingredients = await this.store.ingredient.findOrCreate({
      where: { ingredient }
    })
    return ingredients && ingredients[0] ? ingredients[0] : null
  }
  async getAllIngredients() {
    const ingredients = await this.store.recipes.findAll()
    // console.log('ingredients', ingredients)
    return ingredients
  }
  // updateIngredient
  // deleteIngredient
}

module.exports = IngredientAPI
