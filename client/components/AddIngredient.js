import React from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { ButtonGroup } from 'react-native-elements'
import { Mutation } from 'react-apollo'
import { CREATE_INGREDIENT } from '../gql/mutations'
import { FIND_FULL_RECIPE } from '../gql/queries'

export default class AddIngredient extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      description: '',
      quantity: '',
      hydration: null,
      isComplex: false,
      subIngredients: [],
      superIngredientId: null,
      selectedIndex: 2
    }
  }

  updateField = (input, field) => {
    this.setState({ [field]: input })
  }
  setHydration = selectedIndex => {
    if (selectedIndex === 0) {
      this.setState({ hydration: 0.0, selectedIndex })
    } else if (selectedIndex === 1) {
      this.setState({ hydration: 100.0, selectedIndex })
    } else {
      this.setState({ selectedIndex })
    }
  }
  createIngredient = () => {
    console.log(this.state)
  }

  render() {
    const { recipeId } = this.props
    console.log(recipeId)
    const { name, description, quantity, hydration, isComplex } = this.state
    return (
      <Mutation
        mutation={CREATE_INGREDIENT}
        refetchQueries={() => [
          { query: FIND_FULL_RECIPE, variables: { id: recipeId } }
        ]}
      >
        {createIngredient => (
          <View style={styles.form}>
            <Text style={styles.header}>Add an ingredient</Text>
            {fields.map((field, index) => {
              let stateField
              field === 'Amount (g)'
                ? (stateField = 'quantity')
                : (stateField = field.charAt(0).toLowerCase() + field.slice(1))
              return (
                <View style={styles.field} key={field}>
                  <Text style={[styles.label, styles.text]}>{field + ':'}</Text>
                  <TextInput
                    style={styles.text}
                    placeholder={`Enter the ${field
                      .split(' ')[0]
                      .toLowerCase()} here...`}
                    keyboardType={
                      field === 'Amount (g)' ? 'numeric' : 'default'
                    }
                    value={String(this.state[stateField])}
                    returnKeyType={index < 2 ? 'next' : 'done'}
                    onChangeText={text => this.setState({ [stateField]: text })}
                    ref={input => {
                      this[field] = input
                    }}
                    onSubmitEditing={() => {
                      index < 2
                        ? this[fields[index + 1]].focus()
                        : this[field].blur()
                    }}
                  />
                </View>
              )
            })}
            <ButtonGroup
              buttons={['Dry', 'Wet', 'NA']}
              onPress={this.setHydration}
              selectedIndex={this.state.selectedIndex}
              containerStyle={styles.buttonGroup}
              // textStyle={styles.button}
              selectedButtonStyle={{ backgroundColor: '#CDCDCD' }}
            />
            <TouchableOpacity
              onPress={() => {
                createIngredient({
                  variables: {
                    name,
                    description,
                    quantity: Number(quantity),
                    hydration,
                    isComplex,
                    recipeId: Number(recipeId)
                  }
                })
              }}
              style={styles.add}
            >
              <Text style={{ fontSize: 18, marginBottom: 20 }}>Add &#43;</Text>
            </TouchableOpacity>
          </View>
        )}
      </Mutation>
    )
  }
}

const fields = ['Name', 'Description', 'Amount (g)']

const styles = StyleSheet.create({
  header: {
    marginTop: 22,
    marginBottom: 8,
    fontSize: 22
  },
  form: {
    marginHorizontal: 20
  },
  field: {
    marginVertical: 5,
    marginHorizontal: 20,
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  label: {
    fontWeight: '500'
  },
  text: {
    marginTop: 3,
    marginBottom: 7
  },
  buttonGroup: {
    marginTop: 10,
    marginLeft: 20,
    width: 200
  },
  // button: {
  //   padding: 0,
  //   margin: 0
  // },
  add: {
    marginTop: 10,
    alignItems: 'flex-end'
  }
})
