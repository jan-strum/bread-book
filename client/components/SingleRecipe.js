import React from 'react'
import { TouchableOpacity, Text, Alert, StyleSheet } from 'react-native'
import Swipeout from 'react-native-swipeout'
import { Mutation } from 'react-apollo'
import { dateFormatter } from '../utils'
import { FIND_ALL_RECIPES } from '../gql/queries'
import { DELETE_RECIPE } from '../gql/mutations'

export default class SingleRecipe extends React.Component {
  constructor() {
    super()
    this.state = {
      isClosed: false
    }
  }

  render() {
    const { item, navigation } = this.props
    const { navigate } = navigation
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
                  Alert.alert(
                    'Are you sure you want to delete this recipe?',
                    '',
                    [
                      {
                        text: 'Yes',
                        onPress: () =>
                          deleteRecipe({ variables: { id: item.id } })
                      },
                      {
                        text: 'No',
                        onPress: () => this.setState({ isClosed: true })
                      }
                    ]
                  )
                }
              }
            ]}
            close={this.state.isClosed}
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
}

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
