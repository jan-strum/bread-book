import React from 'react'
import { View, Text } from 'react-native'
import { dateFormatter } from '../utils'

export default class FullRecipeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { name, createdAt } = navigation.getParam('item')
    const date = (
      <Text style={{ marginRight: 10 }}>{dateFormatter(createdAt)}</Text>
    )
    return {
      title: name,
      headerRight: date
    }
  }

  render() {
    return (
      <View>
        <Text>Single Recipe</Text>
      </View>
    )
  }
}
