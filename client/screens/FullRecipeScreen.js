/* eslint-disable complexity */
import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import IngredientsTable from '../components/IngredientsTable'
import { Query } from 'react-apollo'
import { FIND_FULL_RECIPE } from '../gql/queries'
import { dateFormatter, log } from '../utils'

export default class FullRecipeScreen extends React.Component {
  constructor() {
    super()
    this.state = { isEditing: false }
  }

  static navigationOptions = ({ navigation }) => {
    let { name, createdAt } = navigation.getParam('item')
    createdAt = createdAt ? createdAt : new Date()
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
    const { id, name } = this.props.navigation.state.params.item
    const recipeId = id
    return (
      <KeyboardAwareScrollView
        ref={ref => {
          this.scrollView = ref
        }}
        onContentSizeChange={() => {
          this.scrollView.scrollToEnd({ animated: true })
        }}
        keyboardShouldPersistTaps='handled'
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Query query={FIND_FULL_RECIPE} variables={{ id }}>
          {({ data, loading, error }) => {
            if (loading) return <Text>Loading...</Text>
            if (error) {
              console.log('error', error)
              return <Text>Error!</Text>
            }
            const { ingredients } = data.findFullRecipe

            return (
              <IngredientsTable
                ingredients={ingredients}
                recipeId={recipeId}
                name={name}
                navigation={this.props.navigation}
              />
            )
          }}
        </Query>
      </KeyboardAwareScrollView>
    )
  }
}
