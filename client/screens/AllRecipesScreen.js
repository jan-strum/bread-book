import React from 'react'
import { View, FlatList, Text, StyleSheet } from 'react-native'
import { Query } from 'react-apollo'

import { FIND_ALL_RECIPES } from '../gql/queries'
import SingleRecipe from '../components/SingleRecipe'
import AddRecipe from '../components/AddRecipe'
import AllRecipesHeader from '../components/AllRecipesHeader'

export default class Recipes extends React.Component {
  static navigationOptions = {
    title: 'Recipes'
  }

  keyExtractor = item => item.id

  renderItem = ({ item }) => {
    return <SingleRecipe item={item} navigation={this.props.navigation} />
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
          return data.findAllRecipes.length ? (
            <View style={styles.container}>
              <AllRecipesHeader
                navigation={this.props.navigation}
                message='Add new recipe'
              />
              <FlatList
                data={data.findAllRecipes}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderItem}
                navigation={this.props.navigation}
              />
            </View>
          ) : (
            <AddRecipe
              navigation={this.props.navigation}
              message='Create your first recipe'
            />
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
