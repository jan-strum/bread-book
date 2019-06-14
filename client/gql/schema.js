import gql from 'graphql-tag'

export const typeDefs = gql`
  extend type Ingredient {
    complexity: Int
  }

  # # #

  extend type Query {
    findComplexity(id: ID): Int
  }

  # # #

  extend type Mutation {
    updateComplexity: Int
  }
`
