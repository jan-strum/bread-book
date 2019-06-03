import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

export default class StringFields extends React.Component {
  constructor() {
    super()
    this.fields = ['Name', 'Description', 'Amount (g)']
  }

  render() {
    const { state, updateStringField } = this.props
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
                value={String(state[stateField])}
                returnKeyType={index !== 2 ? 'next' : 'done'}
                onChangeText={text => {
                  updateStringField(stateField, text)
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
    marginLeft: 10
  },
  add: {
    marginTop: 10,
    alignItems: 'flex-end'
  }
})
