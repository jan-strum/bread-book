import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'

const SubIngredient = ({ subIngredient, subIngredientSelected }) => {
  return (
    <View key={subIngredient.id} style={styles.row}>
      <Text style={[styles.gray]}>{subIngredient.name}</Text>
      <Text style={[styles.gray]}>{subIngredient.quantity}</Text>
    </View>
  )
}

export default SubIngredient

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingLeft: 20,
    justifyContent: 'space-between'
  },
  semiBold: {
    marginVertical: 5,
    color: '#505050'
  },
  gray: {
    color: 'gray'
  }
})
