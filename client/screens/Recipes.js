import React from 'react'
import { View, FlatList, Text, StyleSheet } from 'react-native'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import SingleRecipe from '../components/SingleRecipe'
import SortRecipes from '../components/SortRecipes'

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
  constructor() {
    super()
    this.state = {
      sortDisplay: false,
      selectedField: ''
    }
  }

  static navigationOptions = {
    title: 'Recipes'
  }

  toggleSortDropdown = () => {
    this.setState({ sortDisplay: !this.state.sortDisplay })
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
            <View style={styles.container}>
              {/* <SortRecipes /> */}
              <FlatList
                data={data.findAllRecipes}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderItem}
              />
            </View>
          )
        }}
      </Query>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
