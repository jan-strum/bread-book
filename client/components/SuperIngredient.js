import React from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet
} from 'react-native'

export default class SuperIngredient extends React.Component {
  constructor() {
    super()
    this.state = {
      selected: false
    }
  }

  select = () => {
    this.setState({ selected: !this.state.selected })
  }

  render() {
    const { ingredient } = this.props
    return (
      <TouchableOpacity onPress={this.select} style={{ flex: 1 }}>
        {!this.state.selected ? (
          <Text>
            {ingredient.name}
            <Text style={{ color: 'gray' }}>&#x2001;(...)</Text>
          </Text>
        ) : (
          <View>
            <Text>
              {ingredient.name}
              <Text style={{ color: 'gray' }}>&#x2001;&uarr;</Text>
            </Text>
            {ingredient.description && (
              <Text style={styles.description}>{ingredient.description}</Text>
            )}
            {ingredient.isComplex && (
              <View style={styles.subIngredientsContainer}>
                <Text style={styles.composedOf}>Composed of:</Text>
                {ingredient.subIngredients.map(subIngredient => (
                  <View key={subIngredient.id} style={styles.row}>
                    <Text style={[styles.gray]}>{subIngredient.name}</Text>
                    <Text style={[styles.gray]}>{subIngredient.quantity}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  description: {
    marginTop: 5,
    color: 'gray'
  },
  subIngredientsContainer: {
    marginTop: 5
  },
  row: {
    flexDirection: 'row',
    paddingLeft: 20,
    justifyContent: 'space-between'
  },
  composedOf: { marginVertical: 5, color: '#505050' },
  gray: { color: 'gray' }
})
