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
  const { recipeId, createIngredient, clearFields } = props

  return (
    <TouchableOpacity
      onPress={() => {
        if (subIngredients.length) {
          subIngredients.forEach(subIngredient => {
            subIngredient.quantity = Number(subIngredient.quantity)
            subIngredient.hydration = Number(subIngredient.hydration)
            // console.log('sub zero', subIngredients[0])
            // console.log('quantity', typeof subIngredients[0].quantity)
            // console.log('hydration', typeof subIngredients[0].hydration)
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
        // }
      }}
      style={styles.submit}
    >
      <Text style={{ fontSize: 18, marginBottom: 20 }}>Submit ingredient</Text>
    </TouchableOpacity>
  )
}

export default Submit
