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
  async updateIngredient(id, name, description, quantity, recipeId) {
    const updateInfo = { name, description, quantity, recipeId }
    for (let key in updateInfo) {
      if (!updateInfo[key]) delete updateInfo[key]
    }
    try {
      const ingredientToUpdate = await this.findIngredientById(id)
      const updatedIngredient = await ingredientToUpdate.update(updateInfo)
      return updatedIngredient
    } catch (e) {
      console.log(e)
    }
  }
  async deleteIngredient(id) {
    try {
      const ingredientToDelete = await this.findIngredientById(id)
      await ingredientToDelete.destroy()
      return ingredientToDelete
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = IngredientAPI
