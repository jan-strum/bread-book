import React from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet
} from 'react-native'
import SuperIngredient from './SuperIngredient'
const shortid = require('shortid')

export default class IngredientsTable extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.head, styles.row]}>
          <Text style={styles.bold}>Name</Text>
          <Text style={styles.bold}>Amount (g)</Text>
        </View>
        {this.props.ingredients.map((ingredient, index) => (
          <View
            style={[
              styles.row,
              { backgroundColor: index % 2 === 0 ? '#fff' : '#fafafa' }
            ]}
            key={shortid.generate()}
          >
            {ingredient.isComplex || ingredient.description ? (
              <SuperIngredient ingredient={ingredient} />
            ) : (
              <Text>{ingredient.name}</Text>
            )}
            <Text>{String(ingredient.quantity)}</Text>
          </View>
        ))}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    borderColor: '#bbb',
    borderWidth: StyleSheet.hairlineWidth
  },
  head: {
    backgroundColor: '#f6f6f6',
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between'
  },
  bold: { fontWeight: '500' }
})
