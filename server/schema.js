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

    # me: User
  }

  # # #

  type Mutation {
    createRecipe(id: ID!, name: String, ingredients: [Int]): Recipe!
    addIngredient(
      name: String
      description: String # Text?
      quantity: Float
    ): Ingredient!
  }
`

module.exports = typeDefs
