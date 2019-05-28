const { DataSource } = require('apollo-datasource')
const { log } = require('../utils')

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
  async findFullRecipe(id) {
    try {
      const recipe = await this.store.recipes.findByPk(id, {
        include: {
          model: this.store.ingredients,
          where: { superIngredientId: null }
        }
      })
      await this.findSubIngredients(recipe.ingredients)
      return recipe
    } catch (e) {
      console.log(e)
    }
  }
  async updateRecipe(id, name) {
    try {
      const recipeToUpdate = await this.findRecipeById(id)
      const updatedRecipe = await recipeToUpdate.update({ name })
      return updatedRecipe
    } catch (e) {
      console.log(e)
    }
  }
  async deleteRecipe(id) {
    try {
      const recipeToDelete = await this.findRecipeById(id)
      await recipeToDelete.destroy()
      return recipeToDelete
    } catch (e) {
      console.log(e)
    }
  }

  findSubIngredients(ingredientsArray) {
    ingredientsArray.forEach(ingredient => {
      // async?
      ingredient.isComplex
        ? (ingredient.subIngredients = this.store.ingredients.findAll({
            where: { superIngredientId: ingredient.id }
          }))
        : (ingredient.subIngredients = [])
    })
  }
}

module.exports = RecipeAPI
