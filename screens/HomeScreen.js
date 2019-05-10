import React from 'react'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Button
} from 'react-native'
import { Table, Row, Rows } from 'react-native-table-component'
const shortid = require('shortid')

export default class HomeScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      amount: '',
      ingredients: []
    }
  }

  add = (name, amount) => {
    this.setState({
      ingredients: [...this.state.ingredients, { name, amount }],
      name: '',
      amount: ''
    })
    this.name.clear()
    this.amount.clear()
  }

  render() {
    return (
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
            ref={input => {
              this.name = input
            }}
          />
          <TextInput
            placeholder='Specify the amount...'
            keyboardType='numeric'
            onChangeText={amount => this.setState({ amount })}
            ref={input => {
              this.amount = input
            }}
          />
          <Button
            onPress={() => this.add(this.state.name, this.state.amount)}
            title='Add'
            disabled={!(this.state.name && this.state.amount)}
            // style={{
            //   textAlign: 'right'
            // }}
          />
        </View>

        <View style={styles.container}>
          <Table borderStyle={{ borderColor: 'transparent' }}>
            <Row
              data={['Name', 'Amount (g)']}
              flexArr={[3, 1]}
              style={[styles.head]}
              textStyle={[styles.text, styles.boldText]}
            />
            {this.state.ingredients.map((ingredient, index) => (
              <Row
                key={shortid.generate()}
                data={[ingredient.name, ingredient.amount]}
                flexArr={[3, 1]}
                style={{
                  height: 40,
                  backgroundColor: index % 2 === 0 ? '#fff' : '#fafafa'
                }}
                textStyle={styles.text}
              />
            ))}
          </Table>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 10,
    backgroundColor: '#fff'
  },
  head: {
    height: 40,
    backgroundColor: '#f6f6f6',
    borderColor: '#bbb',
    borderWidth: StyleSheet.hairlineWidth
  },
  text: { margin: 6 },
  boldText: { fontWeight: '500' }
})
