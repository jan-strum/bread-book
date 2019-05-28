import gql from 'graphql-tag'

export const FIND_OR_CREATE_RECIPE = gql`
  mutation findOrCreateRecipe($name: String!) {
    findOrCreateRecipe(name: $name) {
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
