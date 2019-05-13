const { gql } = require('apollo-server')

const typeDefs = gql`
  type Query {
    recipes: [Recipe]
    recipe(id: ID!): Recipe

    # me: User
  }

  type Recipe {
    id: ID!
    name: String
    ingredients: [Ingredient]
    # dateCreated
    # dateUpdated
  }

  type Ingredient {
    id: ID!
    name: String
    quantity: Float
    # isDry
    # isFlour
  }

  # # #

  type Mutation {
    createRecipe(id: ID!, name: String, ingredients: [Int]): Recipe!
    addIngredient(name: String, quantity: Float): Ingredient!
  }
`

module.exports = typeDefs
