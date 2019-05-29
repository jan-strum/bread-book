import React from 'react'
import { StyleSheet, View, TextInput, Button } from 'react-native'

export default class AddIngredient extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      amount: '',
      ingredients: []
    }
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

  render() {
    return (
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
          onPress={() => this.addIngredient(this.state.name, this.state.amount)}
          title='Add'
          disabled={!(this.state.name && this.state.amount)}
        />
      </View>
    )
  }
}
