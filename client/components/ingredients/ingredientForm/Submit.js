/* eslint-disable complexity */
import React from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import { styles } from '../../../styles/ingredientForm'

const Submit = props => {
  const {
    name,
    description,
    quantity,
    hydration,
    isComplex,
    subIngredients
  } = props.state.ingredient
  const { complexity } = props.state
  const {
    recipeId,
    createIngredient,
    clearFields,
    navigation,
    totalSubmit
  } = props

  return !complexity || totalSubmit ? (
    <TouchableOpacity
      onPress={() => {
        let emptyFields = ''
        const nameMessage = 'You must give this ingredient a name.'
        const hydrationMessagge =
          "If you specify this ingredient's hydration, you must also specify its quantity."

        if (!name) emptyFields += nameMessage
        if (name && (hydration && !quantity)) emptyFields += hydrationMessagge
        if (!name && (hydration && !quantity))
          emptyFields += `\n${hydrationMessagge}`
        if (emptyFields) {
          Alert.alert('Missing information:', emptyFields, [{ text: 'OK' }])
          return undefined
        }
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
