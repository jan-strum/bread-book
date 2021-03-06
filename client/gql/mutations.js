import gql from 'graphql-tag'

export const FIND_OR_CREATE_RECIPE = gql`
  mutation findOrCreateRecipe($name: String!) {
    findOrCreateRecipe(name: $name) {
      id
      name
    }
  }
`

export const DELETE_RECIPE = gql`
  mutation deleteRecipe($id: ID!) {
    deleteRecipe(id: $id) {
      id
      name
    }
  }
`

export const REMOVE_INGREDIENT = gql`
  mutation removeIngredient($ingredientId: ID!, $recipeId: ID!) {
    removeIngredient(ingredientId: $ingredientId, recipeId: $recipeId) {
      id
      name
      ingredients {
        id
        name
        description
        hydration
        quantity
        superIngredientId
        isComplex
        subIngredients {
          id
          name
          description
          hydration
          quantity
          superIngredientId
          isComplex
        }
      }
    }
  }
`

export const CREATE_INGREDIENT = gql`
  mutation createIngredient(
    $name: String
    $description: String
    $quantity: Float
    $hydration: Float
    $isComplex: Boolean
    $subIngredients: [SubIngredientInput]
    $recipeId: ID
  ) {
    createIngredient(
      name: $name
      description: $description
      quantity: $quantity
      hydration: $hydration
      isComplex: $isComplex
      subIngredients: $subIngredients
      recipeId: $recipeId
    ) {
      id
      name
      description
      hydration
      quantity
      superIngredientId
      isComplex
      subIngredients {
        id
        name
        description
        hydration
        quantity
        superIngredientId
        isComplex
      }
    }
  }
`
