const { createStore } = require('./db')
const store = createStore()

module.exports.findSubIngredients = ingredientsArray => {
  // console.log(ingredients)
  console.log('store', store.ingredients)
  ingredientsArray.forEach(ingredient => {
    ingredient.isComplex
      ? (ingredient.subIngredients = store.ingredients.findAll({
          where: { superIngredientId: ingredient.id }
        }))
      : (ingredient.subIngredients = [])
  })
}
