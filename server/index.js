const { ApolloServer } = require('apollo-server')
const typeDefs = require('./schema')
const { createStore } = require('./db')
const resolvers = require('./resolvers')

const RecipeAPI = require('./dataSources/RecipeAPI')
const IngredientAPI = require('./dataSources/IngredientAPI')

const store = createStore()

const dataSources = () => ({
  recipeAPI: new RecipeAPI({ store }),
  ingredientAPI: new IngredientAPI({ store })
})

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources
})

// const string = 'abc'

// module.exports = { store, string }
module.exports.store = store
// module.exports = { string }

server.listen().then(({ url }) => {
  // console.log(store)
  // console.log('exports', module.exports)
  console.log(`🚀 Server ready at ${url}`)
})
