import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
const shortid = require('shortid')

export default class IngredientsTable extends React.Component {
  render() {
    return (
      <View>
        {/* <Text>{this.props.ingredients[0].name}</Text> */}
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
              <TextInput
                onChangeText={(text, idx = index, field) =>
                  this.updateIngredientField(text, idx, 'name')
                }
                value={ingredient.name}
                // autoFocus={index + 'name' === this.state.autoFocus}
              />
              <TextInput
                keyboardType='numeric'
                onChangeText={(text, idx = index, field) =>
                  this.updateIngredientField(text, idx, 'amount')
                }
                value={String(ingredient.quantity)}
                // autoFocus={index + 'amount' === this.state.autoFocus}
              />
            </View>
          ))}
        </View>
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
