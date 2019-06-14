import React from 'react'
import { View, Text, TextInput } from 'react-native'
import { styles } from '../../styles/ingredientForm'

export default class StringFields extends React.Component {
  constructor() {
    super()
    this.fields = ['Name', 'Description', 'Amount (g)']
  }

  render() {
    const { state, updateStringField, subIngredientIndex } = this.props
    return (
      <View>
        {this.fields.map((field, index) => {
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
                keyboardType={field === 'Amount (g)' ? 'numeric' : 'default'}
                value={String(state.ingredient[stateField])}
                returnKeyType={index !== 2 ? 'next' : 'done'}
                onChangeText={text => {
                  updateStringField(stateField, text, subIngredientIndex)
                }}
                ref={input => {
                  this[field] = input
                }}
                onSubmitEditing={() => {
                  const nextField = this[this.fields[index + 1]]
                  index < 2 ? nextField.focus() : this[field].blur()
                }}
              />
            </View>
          )
        })}
      </View>
    )
  }
}
