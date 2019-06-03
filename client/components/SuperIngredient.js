import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'

export default class SuperIngredient extends React.Component {
  constructor() {
    super()
    this.state = {
      selected: false
    }
  }

  select = () => {
    this.setState({ selected: !this.state.selected })
  }

  render() {
    const { ingredient } = this.props
    const { hydration } = ingredient

    let hydrationText
    if (hydration === 0) hydrationText = 'Dry (0%)'
    else if (hydration === 100) hydrationText = 'Wet (100%)'
    else if (typeof hydration === 'number') hydrationText = `${hydration}%`

    return (
      <TouchableOpacity onPress={this.select} style={{ flex: 1 }}>
        {!this.state.selected ? (
          <Text>
            {ingredient.name}
            <Text style={{ color: 'gray' }}>&#x2001;(...)</Text>
          </Text>
        ) : (
          <View>
            <Text>
              {ingredient.name}
              <Text style={[styles.name, styles.gray]}>&#x2001;&uarr;</Text>
            </Text>
            {ingredient.description ? (
              <Text style={styles.description}>{ingredient.description}</Text>
            ) : null}
            {hydrationText ? (
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.semiBold}>Hydration:</Text>
                <Text style={[styles.gray, styles.hydration]}>
                  {hydrationText}
                </Text>
              </View>
            ) : null}
            {ingredient.subIngredients.length ? (
              <View style={styles.subIngredientsContainer}>
                <Text style={styles.semiBold}>Composed of:</Text>
                {ingredient.subIngredients.map(subIngredient => (
                  <View key={subIngredient.id} style={styles.row}>
                    <Text style={[styles.gray]}>{subIngredient.name}</Text>
                    <Text style={[styles.gray]}>{subIngredient.quantity}</Text>
                  </View>
                ))}
              </View>
            ) : null}
          </View>
        )}
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  name: {
    marginBottom: 10
  },
  description: {
    marginTop: 5,
    color: 'gray'
  },
  hydration: {
    marginVertical: 5,
    marginLeft: 5
  },
  subIngredientsContainer: {
    marginTop: 5
  },
  row: {
    flexDirection: 'row',
    paddingLeft: 20,
    justifyContent: 'space-between'
  },
  semiBold: {
    marginVertical: 5,
    color: '#505050'
  },
  gray: {
    color: 'gray'
  }
})
