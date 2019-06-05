import React from 'react'
import { View, Text } from 'react-native'
import { styles } from '../../styles/form'

const Header = ({ superIngredientName, complexity, index }) => {
  return !superIngredientName ? (
    <Text style={styles.header}>Add an ingredient</Text>
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
        {`(${index + 1}/${complexity})`}
      </Text>
    </View>
  )
}

export default Header
