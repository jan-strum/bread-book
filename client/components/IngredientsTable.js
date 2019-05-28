import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { SingleIngredient } from './SingleIngredient'

export const IngredientsTable = ({ ingredients, recipeId }) => (
  <View style={styles.container}>
    <View style={[styles.head, styles.row]}>
      <Text style={styles.bold}>Name</Text>
      <Text style={styles.bold}>Amount (g)</Text>
    </View>
    <SingleIngredient ingredients={ingredients} recipeId={recipeId} />
  </View>
)

const styles = StyleSheet.create({
  container: {
    margin: 20,
    borderColor: '#bbb',
    borderWidth: StyleSheet.hairlineWidth
  },
  head: {
    backgroundColor: '#f6f6f6',
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between'
  },
  bold: { fontWeight: '500' }
})
