const { gql } = require('apollo-server')

const typeDefs = gql`
  type Recipe {
    id: ID
    name: String
    ingredients: [Ingredient]
  }

  type Ingredient {
    id: ID
    name: String
    description: String # Text?
    hydration: Float
    quantity: Float
    isComplex: Boolean
    subIngredients: [SubIngredient]
  }

  type SubIngredient {
    id: ID
    name: String
    description: String # Text?
    hydration: Float
    quantity: Float
    isComplex: Boolean
    ingredientId: ID
  }

  # # #

  type Query {
    findAllRecipes: [Recipe]
    findRecipeById(id: ID): Recipe
    findAllIngredients: [Ingredient]
    findIngredientById(id: ID): Ingredient

    # me: User
  }

  # # #

  type Mutation {
    findOrCreateRecipe(name: String, ingredients: [Int]): Recipe!
    updateRecipe(id: ID, name: String, ingredients: [Int]): Recipe!
    deleteRecipe(id: ID!): Recipe!

    findOrCreateIngredient(
      name: String
      description: String # Text?
      quantity: Float
      isComplex: Boolean
    ): Ingredient!
    updateIngredient(
      id: ID!
      name: String
      description: String # Text?
      quantity: Float
      isComplex: Boolean
    ): Ingredient!
    deleteIngredient(id: ID!): Ingredient!
  }
`

module.exports = typeDefs
