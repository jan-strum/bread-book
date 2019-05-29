import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { IngredientsTable } from '../components/IngredientsTable'
import { Query } from 'react-apollo'
import { FIND_FULL_RECIPE } from '../gql/queries'
import { dateFormatter } from '../utils'

export default class FullRecipeScreen extends React.Component {
  constructor() {
    super()
    this.state = { isEditing: false }
  }

  static navigationOptions = ({ navigation }) => {
    const { name, createdAt } = navigation.getParam('item')
    const date = (
      <Text style={{ marginRight: 15, color: 'gray' }}>
        {dateFormatter(createdAt)}
      </Text>
    )
    const backButton = (
      <TouchableOpacity
        style={{ marginLeft: 10 }}
        onPress={() => navigation.navigate('AllRecipesScreen')}
      >
        <Text style={{ color: 'gray' }}>&larr; Recipes</Text>
      </TouchableOpacity>
    )
    return {
      title: name,
      headerRight: date,
      headerLeft: backButton
    }
  }

  toggleEdit = () => {
    this.setState({ isEditing: !this.state.isEditing })
  }

  render() {
    const { id } = this.props.navigation.getParam('item')
    const recipeId = id
    return (
      <Query query={FIND_FULL_RECIPE} variables={{ id }}>
        {({ data, loading, error }) => {
          if (loading) return <Text>Loading...</Text>
          if (error) {
            console.log('error', error)
            return <Text>Error!</Text>
          }
          return (
            <View style={{ flex: 1 }}>
              <Text style={styles.header}>Ingredients:</Text>
              <TouchableOpacity onPress={this.toggleEdit}>
                <Text style={styles.edit}>
                  {!this.state.isEditing ? 'Edit' : 'Cancel'}
                </Text>
              </TouchableOpacity>
              <IngredientsTable
                ingredients={data.findFullRecipe.ingredients}
                recipeId={recipeId}
                isEditing={this.state.isEditing}
              />
            </View>
          )
        }}
      </Query>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    marginTop: 25,
    marginLeft: 20,
    fontSize: 20
  },
  edit: {
    textAlign: 'right',
    marginBottom: 10,
    marginRight: 22,
    fontSize: 13,
    color: 'gray'
  }
})
