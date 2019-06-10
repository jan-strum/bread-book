import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import Swipeout from 'react-native-swipeout'
import { Mutation } from 'react-apollo'
import { dateFormatter } from '../utils'
import { FIND_ALL_RECIPES } from '../gql/queries'
import { DELETE_RECIPE } from '../gql/mutations'

const SingleRecipe = ({ item, navigation }) => {
  const { navigate } = navigation
  console.log('id', item.id)
  return (
    <Mutation
      mutation={DELETE_RECIPE}
      refetchQueries={() => [{ query: FIND_ALL_RECIPES }]}
    >
      {deleteRecipe => (
        <Swipeout
          right={[
            {
              text: 'Delete',
              backgroundColor: 'lightgray',
              onPress: () => {
                deleteRecipe({ variables: { id: item.id } })
              }
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
      )}
    </Mutation>
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
