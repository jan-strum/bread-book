import React from 'react'
import { View, Text } from 'react-native'
import { styles } from '../../styles/form'

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
    <Text style={styles.header}>{headerText}</Text>
  ) : (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}
    >
      <Text style={styles.header}>
        {`Add sub-ingredient for "${superIngredientName}"`}
      </Text>
      <Text style={[styles.header, { color: '#C8C8C8' }]}>
        {`(${subIngredientIndex + 1}/${complexity})`}
      </Text>
    </View>
  )
}

export default Header
