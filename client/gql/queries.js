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
