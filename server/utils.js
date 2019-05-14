const Sequelize = require('sequelize')

module.exports = createStore = () => {
  const db = new Sequelize('postgres://localhost:5432/bread-book', {
    logging: false,
    operatorsAliases: false
  })

  const recipes = db.define('recipe', {
    // id: {
    //   type: SQL.INTEGER,
    //   primaryKey: true,
    //   autoIncrement: true,
    // },
    name: Sequelize.STRING
    // createdAt
    // updataedAt
  })

  const ingredients = db.define('ingredient', {
    // id: {
    //   type: SQL.INTEGER,
    //   primaryKey: true,
    //   autoIncrement: true,
    // },
    name: Sequelize.STRING,
    description: Sequelize.TEXT,
    quantity: Sequelize.DECIMAL(10, 2)
    // createdAt
    // updataedAt
  })

  return { recipes, ingredients }
}
