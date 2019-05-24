import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { dateFormatter } from '../utils'

const SingleRecipe = ({ props }) => {
  return (
    <View id={props.id}>
      <Text>{props.name}</Text>
      <Text>{dateFormatter(props.createdAt)}</Text>
    </View>
  )
}

export default SingleRecipe
