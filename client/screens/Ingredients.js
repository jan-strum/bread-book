/* eslint-disable no-return-assign */
import React from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  TextInput,
  Button
} from 'react-native'
import { Table, Row, Rows } from 'react-native-table-component'
const shortid = require('shortid')

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
)

export default class Ingredients extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      amount: '',
      ingredients: [],
      autoFocus: ''
    }
  }

  static navigationOptions = {
    title: 'Ingredients'
  }

  addIngredient = (name, amount) => {
    const updatedIngredients = this.state.ingredients.concat({ name, amount })
    this.setState({
      ingredients: updatedIngredients,
      name: '',
      amount: ''
    })
    this.name.focus()
  }

  updateIngredientField = (text, index, field) => {
    const updatedIngredients = this.state.ingredients.map((ingredient, idx) => {
      if (idx === index) {
        ingredient[field] = text
        return ingredient
      } else {
        return ingredient
      }
    })
    // this.setState({ [`updated${field}`]: text })
    if (this.state.autoFocus !== index + field) {
      this.setState({ autoFocus: index + field })
    }
    this.setState({ ingredients: updatedIngredients })
  }

  render() {
    return (
      <DismissKeyboard>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 20
            }}
          >
            <TextInput
              placeholder='Add an ingredient...'
              onChangeText={name => this.setState({ name })}
              value={this.state.name}
              returnKeyType='next'
              ref={input => {
                this.name = input
              }}
              onSubmitEditing={() => {
                this.amount.focus()
              }}
            />
            <TextInput
              placeholder='Specify the amount...'
              keyboardType='numeric'
              onChangeText={amount => this.setState({ amount })}
              value={this.state.amount}
              ref={input => {
                this.amount = input
              }}
            />
            <Button
              onPress={() =>
                this.addIngredient(this.state.name, this.state.amount)
              }
              title='Add'
              disabled={!(this.state.name && this.state.amount)}
            />
          </View>

          {this.state.ingredients.length ? (
            <View style={styles.container}>
              <View style={[styles.head, styles.row]}>
                <Text style={styles.bold}>Name</Text>
                <Text style={styles.bold}>Amount (g)</Text>
              </View>
              {this.state.ingredients.map((ingredient, index) => (
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
                    autoFocus={index + 'name' === this.state.autoFocus}
                  />
                  <TextInput
                    keyboardType='numeric'
                    onChangeText={(text, idx = index, field) =>
                      this.updateIngredientField(text, idx, 'amount')
                    }
                    value={ingredient.amount}
                    autoFocus={index + 'amount' === this.state.autoFocus}
                  />
                </View>
              ))}
            </View>
          ) : null}
        </View>
      </DismissKeyboard>
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
