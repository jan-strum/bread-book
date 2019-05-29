import React from 'react'
import { StyleSheet, View, TextInput, Button } from 'react-native'
import { Input } from 'react-native-elements'

export default class AddIngredient extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      description: '',
      quantity: 0,
      hydration: null,
      isComplex: false,
      subIngredients: [],
      superIngredientId: null
    }
  }

  updateField = (input, field) => {
    this.setState({ [field]: input })
  }

  render() {
    const { recipeId } = this.props.recipeId
    return (
      <View>
        <Input
        // onChangeText={(input, field) => this.updateField(input, 'name')}
        />
      </View>
    )
  }
}
