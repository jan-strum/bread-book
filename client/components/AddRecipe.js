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
    const { navigation, message } = this.props
    return (
      <TouchableOpacity onPress={() => navigation.navigate('NewRecipe')}>
        <Text
          style={[
            styles.add,
            message === 'Create your first recipe' && styles.createFirst
          ]}
        >
          {!this.state.newRecipeDropdown ? message : 'Cancel'}
        </Text>
      </TouchableOpacity>
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
    paddingBottom: 10
  },
  add: {
    textAlign: 'right',
    marginTop: 20,
    marginBottom: 20,
    marginRight: 20,
    fontSize: 13,
    color: 'gray'
  },
  createFirst: {
    marginTop: 40,
    marginRight: 0,
    textAlign: 'center',
    fontSize: 18
  }
})
