import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { styles } from '../../styles/form'

const Submit = props => {
  const { name, description, quantity, hydration, isComplex } = props.state
  const { recipeId, createIngredient, clearFields } = props

  return (
    <TouchableOpacity
      onPress={() => {
        createIngredient({
          variables: {
            name,
            description,
            quantity: Number(quantity),
            hydration: Number(hydration),
            isComplex,
            recipeId: Number(recipeId)
          }
        })
        clearFields()
      }}
      style={styles.submit}
    >
      <Text style={{ fontSize: 18, marginBottom: 20 }}>
        {!isComplex ? 'Add' : 'Add sub-ingredient'}
      </Text>
    </TouchableOpacity>
  )
}

export default Submit
