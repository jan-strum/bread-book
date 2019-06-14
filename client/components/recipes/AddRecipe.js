import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

export default class AddRecipe extends React.Component {
  render() {
    const { navigation, message } = this.props
    return (
      <TouchableOpacity onPress={() => navigation.navigate('NewRecipeScreen')}>
        <Text
          style={[
            styles.add,
            message === 'Create your first recipe' && styles.createFirst
          ]}
        >
          {message}
        </Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  add: {
    textAlign: 'right',
    marginTop: 20,
    marginBottom: 20,
    marginRight: 20,
    fontSize: 13,
    color: 'gray'
  },
  createFirst: {
    marginTop: 40,
    marginRight: 0,
    textAlign: 'center',
    fontSize: 18
  }
})
