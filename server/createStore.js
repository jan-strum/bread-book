const Sequelize = require('sequelize')
const { username, password } = '/secrets.js'

const today = new Date()
let yesterday = new Date()
yesterday = yesterday.setDate(today.getDate() - 1)
let tomorrow = new Date()
tomorrow = tomorrow.setDate(today.getDate() + 1)

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
    hydration: { type: Sequelize.DECIMAL(10, 2) },
    quantity: Sequelize.DECIMAL(10, 2),
    isComplex: { type: Sequelize.BOOLEAN, defaultValue: false }
  })

  ingredients.belongsToMany(recipes, { through: 'recipes_ingredients' })
  recipes.belongsToMany(ingredients, { through: 'recipes_ingredients' })
  ingredients.belongsTo(ingredients, { as: 'superIngredient' })
  // console.log(Object.keys(ingredients.__proto__))

  db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(error => console.log('Database not connected...', error))

  async function seed() {
    await db.sync({ force: true })
    console.log('Database synced...')

    const twentyPercentSpelt = await recipes.create({
      name: 'Twenty Percent Spelt',
      createdAt: yesterday
    })
    const twentyPercentRye = await recipes.create({
      name: 'Twenty Percent Rye',
      createdAt: today
    })
    const twentyPercentWholeWheat = await recipes.create({
      name: 'Twenty Percent Whole Wheat ',
      createdAt: tomorrow
    })

    const spelt = await ingredients.create({
      name: 'Spelt',
      description: 'Not Sifted.',
      hydration: 0,
      quantity: 60,
      isComplex: false
    })
    const rye = await ingredients.create({
      name: 'Rye',
      description: 'Sifted.',
      hydration: 0,
      quantity: 60,
      isComplex: false
    })
    const wholeWheat = await ingredients.create({
      name: 'Whole Wheat',
      description: 'Not Sifted.',
      hydration: 0,
      quantity: 60,
      isComplex: false
    })
    const water = await ingredients.create({
      name: 'Water',
      description: 'Warm.',
      hydration: 100,
      quantity: 240,
      isComplex: false
    })
    const levain = await ingredients.create({
      name: 'Levain',
      description: 'Room temperature.',
      hydration: 50,
      quantity: 60, // This should be a computation of the subIngredients hydrations because isComplex is true.
      isComplex: true
    })
    const salt = await ingredients.create({
      name: 'Salt',
      description: 'Sea salt.',
      quantity: 6,
      isComplex: false
    })

    const levainBreadFlour = await ingredients.create({
      name: 'Levain Bread Flour',
      quantity: 50,
      hydration: 0
    })
    const levainRyeFlour = await ingredients.create({
      name: 'Levain Rye Flour',
      quantity: 10,
      hydration: 0
    })
    const levainWater = await ingredients.create({
      name: 'Levain Water',
      quantity: 60,
      hydration: 100
    })

    await levainBreadFlour.setSuperIngredient(levain)
    await levainRyeFlour.setSuperIngredient(levain)
    await levainWater.setSuperIngredient(levain)

    await twentyPercentSpelt.setIngredients([
      spelt,
      water,
      levain,
      levainBreadFlour,
      levainRyeFlour,
      levainWater,
      salt
    ])
    await twentyPercentRye.setIngredients([
      rye,
      water,
      levain,
      levainBreadFlour,
      levainRyeFlour,
      levainWater,
      salt
    ])
    await twentyPercentWholeWheat.setIngredients([
      wholeWheat,
      water,
      levain,
      levainBreadFlour,
      levainRyeFlour,
      levainWater,
      salt
    ])
  }

  seed()

  return { recipes, ingredients }
}
