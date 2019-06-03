import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { styles } from '../../styles/form'

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
