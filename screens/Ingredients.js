import React from 'react'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
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
      ingredients: []
    }
  }

  add = (name, amount) => {
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
      <DismissKeyboard>
        <View style={{ flex: 1 }}>
          <View
            style={{
              alignItems: 'center'
            }}
          >
            <Text
              style={{
                padding: 20,
                fontSize: 20
              }}
            >
              Ingredients
            </Text>
          </View>

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
              onPress={() => this.add(this.state.name, this.state.amount)}
              title='Add'
              disabled={!(this.state.name && this.state.amount)}
              // onPress={() => {
              //   this.name.focus()
              // }}
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
                    {
                      backgroundColor: index % 2 === 0 ? '#fff' : '#fafafa'
                    }
                  ]}
                  key={shortid.generate()}
                >
                  <Text>{ingredient.name}</Text>
                  <Text>{ingredient.amount}</Text>
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
