import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

export default class EditRecipe extends React.Component {
  render() {
    const { isEditing, toggleEdit } = this.props
    return (
      <TouchableOpacity onPress={() => toggleEdit()}>
        <Text style={styles.edit}>
          {!isEditing ? 'Edit / delete a recipe' : 'Cancel'}
        </Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  edit: {
    textAlign: 'left',
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 20,
    fontSize: 13,
    color: 'gray'
  }
})
