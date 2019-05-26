import gql from 'graphql-tag'

export const typeDefs = gql`
  extend type Recipe {
    id: ID
    name: String
    createdAt: String
    ingredients: [Ingredient]
  }

  # # #

  extend type Query {
    findAllRecipes: [Recipe]
    findRecipeById(id: ID): Recipe
    findAllIngredients: [Ingredient]
    findIngredientById(id: ID): Ingredient

    # me: User
  }

  # # #

  extend type Mutation {
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
