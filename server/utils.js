const Sequelize = require('sequelize')
const { username, password } = '/secrets.js'

module.exports.createStore = () => {
  const db = new Sequelize('bread-book', username, password, {
    dialect: 'postgres',
    logging: false
    // query: { raw: true }
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

  async function seed() {
    await db.sync({ force: true })
    console.log('Database synced...')

    const twentyPercentSpelt = await recipes.create({
      name: 'Twenty Percent Spelt'
    })
    const twentyPercentRye = await recipes.create({
      name: 'Twenty Percent Rye'
    })
    const twentyPercentWholeWheat = await recipes.create({
      name: 'Twenty Percent Whole Wheat '
    })

    const spelt = await ingredients.create({
      name: 'spelt',
      quantity: 60,
      description: 'Not Sifted.'
    })
    const rye = await ingredients.create({
      name: 'rye',
      quantity: 60,
      description: 'Sifted.'
    })
    const wholeWheat = await ingredients.create({
      name: 'whole wheat',
      quantity: 60,
      description: 'Not Sifted.'
    })
  }

  seed()

  return { recipes, ingredients }
}
