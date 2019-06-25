import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import SubIngredient from './SubIngredient'
import styles from './ingredientStyles'

export default class SuperIngredient extends React.Component {
  constructor() {
    super()
    this.state = {
      ingredientSelected: false
    }
  }

  componentDidMount() {
    this.setState({ ingredientSelected: this.props.isDisplayed })
  }
  selectIngredient = () => {
    this.setState({ ingredientSelected: !this.state.ingredientSelected })
  }

  render() {
    const { ingredient } = this.props
    const { hydration } = ingredient

    let hydrationText
    if (hydration === 0) hydrationText = 'Dry (0%)'
    else if (hydration === 100) hydrationText = 'Wet (100%)'
    else if (typeof hydration === 'number') hydrationText = `${hydration}%`

    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={() => this.selectIngredient()}>
          {!this.state.ingredientSelected ? (
            <Text>
              {ingredient.name}
              <Text style={{ color: 'gray' }}>&#x2001;(...)</Text>
            </Text>
          ) : (
            <View>
              <Text>
                {ingredient.name}
                <Text style={styles.gray}>&#x2001;&uarr;</Text>
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
                      isDisplayed={this.props.isDisplayed}
                    />
                  ))}
                </View>
              ) : null}
            </View>
          )}
        </TouchableOpacity>
      </View>
    )
  }
}
