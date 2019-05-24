import React from 'react'
import { FlatList, Text, StyleSheet } from 'react-native'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import SingleRecipe from '../components/SingleRecipe'

const FIND_ALL_RECIPES = gql`
  query findAllRecipes {
    findAllRecipes {
      id
      name
      createdAt
    }
  }
`

export default class Recipes extends React.Component {
  static navigationOptions = {
    title: 'Recipes'
  }

  keyExtractor = item => item.id

  renderItem = ({ item }) => <SingleRecipe props={item} />

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
            <FlatList
              data={data.findAllRecipes}
              keyExtractor={this.keyExtractor}
              renderItem={this.renderItem}
              style={styles.container}
            >
              {/* {data.findAllRecipes.map(recipe => (
                <Text key={recipe.id}>{recipe.name}</Text>
              ))} */}
            </FlatList>
          )
        }}
      </Query>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})
