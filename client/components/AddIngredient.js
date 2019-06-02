import React from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
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
      hydrationText: '',
      isComplex: false,
      subIngredients: [],
      superIngredientId: null,
      superIgredientName: '',
      hydrationIndex: 2,
      complexityIndex: 0
    }
  }

  componentDidMount() {
    this.Name.focus()
  }

  updateField = (input, field) => {
    this.setState({ [field]: input })
  }
  setHydration = input => {
    if (typeof input === 'number') {
      if (input === 0) this.setState({ hydration: 0.0, hydrationIndex: input })
      else if (input === 1)
        this.setState({ hydration: 100.0, hydrationIndex: input })
      else if (input === 2)
        this.setState({ hydration: null, hydrationIndex: input })
    } else {
      this.setState({
        hydration: input,
        hydrationIndex: null,
        hydrationText: input
      })
    }
  }
  setComplexity = complexityIndex => {
    const isComplex = complexityIndex === 1
    this.setState({ isComplex, complexityIndex })
  }

  render() {
    const { recipeId } = this.props
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
            <Text style={styles.header}>Add an ingredient'</Text>

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

            <View styles={styles.field}>
              <Text style={[styles.field, styles.text, styles.label]}>
                Hydration:
              </Text>
              <View style={styles.field}>
                <View style={styles.buttonContainer}>
                  {hydrations.map((hydration, index) => (
                    <TouchableOpacity
                      onPress={() => this.setHydration(index)}
                      key={hydration}
                      style={
                        this.state.hydrationIndex !== index
                          ? styles.button
                          : [styles.button, styles.selectedButton]
                      }
                    >
                      <Text
                        style={
                          this.state.hydrationIndex !== index
                            ? null
                            : styles.selectedButtonText
                        }
                      >
                        {hydration}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <View style={styles.percentage}>
                  <Text>Or:</Text>
                  <TextInput
                    placeholder='Specify the exact percentage...'
                    keyboardType='numeric'
                    style={styles.percentageInput}
                    value={this.state.hydrationText}
                    onChangeText={text => this.setHydration(text)}
                  />
                </View>
              </View>
            </View>

            <View style={styles.field}>
              <Text style={[styles.label, styles.text]}>
                Does this ingredient contain other ingredients that you would
                like to list?
              </Text>
              <View style={styles.buttonContainer}>
                {complexities.map((complexity, index) => (
                  <TouchableOpacity
                    onPress={() => this.setComplexity(index)}
                    key={complexity}
                    style={
                      this.state.complexityIndex !== index
                        ? styles.button
                        : [styles.button, styles.selectedButton]
                    }
                  >
                    <Text
                      style={
                        this.state.complexityIndex !== index
                          ? null
                          : styles.selectedButtonText
                      }
                    >
                      {complexity}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity
              onPress={() => {
                createIngredient({
                  variables: {
                    name,
                    description,
                    quantity: Number(quantity),
                    hydration: Number(hydration),
                    isComplex,
                    recipeId: Number(recipeId)
                  }
                })
                this.setState({
                  name: '',
                  description: '',
                  quantity: '',
                  hydrationIndex: 2,
                  hydrationText: ''
                })
              }}
              style={styles.add}
            >
              <Text style={{ fontSize: 18, marginBottom: 20 }}>
                {!this.state.isComplex ? 'Add' : 'Add sub-ingredient'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Mutation>
    )
  }
}

const fields = ['Name', 'Description', 'Amount (g)']
const hydrations = ['Dry', 'Wet', 'NA']
const complexities = ['No', 'Yes']

const styles = StyleSheet.create({
  header: {
    marginTop: 22,
    marginBottom: 8,
    fontSize: 20
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
  buttonContainer: {
    flexDirection: 'row'
  },
  button: {
    marginBottom: 7,
    marginRight: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#F0F0F0',
    borderRadius: 7
  },
  selectedButton: {
    backgroundColor: '#C8C8C8'
  },
  selectedButtonText: {
    color: 'white'
  },
  percentage: {
    flexDirection: 'row',
    paddingVertical: 7
  },
  percentageInput: {
    marginLeft: 10,
    marginRight: 10
  },
  add: {
    marginTop: 10,
    alignItems: 'flex-end'
  }
})
