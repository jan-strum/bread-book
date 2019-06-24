import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import SubIngredient from './SubIngredient'

export default class SuperIngredient extends React.Component {
  constructor() {
    super()
    this.state = {
      ingredientSelected: false,
      subIngredientSelected: false
    }
  }

  select = type => {
    console.log('type', type)
    this.setState({ [type]: !this.state[type] })
  }

  render() {
    const { ingredient } = this.props
    const { hydration } = ingredient

    let hydrationText
    if (hydration === 0) hydrationText = 'Dry (0%)'
    else if (hydration === 100) hydrationText = 'Wet (100%)'
    else if (typeof hydration === 'number') hydrationText = `${hydration}%`

    return (
      <TouchableOpacity
        onPress={() => this.select('ingredientSelected')}
        style={{ flex: 1 }}
      >
        {!this.state.ingredientSelected ? (
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
                  <SubIngredient
                    key={subIngredient.id}
                    subIngredient={subIngredient}
                    subIngredientSelected={this.state.subIngredientSelected}
                  />
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
  row: {
    flexDirection: 'row',
    paddingLeft: 20,
    justifyContent: 'space-between'
  },
  subIngredientsContainer: {
    marginTop: 5
  },
  semiBold: {
    marginVertical: 5,
    color: '#505050'
  },
  gray: {
    color: 'gray'
  }
})
