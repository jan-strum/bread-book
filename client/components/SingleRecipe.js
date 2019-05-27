import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { dateFormatter } from '../utils'

const SingleRecipe = ({ item, navigation }) => {
  const { navigate } = navigation
  return (
    <TouchableOpacity
      id={item.id}
      style={styles.row}
      onPress={() => navigate('FullRecipeScreen', { item: item })}
    >
      <Text>{item.name}</Text>
      <Text style={styles.date}>{dateFormatter(item.createdAt)}</Text>
    </TouchableOpacity>
  )
}

export default SingleRecipe

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  date: { fontWeight: '200', fontSize: 12, color: 'gray' }
})
