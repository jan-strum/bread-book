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

export default class NewRecipe extends React.Component {
  constructor() {
    super()
    this.state = {
      name: ''
    }
  }

  static navigationOptions = ({ navigation }) => {
    const backButton = (
      <TouchableOpacity
        style={{ marginLeft: 10 }}
        onPress={() => navigation.navigate('AllRecipesScreen')}
      >
        <Text style={{ color: 'gray' }}>&larr; Recipes</Text>
      </TouchableOpacity>
    )
    return {
      title: 'New Recipe',
      headerLeft: backButton
    }
  }

  render() {
    const { navigation } = this.props

    return (
      <Mutation
        mutation={FIND_OR_CREATE_RECIPE}
        refetchQueries={() => [{ query: FIND_ALL_RECIPES }]}
      >
        {findOrCreateRecipe => {
          return (
            <View style={styles.form}>
              <View style={styles.field}>
                <Text style={styles.label}>Name:</Text>
                <TextInput
                  placeholder='Enter the recipe name here...'
                  onChangeText={name => this.setState({ name })}
                  value={this.state.name}
                  returnKeyType='done'
                  style={styles.input}
                  multiline={true}
                  blurOnSubmit={true}
                />
              </View>
              <TouchableOpacity
                onPress={async () => {
                  const { data } = await findOrCreateRecipe({
                    variables: { name: this.state.name }
                  })
                  const item = {}
                  item.item = data.findOrCreateRecipe
                  navigation.navigate('FullRecipeScreen', item)
                  this.setState({
                    name: '',
                    newRecipeDropdown: !this.state.newRecipeDropdown
                  })
                }}
                color='black'
              >
                <Text
                  style={{
                    color: this.state.name ? 'black' : '#C7C7CD',
                    textAlign: 'right',
                    fontSize: 18
                  }}
                >
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          )
        }}
      </Mutation>
    )
  }
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30
  },
  field: {
    marginBottom: 10
  },
  label: {
    marginBottom: 20,
    fontSize: 30,
    fontWeight: '400'
  },
  input: {
    marginBottom: 20,
    fontSize: 18
  }
})
