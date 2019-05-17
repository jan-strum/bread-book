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
    try {
      const ingredient = await this.store.ingredients.findOrCreate({
        where: { name }
      })
      return ingredient[0]
    } catch (e) {
      console.log(e)
    }
  }
  async findAllIngredients() {
    const ingredients = await this.store.ingredients.findAll()
    return ingredients
  }
  async findIngredientById(id) {
    try {
      const ingredient = await this.store.ingredients.findByPk(id)
      return ingredient
    } catch (e) {
      console.log(e)
    }
  }
  async updateIngredient(id, name, description, quantity) {
    const updateInfo = { name, description, quantity }
    for (let key in updateInfo) {
      if (!updateInfo[key]) delete updateInfo[key]
    }
    try {
      const ingredientToUpdate = await this.findIngredientById(id)
      // console.log('ingredientToUpdate', ingredientToUpdate)
      const updatedIngredient = await ingredientToUpdate.update(updateInfo)
      // console.log('updatedIngredient', updatedIngredient)
      return updatedIngredient
    } catch (e) {
      console.log(e)
    }
  }
  // updateIngredient
  // deleteIngredient
}

module.exports = IngredientAPI
