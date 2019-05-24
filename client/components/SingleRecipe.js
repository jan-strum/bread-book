import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { dateFormatter } from '../utils'

const SingleRecipe = ({ props }) => {
  return (
    <View id={props.id} style={styles.row}>
      <Text>{props.name}</Text>
      <Text style={styles.date}>{dateFormatter(props.createdAt)}</Text>
    </View>
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
