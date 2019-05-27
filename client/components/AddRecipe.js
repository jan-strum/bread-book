import React from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { Mutation, withApollo } from 'react-apollo'
import { FIND_ALL_RECIPES } from '../gql/queries'
import { FIND_OR_CREATE_RECIPE } from '../gql/mutations'

class AddRecipe extends React.Component {
  constructor() {
    super()
    this.state = {
      name: ''
    }
  }

  render() {
    return (
      <Mutation
        mutation={FIND_OR_CREATE_RECIPE}
        refetchQueries={() => [{ query: FIND_ALL_RECIPES }]}
      >
        {findOrCreateRecipe => {
          return (
            <View style={styles.form}>
              <Text style={styles.label}>Name:</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}
              >
                <View>
                  <TextInput
                    placeholder='Enter the recipe name here...'
                    onChangeText={name => this.setState({ name })}
                    value={this.state.name}
                  />
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() =>
                      findOrCreateRecipe({
                        variables: { name: this.state.name }
                      })
                    }
                    color='black'
                  >
                    <Text
                      style={{
                        color: this.state.name ? 'black' : '#C7C7CD'
                      }}
                    >
                      Submit
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )
        }}
      </Mutation>
    )
  }
}

const styles = StyleSheet.create({
  form: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  label: {
    fontSize: 18,
    paddingVertical: 10
  }
})

export default withApollo(AddRecipe)
