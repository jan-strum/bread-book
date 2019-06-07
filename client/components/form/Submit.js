import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { styles } from '../../styles/form'

const Submit = props => {
  const {
    name,
    description,
    quantity,
    hydration,
    isComplex,
    subIngredients
  } = props.state.ingredient
  const { recipeId, createIngredient, clearFields, navigation } = props

  return (
    <TouchableOpacity
      onPress={() => {
        if (subIngredients.length) {
          subIngredients.forEach(subIngredient => {
            subIngredient.quantity = Number(subIngredient.quantity)
            subIngredient.hydration = Number(subIngredient.hydration)
          })
        }
        createIngredient({
          variables: {
            name,
            description,
            quantity: Number(quantity),
            hydration: Number(hydration),
            isComplex,
            subIngredients,
            recipeId: Number(recipeId)
          }
        })
        clearFields()
        navigation.navigate('FullRecipeScreen', { isEditing: true })
      }}
      style={styles.submit}
    >
      <Text style={{ fontSize: 18, marginBottom: 20 }}>Submit ingredient</Text>
    </TouchableOpacity>
  )
}

export default Submit
