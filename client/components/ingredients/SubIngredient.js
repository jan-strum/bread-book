import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { styles } from './SuperIngredient'

export default class SubIngredient extends React.Component {
  constructor() {
    super()
    this.state = {
      subIngredientSelected: false
    }
  }
  selectSubIngredient = () => {
    this.setState({ subIngredientSelected: !this.state.subIngredientSelected })
  }

  render() {
    const { subIngredient } = this.props
    const { hydration } = subIngredient
    let hydrationText
    if (hydration === 0) hydrationText = 'Dry (0%)'
    else if (hydration === 100) hydrationText = 'Wet (100%)'
    else if (typeof hydration === 'number') hydrationText = `${hydration}%`

    return (
      <View style={{ marginTop: 5 }}>
        <TouchableOpacity onPress={() => this.selectSubIngredient()}>
          {!this.state.subIngredientSelected ? (
            <View style={styles.row}>
              <Text style={styles.gray}>
                {subIngredient.name}
                <Text style={styles.gray}>&#x2001;(...)</Text>
              </Text>
              <Text style={[styles.gray]}>{subIngredient.quantity}</Text>
            </View>
          ) : (
            <View>
              <View style={styles.row}>
                <Text style={styles.gray}>
                  {subIngredient.name}
                  <Text style={styles.gray}>&#x2001;&uarr;</Text>
                </Text>
                <Text style={[styles.gray]}>{subIngredient.quantity}</Text>
              </View>
              <View style={styles.subIngredient}>
                {subIngredient.description ? (
                  <Text style={[styles.description]}>
                    {subIngredient.description}
                  </Text>
                ) : null}
                {hydrationText ? (
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.semiBold}>Hydration:</Text>
                    <Text style={[styles.gray, styles.hydration]}>
                      {hydrationText}
                    </Text>
                  </View>
                ) : null}
              </View>
            </View>
          )}
        </TouchableOpacity>
      </View>
    )
  }
}
