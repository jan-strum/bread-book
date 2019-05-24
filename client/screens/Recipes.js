import React from 'react'
import { ScrollView, Text, StyleSheet } from 'react-native'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const FIND_ALL_RECIPES = gql`
  query findAllRecipes {
    findAllRecipes {
      id
      name
    }
  }
`

const FIND_INGREDIENT_BY_ID = gql`
  query findIngredientById {
    findIngredientById(id: 3) {
      id
      name
      description
      quantity
      isComplex
    }
  }
`

export default class Recipes extends React.Component {
  static navigationOptions = {
    title: 'Recipes'
  }

  render() {
    return (
      <Query query={FIND_ALL_RECIPES}>
        {({ data, loading, error }) => {
          if (loading) return <Text>Loading...</Text>
          if (error) {
            console.log('error', error)
            return <Text>Error!</Text>
          }
          return (
            <ScrollView style={styles.container}>
              {data.findAllRecipes.map(recipe => (
                <Text key={recipe.id}>{recipe.name}</Text>
              ))}
              {/* <Text>{data.findIngredientById.name}</Text> */}
            </ScrollView>
          )
        }}
      </Query>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff'
  }
})
