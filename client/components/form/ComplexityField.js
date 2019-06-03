import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default class ComplexityFIeld extends React.Component {
  constructor() {
    super()
    this.complexities = ['No', 'Yes']
  }

  render() {
    const { state, setComplexity } = this.props

    return (
      <View style={styles.field}>
        <Text style={[styles.label, styles.text]}>
          Does this ingredient contain other ingredients that you would like to
          list?
        </Text>
        <View style={styles.buttonContainer}>
          {this.complexities.map((complexity, index) => (
            <TouchableOpacity
              onPress={() => setComplexity(index)}
              key={complexity}
              style={
                state.complexityIndex !== index
                  ? styles.button
                  : [styles.button, styles.selectedButton]
              }
            >
              <Text
                style={
                  state.complexityIndex !== index
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
