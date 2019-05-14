const { gql } = require('apollo-server')

const typeDefs = gql`
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
    description: String # Text?
    quantity: Float
    # isDry
    # isFlour
  }

  # # #s

  type Query {
    recipes: [Recipe]
    recipe(id: ID!): Recipe
    ingredients: [Ingredient]

    # me: User
  }

  # # #

  type Mutation {
    createRecipe(id: ID!, name: String, ingredients: [Int]): Recipe!
    updateRecipe(id: ID!, name: String, ingredients: [Int]): Recipe!
    deleteRecipe(id: ID!): Recipe!

    addIngredient(
      id: ID!
      name: String
      description: String # Text?
      quantity: Float
    ): Ingredient!
    updateIngredient(
      id: ID!
      name: String
      description: String # Text?
      quantity: Float
    ): Ingredient!
    deleteIngredient(id: ID!): Ingredient!
  }
`

module.exports = typeDefs
