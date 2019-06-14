import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { SingleIngredient } from './SingleIngredient'

export default class IngredientsTable extends React.Component {
  constructor() {
    super()
    this.state = {
      isEditing: false
    }
  }

  componentDidMount() {
    const { navigation } = this.props

    const isEditing = navigation.getParam('isEditing')
    this.setState({ isEditing })
  }

  toggleEdit = () => this.setState({ isEditing: !this.state.isEditing })

  navigate = params => {
    const { navigation } = this.props
    navigation.navigate('NewIngredientScreen', params)
  }

  render() {
    const { ingredients, recipeId, name } = this.props
    return ingredients.length ? (
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
            onPress={() => this.navigate({ recipeId, name, ingredients })}
          >
            <Text style={[styles.edit, { marginTop: 20 }]}>Add ingredient</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    ) : (
      <TouchableOpacity
        onPress={() => {
          this.toggleEdit()
          this.navigate({ recipeId, name, ingredients })
        }}
      >
        <Text
          style={{
            marginTop: 40,
            textAlign: 'center',
            color: 'gray',
            fontSize: 18
          }}
        >
          Add your first ingredient
        </Text>
      </TouchableOpacity>
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
