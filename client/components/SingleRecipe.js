import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import Swipeout from 'react-native-swipeout'
import { dateFormatter } from '../utils'

const SingleRecipe = ({ item, navigation }) => {
  const { navigate } = navigation
  return (
    <Swipeout
      right={[
        {
          text: 'Delete',
          backgroundColor: 'lightgray'
        }
      ]}
      autoClose={true}
    >
      <TouchableOpacity
        id={item.id}
        style={styles.row}
        onPress={() => {
          navigate('FullRecipeScreen', { item })
        }}
      >
        <Text>{item.name}</Text>
        <Text style={styles.date}>{dateFormatter(item.createdAt)}</Text>
      </TouchableOpacity>
    </Swipeout>
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
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: 'white'
  },
  date: { fontWeight: '200', fontSize: 12, color: 'gray' }
})
