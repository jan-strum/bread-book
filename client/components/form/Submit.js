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
  const complexity = props.state.complexity
  const { recipeId, createIngredient, clearFields, navigation } = props

  return (
    <TouchableOpacity
      disabled={!!complexity}
      onPress={() => {
        if (complexity) {
          // subIngredients.length
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
      {!complexity ? (
        <Text style={styles.submitText}>Submit ingredient</Text>
      ) : (
        <Text style={styles.submitText}>Add sub-ingredients &#8594;</Text>
      )}
    </TouchableOpacity>
  )
}

export default Submit
