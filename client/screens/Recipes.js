import React from 'react'
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { Query } from 'react-apollo'

import { FIND_ALL_RECIPES } from '../gql/queries'
import SingleRecipe from '../components/SingleRecipe'
import AddRecipe from '../components/AddRecipe'
import SortRecipes from '../components/SortRecipes'

export default class Recipes extends React.Component {
  constructor() {
    super()
    this.state = {
      // sortDisplay: false,
      // selectedField: '',
    }
  }

  static navigationOptions = {
    title: 'Recipes'
  }

  keyExtractor = item => item.id

  renderItem = ({ item }) => <SingleRecipe props={item} />

  // toggleSortDropdown = () => {
  //   this.setState({ sortDisplay: !this.state.sortDisplay })
  // }

  addRecipe = () => {
    this.setState({ newRecipeDropdown: !this.state.newRecipeDropdown })
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
            <View style={styles.container}>
              <AddRecipe />
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
