import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import SuperIngredient from './SuperIngredient'
const shortid = require('shortid')

export const SingleIngredient = ({ ingredients }) => {
  return ingredients.map((ingredient, index) => (
    <View
      style={[
        styles.row,
        { backgroundColor: index % 2 === 0 ? '#fff' : '#fafafa' }
      ]}
      key={shortid.generate()}
    >
      {ingredient.isComplex || ingredient.description ? (
        <SuperIngredient ingredient={ingredient} />
      ) : (
        <Text>{ingredient.name}</Text>
      )}
      <Text>{String(ingredient.quantity)}</Text>
    </View>
  ))
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between'
  }
})
