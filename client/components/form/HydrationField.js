import React from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

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
              style={styles.percentageInput}
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
