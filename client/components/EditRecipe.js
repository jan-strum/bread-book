import React from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

export default class EditRecipe extends React.Component {
  render() {
    const { isEditing } = this.props
    return (
      <TouchableOpacity onPress={this.toggleEdit}>
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
