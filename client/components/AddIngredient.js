import React from 'react'
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'

export default class AddIngredient extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      description: '',
      quantity: 0,
      hydration: null,
      isComplex: false,
      subIngredients: [],
      superIngredientId: null
    }
  }

  updateField = (input, field) => {
    this.setState({ [field]: input })
  }

  render() {
    const { recipeId } = this.props.recipeId
    return (
      <View style={styles.form}>
        <Text style={styles.header}>Add an ingredient</Text>
        {fields.map((field, index) => {
          const stateField =
            field === 'Amount'
              ? 'quantity'
              : field.charAt(0).toUpperCase() + field.slice(1)
          return (
            <View style={styles.field} key={field}>
              <Text style={[styles.label, styles.text]}>{field + ':'}</Text>
              <TextInput
                style={styles.text}
                placeholder={`Enter the ${field
                  .split(' ')[0]
                  .toLowerCase()} here...`}
                keyboardType={field === 'Amount (g)' ? 'numeric' : 'default'}
                value={this.state[stateField]}
                returnKeyType='next'
                onChangeText={stateField => this.setState({ stateField })}
                ref={input => {
                  this[field] = input
                }}
                onSubmitEditing={() => {
                  this[fields[index + 1]].focus()
                }}
              />
            </View>
          )
        })}
      </View>
    )
  }
}

const fields = ['Name', 'Description', 'Amount (g)']

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    marginBottom: 5,
    fontSize: 20
  },
  form: {
    marginHorizontal: 20
  },
  field: {
    marginVertical: 5,
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  text: {
    marginTop: 3,
    marginBottom: 7
  },
  label: {
    fontWeight: '600'
  }
})
