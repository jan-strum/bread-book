import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import AddRecipe from '../components/AddRecipe'
import EditRecipe from '../components/EditRecipe'

export default class AllRecipesHeader extends React.Component {
  constructor() {
    super()
    this.state = {
      isEditing: false
    }
  }

  toggleEdit = () => {
    this.setState({ isEditing: !this.state.isEditing })
  }

  render() {
    const { navigation, message } = this.props
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <EditRecipe isEditing={this.state.isEditing} />
        <AddRecipe navigation={navigation} message={message} />
      </View>
    )
  }
}
