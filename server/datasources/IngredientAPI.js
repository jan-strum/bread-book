const { DataSource } = require('apollo-datasource')
const { log } = require('../utils')

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
    const ingredients = await this.store.ingredients.findAll({
      where: { superIngredientId: null }
    })
    await this.findSubIngredients(ingredients)
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
  async updateIngredient(
    id,
    name,
    description,
    hydration,
    quantity,
    isComplex,
    subIngredients,
    superIngredientId
  ) {
    const updateInfo = {
      name,
      description,
      hydration,
      quantity,
      isComplex,
      subIngredients,
      superIngredientId
    }
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
  async removeIngredient(ingredientId, recipeId) {
    try {
      const ingredientToRemove = await this.findIngredientById(ingredientId)
      const recipe = await this.store.recipes.findByPk(recipeId)
      const fullRecipe = await this.findFullRecipe(recipeId)
      const updatedIngredients = fullRecipe.ingredients.filter(
        ingredient =>
          ingredient.id !== ingredientToRemove.id &&
          ingredient.superIngredientId !== ingredientToRemove.id
      )
      await recipe.setIngredients(updatedIngredients)

      return updatedIngredients
    } catch (e) {
      console.log(e)
    }
  }

  async findFullRecipe(id) {
    try {
      const recipe = await this.store.recipes.findByPk(id, {
        include: this.store.ingredients,
        required: false
      })
      return recipe
    } catch (e) {
      console.log(e)
    }
  }
  findSubIngredients(ingredientsArray) {
    ingredientsArray.forEach(ingredient => {
      ingredient.isComplex
        ? (ingredient.subIngredients = this.store.ingredients.findAll({
            where: { superIngredientId: ingredient.id }
          }))
        : (ingredient.subIngredients = [])
    })
  }
}

module.exports = IngredientAPI
