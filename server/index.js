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

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
