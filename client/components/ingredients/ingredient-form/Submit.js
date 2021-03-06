/* eslint-disable nonblock-statement-body-position */
/* eslint-disable complexity */
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { styles } from './ingredient-form-styles'

const Submit = props => {
  const {
    name,
    description,
    quantity,
    hydration,
    isComplex,
    subIngredients
  } = props.state.ingredient
  const { complexity, isValid } = props.state
  const {
    recipeId,
    createIngredient,
    validateFields,
    alertValidations,
    clearFields,
    navigation,
    totalSubmit
  } = props

  return !complexity || totalSubmit ? (
    <TouchableOpacity
      onPress={() => {
        validateFields()
        alertValidations()

        if (!isValid) return undefined

        if (complexity) {
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
      <Text style={styles.submitText}>Submit ingredient</Text>
    </TouchableOpacity>
  ) : (
    <View style={styles.submit}>
      <Text style={styles.submitText}>Add sub-ingredients &#8594;</Text>
    </View>
  )
}

export default Submit
