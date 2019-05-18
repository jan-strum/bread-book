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
    hydration: Sequelize.DECIMAL(10, 2),
    quantity: Sequelize.DECIMAL(10, 2)
  })

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
      name: 'Spelt',
      description: 'Not Sifted.',
      hydration: 0,
      quantity: 60
    })
    const rye = await ingredients.create({
      name: 'Rye',
      description: 'Sifted.',
      hydration: 0,
      quantity: 60
    })
    const wholeWheat = await ingredients.create({
      name: 'Whole Wheat',
      description: 'Not Sifted.',
      hydration: 0,
      quantity: 60
    })

    const water = await ingredients.create({
      name: 'Water',
      description: 'Warm.',
      hydration: 100,
      quantity: 240
    })

    const levain = await ingredients.create({
      name: 'Levain',
      description: 'Room temperature.',
      hydration: 50,
      quantity: 60
    })

    const salt = await ingredients.create({
      name: 'Salt',
      description: 'Sea salt.',
      quantity: 6
    })

    await twentyPercentSpelt.setIngredients([spelt, water, levain, salt])
    await twentyPercentRye.setIngredients([rye, water, levain, salt])
    await twentyPercentWholeWheat.setIngredients([
      wholeWheat,
      water,
      levain,
      salt
    ])
  }

  seed()

  return { recipes, ingredients }
}
