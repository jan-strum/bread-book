import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const SingleRecipe = ({ props }) => {
  return (
    <View id={props.id}>
      <Text>{props.name}</Text>
    </View>
  )
}

export default SingleRecipe
