const { DataSource } = require('apollo-datasource')

class IngredientAPI extends DataSource {
  constructor({ store }) {
    super()
    this.store = store
  }

  initialize(config) {
    this.context = config.context
  }
  async findOrCreateIngredient(name) {
    // const ingredient =
    //   this.context && this.context.ingredient
    //     ? this.context.ingredient.name
    //     : nameArg

    // const ingredients = await this.store.ingredient.findOrCreate({
    //   where: { ingredient }
    // })
    // return ingredients && ingredients[0] ? ingredients[0] : null
    try {
      const ingredient = await this.store.ingredients.findOrCreate({
        where: { name }
      })
      return ingredient[0]
    } catch (e) {
      console.log(e)
    }
  }
  async getAllIngredients() {
    const ingredients = await this.store.ingredients.findAll()
    return ingredients
  }
  // updateIngredient
  // deleteIngredient
}

module.exports = IngredientAPI
