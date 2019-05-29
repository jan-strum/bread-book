// const store = require('./index')

// module.exports.findSubIngredients = ingredientsArray => {
//   console.log('store', store)
//   ingredientsArray.forEach(ingredient => {
//     ingredient.isComplex
//       ? (ingredient.subIngredients = store.ingredients.findAll({
//           where: { superIngredientId: ingredient.id }
//         }))
//       : (ingredient.subIngredients = [])
//   })
// }

module.exports = {
  log: (string, variable) => {
    console.log(string, JSON.stringify(variable, null, 2))
  }
}
