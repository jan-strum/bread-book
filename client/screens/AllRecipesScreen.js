import React from 'react'
import { View, FlatList, Text, StyleSheet } from 'react-native'
import { Query } from 'react-apollo'

import { FIND_ALL_RECIPES } from '../gql/queries'
import SingleRecipe from '../components/SingleRecipe'
import AddRecipe from '../components/AddRecipe'

export default class Recipes extends React.Component {
  static navigationOptions = {
    title: 'Recipes'
  }

  keyExtractor = item => item.id

  renderItem = ({ item }) => {
    return <SingleRecipe item={item} navigation={this.props.navigation} />
  }

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
              <AddRecipe navigation={this.props.navigation} />
              <FlatList
                data={data.findAllRecipes}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderItem}
                navigation={this.props.navigation}
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
