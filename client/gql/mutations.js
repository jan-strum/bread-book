import gql from 'graphql-tag'

export const FIND_OR_CREATE_RECIPE = gql`
  mutation findOrCreateRecipe($name: String!) {
    findOrCreateRecipe(name: $name) {
      id
      name
    }
  }
`
