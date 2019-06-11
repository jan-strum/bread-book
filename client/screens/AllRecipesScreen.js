import React from 'react'
import { View, FlatList, Text, StyleSheet } from 'react-native'
import { Query } from 'react-apollo'

import { FIND_ALL_RECIPES } from '../gql/queries'
import SingleRecipe from '../components/SingleRecipe'
import AddRecipe from '../components/AddRecipe'
import AllRecipesHeader from '../components/AllRecipesHeader'

export default class Recipes extends React.Component {
  constructor() {
    super()
    this.state = {
      isEditing: false
    }
  }

  static navigationOptions = {
    title: 'Recipes'
  }

  toggleEdit = () => {
    this.setState({ isEditing: !this.state.isEditing })
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
          data.findAllRecipes.forEach(recipe => {
            recipe.isEditing = this.state.isEditing
          })
          return data.findAllRecipes.length ? (
            <View style={styles.container}>
              <AllRecipesHeader
                isEditing={this.state.isEditing}
                toggleEdit={this.toggleEdit}
                navigation={this.props.navigation}
                message='Add new recipe'
              />
              {data.findAllRecipes.map(recipe => (
                <SingleRecipe
                  key={recipe.id}
                  item={recipe}
                  navigation={this.props.navigation}
                />
              ))}
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
