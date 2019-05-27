// import { FIND_ALL_RECIPES } from './gql/queries'

// export const resolvers = {
// Query: {
//   findAllRecipes: (_, __, { client }) => {
//     const { findAllRecipes } = client.readQuery({ query: FIND_ALL_RECIPES })
//     const data = { findAllRecipes: { findAllRecipes } }
//     client.writeQuery({ query: FIND_ALL_RECIPES, data })
//     console.log('data', data)
//     return data
//   }
// },
//   Mutation: {
//     addRecipe: (_, { recipe }, { client }) => {
//       console.log('hitting')
//       const { findAllRecipes } = client.readQuery({
//         query: FIND_ALL_RECIPES
//       })
//       const data = {
//         findAllRecipes: { ...findAllRecipes, recipe }
//       }
//       client.writeQuery({ query: FIND_ALL_RECIPES, data })
//       console.log('data', data)
//       return data
//     }
//   }
// }
