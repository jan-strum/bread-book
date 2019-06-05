import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { styles } from '../../styles/form'

const Submit = props => {
  const { name, description, quantity, hydration, isComplex } = props.state
  const { recipeId, superIngredientId, createIngredient, clearFields } = props

  return (
    <TouchableOpacity
      onPress={() => {
        if (!superIngredientId) {
          createIngredient({
            variables: {
              name,
              description,
              quantity: Number(quantity),
              hydration: Number(hydration),
              isComplex,
              recipeId: Number(recipeId),
              superIngredientId
            }
          })
          clearFields()
        }
      }}
      style={styles.submit}
    >
      <Text style={{ fontSize: 18, marginBottom: 20 }}>
        {!isComplex ? 'Add' : 'Add sub-ingredients'}
      </Text>
    </TouchableOpacity>
  )
}

export default Submit
