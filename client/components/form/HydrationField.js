import React from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { styles } from '../../styles/form'

export default class HydrationField extends React.Component {
  constructor() {
    super()
    this.hydrations = ['Dry', 'Wet', 'NA']
  }

  render() {
    const { state, setHydration } = this.props

    return (
      <View styles={styles.field}>
        <Text style={[styles.field, styles.text, styles.label]}>
          Hydration:
        </Text>
        <View style={styles.field}>
          <View style={styles.buttonContainer}>
            {this.hydrations.map((hydration, index) => (
              <TouchableOpacity
                onPress={() => setHydration(index)}
                key={hydration}
                style={
                  state.hydrationIndex !== index
                    ? styles.button
                    : [styles.button, styles.selectedButton]
                }
              >
                <Text
                  style={
                    state.hydrationIndex !== index
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
              returnKeyType='done'
              style={styles.other}
              value={state.hydrationText}
              onChangeText={text => setHydration(text)}
            />
            <Text>{state.hydrationText.length ? '%' : null}</Text>
          </View>
        </View>
      </View>
    )
  }
}
