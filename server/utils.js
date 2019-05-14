const Sequelize = require('sequelize')
const { username, password } = '/secrets.js'

module.exports.createStore = () => {
  const db = new Sequelize('bread-book', username, password, {
    dialect: 'postgres',
    logging: false
  })

  const recipes = db.define('recipe', {
    name: Sequelize.STRING
  })

  const ingredients = db.define('ingredient', {
    name: Sequelize.STRING,
    description: Sequelize.TEXT,
    quantity: Sequelize.DECIMAL(10, 2)
  })

  // recipes.hasMany(ingredients, { foreignKey: 'recipeId', targetKey: 'id' })
  ingredients.belongsToMany(recipes, { through: 'recipes_ingredients' })
  recipes.belongsToMany(ingredients, { through: 'recipes_ingredients' })

  // console.log(Object.keys(recipes.__proto__))

  db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(error => console.log('Database not connected...', error))

  db.sync()

  return { recipes, ingredients }
}
