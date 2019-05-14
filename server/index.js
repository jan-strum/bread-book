const { ApolloServer } = require('apollo-server')
const typeDefs = require('./schema')
const { createStore } = require('./utils')
const resolvers = require('./resolvers')

const RecipeAPI = require('./datasources/RecipeAPI')
const IngredientAPI = require('./datasources/IngredientAPI')

const store = createStore()

const dataSources = () => ({
  recipeAPI: new RecipeAPI({ store }),
  ingredientAPI: new IngredientAPI({ store })
})

const server = new ApolloServer({ typeDefs, resolvers, dataSources })

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
