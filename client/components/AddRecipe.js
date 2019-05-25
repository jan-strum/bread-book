import React from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const FIND_OR_CREATE_RECIPE = gql`
  mutation findOrCreateRecipe($name: String!) {
    findOrCreateRecipe(name: $name) {
      id
      name
    }
  }
`

export default class AddRecipe extends React.Component {
  constructor() {
    super()
    this.state = {
      name: ''
    }
  }

  submitRecipe = name => {}

  render() {
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
              onPress={() => this.submitRecipe(this.state.name)}
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
