import React from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { Mutation } from 'react-apollo'
import { FIND_ALL_RECIPES } from '../gql/queries'
import { FIND_OR_CREATE_RECIPE } from '../gql/mutations'

export default class AddRecipe extends React.Component {
  constructor() {
    super()
    this.state = {
      newRecipeDropdown: false,
      name: ''
    }
  }

  addRecipe = () => {
    this.setState({ newRecipeDropdown: !this.state.newRecipeDropdown })
  }

  render() {
    const { navigation } = this.props
    return (
      <Mutation
        mutation={FIND_OR_CREATE_RECIPE}
        refetchQueries={() => [{ query: FIND_ALL_RECIPES }]}
      >
        {(findOrCreateRecipe, { data }) => {
          return (
            <View>
              <View>
                <TouchableOpacity onPress={this.addRecipe}>
                  <Text style={styles.add}>
                    {!this.state.newRecipeDropdown
                      ? 'Add New Recipe'
                      : 'Cancel'}
                  </Text>
                </TouchableOpacity>
                {this.state.newRecipeDropdown ? (
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
                          returnKeyType='done'
                        />
                      </View>
                      <View>
                        <TouchableOpacity
                          onPress={() => {
                            findOrCreateRecipe({
                              variables: { name: this.state.name }
                            }).then(recipe => {
                              const item = {}
                              item.item = recipe.data.findOrCreateRecipe
                              navigation.navigate('FullRecipeScreen', item)
                            })
                            this.setState({
                              name: '',
                              newRecipeDropdown: !this.state.newRecipeDropdown
                            })
                          }}
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
                ) : null}
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
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  label: {
    fontSize: 18,
    fontWeight: '400',
    paddingVertical: 10
  },
  add: {
    textAlign: 'right',
    marginTop: 20,
    marginBottom: 10,
    marginRight: 20,
    fontSize: 13,
    color: 'gray'
  }
})
