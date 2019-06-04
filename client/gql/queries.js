import gql from 'graphql-tag'

export const FIND_ALL_RECIPES = gql`
  query findAllRecipes {
    findAllRecipes {
      id
      name
      createdAt
    }
  }
`

export const FIND_FULL_RECIPE = gql`
  query findFullRecipe($id: ID) {
    findFullRecipe(id: $id) {
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

export const FIND_COMPLEXITY = gql`
  query findComplexity($id: ID) {
    findComplexity(id: $id) @client
  }
`
