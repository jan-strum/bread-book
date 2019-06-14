import React from 'react'
import { View } from 'react-native'
import AddRecipe from './AddRecipe'
import EditRecipe from './EditRecipe'

export default class AllRecipesHeader extends React.Component {
  render() {
    const { navigation, message, isEditing, toggleEdit } = this.props
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <EditRecipe isEditing={isEditing} toggleEdit={toggleEdit} />
        <AddRecipe navigation={navigation} message={message} />
      </View>
    )
  }
}
