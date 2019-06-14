import React from 'react'
import { View, Text } from 'react-native'
import { styles } from '../../../styles/ingredientForm'

const Header = ({
  superIngredientName,
  complexity,
  subIngredientIndex,
  ingredients
}) => {
  const headerText = !ingredients.length
    ? 'Add an ingredient'
    : 'Add another ingredient'
  return !superIngredientName ? (
    <Text style={styles.formHeader}>{headerText}</Text>
  ) : (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}
    >
      <Text style={styles.formHeader}>
        {`Add sub-ingredient for "${superIngredientName}"`}
      </Text>
      <Text style={[styles.formHeader, { color: '#C8C8C8' }]}>
        {`(${subIngredientIndex + 1}/${complexity})`}
      </Text>
    </View>
  )
}

export default Header
