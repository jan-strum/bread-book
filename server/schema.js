const { gql } = require('apollo-server')

const typeDefs = gql`
  type Recipe {
    id: ID
    name: String
    createdAt: String
    ingredients: [Ingredient]
  }

  type Ingredient {
    id: ID
    name: String
    description: String # Text?
    hydration: Float
    quantity: Float
    isComplex: Boolean
    subIngredients: [Ingredient]
    superIngredientId: ID
  }

  # # #

  type Query {
    findAllRecipes: [Recipe]
    findRecipeById(id: ID): Recipe
    findFullRecipe(id: ID): Recipe
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
      subIngredients: [ID]
      superIngredientId: ID
    ): Ingredient!
    deleteIngredient(id: ID!): Ingredient!
    removeIngredient(ingredientId: ID!, recipeId: ID!): Recipe!
  }
`

module.exports = typeDefs
