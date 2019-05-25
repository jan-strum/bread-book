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
import { FIND_ALL_RECIPES } from '../screens/Recipes'

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

  render() {
    return (
      <Mutation
        mutation={FIND_OR_CREATE_RECIPE}
        // update={(cache, { data: { findOrCreateRecipe } }) => {
        //   const { recipes } = cache.readQuery({ query: FIND_ALL_RECIPES })
        //   // console.log('cache', cache)
        //   cache.writeQuery({
        //     query: FIND_ALL_RECIPES,
        //     data: { recipes: recipes.concat([findOrCreateRecipe]) }
        //   })
        // }}
      >
        {findOrCreateRecipe => (
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
                    findOrCreateRecipe({ variables: { name: this.state.name } })
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
        )}
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