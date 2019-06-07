import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { SingleIngredient } from './SingleIngredient'
import AddIngredient from './AddIngredient'

export default class IngredientsTable extends React.Component {
  constructor() {
    super()
    this.state = {
      isEditing: false,
      isAdding: false
    }
  }

  toggleEdit = () => this.setState({ isEditing: !this.state.isEditing })

  toggleAdd = () => this.setState({ isAdding: !this.state.isAdding })

  render() {
    const { ingredients, recipeId, navigation } = this.props
    const { navigate } = navigation
    return (
      <View>
        <Text style={styles.tableHeader}>Ingredients:</Text>
        <TouchableOpacity onPress={this.toggleEdit}>
          <Text style={styles.edit}>
            {!this.state.isEditing ? 'Edit' : 'Done'}
          </Text>
        </TouchableOpacity>
        <View style={styles.container}>
          <View style={[styles.head, styles.row]}>
            <Text style={styles.bold}>Name</Text>
            <Text style={styles.bold}>Amount (g)</Text>
          </View>
          <SingleIngredient
            ingredients={ingredients}
            recipeId={recipeId}
            isEditing={this.state.isEditing}
          />
        </View>
        {this.state.isEditing ? (
          <TouchableOpacity
            onPress={() => {
              navigate('AddIngredient', { recipeId, ingredients })
              this.toggleAdd()
            }}
          >
            <Text style={[styles.edit, { marginTop: 20 }]}>
              {!this.state.isAdding ? 'Add ingredient' : 'Cancel / Done'}
            </Text>
            {/* {!this.state.isAdding ? null : (
              <AddIngredient recipeId={recipeId} ingredients={ingredients} />
            )} */}
          </TouchableOpacity>
        ) : null}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    borderColor: '#bbb',
    borderWidth: StyleSheet.hairlineWidth
  },
  tableHeader: {
    marginTop: 25,
    marginLeft: 20,
    fontSize: 20
  },
  edit: {
    textAlign: 'right',
    marginBottom: 10,
    marginRight: 22,
    color: 'gray'
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
