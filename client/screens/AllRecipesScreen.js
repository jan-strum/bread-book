import React from 'react'
import { View, Text } from 'react-native'
import { Query } from 'react-apollo'

import { FIND_ALL_RECIPES } from '../gql/queries'
import SingleRecipe from '../components/recipes/SingleRecipe'
import AddRecipe from '../components/recipes/AddRecipe'
import AllRecipesHeader from '../components/recipes/AllRecipesHeader'

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
            <View style={{ flex: 1 }}>
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
