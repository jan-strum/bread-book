import React from 'react'
import {
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native'
import IngredientsTable from '../components/IngredientsTable'
import { Query } from 'react-apollo'
import { FIND_FULL_RECIPE } from '../gql/queries'
import { dateFormatter, log } from '../utils'
import AddIngredient from '../components/AddIngredient'
import { ScrollView } from 'react-native-gesture-handler'

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

  render() {
    const { id } = this.props.navigation.getParam('item')
    const recipeId = id
    return (
      <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
        <ScrollView>
          <Query query={FIND_FULL_RECIPE} variables={{ id }}>
            {({ data, loading, error }) => {
              if (loading) return <Text>Loading...</Text>
              if (error) {
                console.log('error', error)
                return <Text>Error!</Text>
              }
              return data.findFullRecipe.ingredients.length ? (
                <IngredientsTable
                  ingredients={data.findFullRecipe.ingredients}
                  recipeId={recipeId}
                  navigation={this.props.navigation}
                />
              ) : (
                <AddIngredient recipeId={recipeId} />
              )
            }}
          </Query>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({})
