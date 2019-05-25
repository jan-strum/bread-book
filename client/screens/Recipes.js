import React from 'react'
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Button,
  StyleSheet
} from 'react-native'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import SingleRecipe from '../components/SingleRecipe'
import SortRecipes from '../components/SortRecipes'
import { TextInput } from 'react-native-gesture-handler'

const FIND_ALL_RECIPES = gql`
  query findAllRecipes {
    findAllRecipes {
      id
      name
      createdAt
    }
  }
`

const FIND_OR_CREATE_RECIPE = gql`
  mutation findOrCreateRecipe($name: String!) {
    findOrCreateRecipe(name: $name) {
      id
      name
    }
  }
`

export default class Recipes extends React.Component {
  constructor() {
    super()
    this.state = {
      sortDisplay: false,
      selectedField: '',
      newRecipeDropdown: false,
      name: ''
    }
  }

  static navigationOptions = {
    title: 'Recipes'
  }

  keyExtractor = item => item.id

  renderItem = ({ item }) => <SingleRecipe props={item} />

  // toggleSortDropdown = () => {
  //   this.setState({ sortDisplay: !this.state.sortDisplay })
  // }

  addRecipe = () => {
    this.setState({ newRecipeDropdown: !this.state.newRecipeDropdown })
  }

  render() {
    return (
      <Query query={FIND_ALL_RECIPES}>
        {({ data, loading, error }) => {
          if (loading) return <Text>Loading...</Text>
          if (error) {
            console.log('error', error)
            return <Text>Error!</Text>
          }
          return (
            <View style={styles.container}>
              <View>
                <TouchableOpacity onPress={this.addRecipe}>
                  {!this.state.newRecipeDropdown ? (
                    <Text style={styles.button}>&#43;</Text>
                  ) : (
                    <Text style={styles.button}>&#8722;</Text>
                  )}
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
                ) : null}
              </View>
              {/* <SortRecipes /> */}
              <FlatList
                data={data.findAllRecipes}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderItem}
              />
            </View>
          )
        }}
      </Query>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  button: {
    textAlign: 'right',
    paddingRight: 25,
    fontSize: 35,
    fontWeight: '200'
  },
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
