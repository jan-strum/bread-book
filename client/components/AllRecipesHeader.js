import React from 'react'
import { View } from 'react-native'
import AddRecipe from '../components/AddRecipe'
import EditRecipe from '../components/EditRecipe'

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
