import React from 'react'
import { View, Text } from 'react-native'

export default class SingleRecipeScreen extends React.Component {
  static navigationOptions = {
    title: 'Recipe'
  }

  render() {
    return (
      <View>
        <Text>Single Recipe</Text>
      </View>
    )
  }
}
