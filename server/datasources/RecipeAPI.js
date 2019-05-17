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
    // const recipe =
    //   this.context && this.context.recipe ? this.context.recipe.name : nameArg

    // const recipes = await this.store.recipes.findOrCreate({ where: { recipe } })
    // return recipes && recipes[0] ? recipes[0] : null

    try {
      const recipe = await this.store.recipes.findOrCreate({
        where: { name }
      })
      // console.log('recipe', recipe[0])
      return recipe[0]
    } catch (e) {
      console.log(e)
    }
  }
  async findAllRecipes() {
    try {
      const recipes = await this.store.recipes.findAll()
      // console.log('recipes', recipes)
      return recipes
    } catch (e) {
      console.log(e)
    }
  }
  async findRecipeById(id) {
    try {
      const recipe = await this.store.recipes.findByPk(id)
      // console.log('recipe'.recipe)
      return recipe
    } catch (e) {
      console.log(e)
    }
  }
  // updateRecipe
  // deleteRecipe
}

module.exports = RecipeAPI
