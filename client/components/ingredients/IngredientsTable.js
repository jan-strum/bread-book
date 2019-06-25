import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { SingleIngredient } from './SingleIngredient'
import styles from './IngredientsTable-styles'

export default class IngredientsTable extends React.Component {
  constructor() {
    super()
    this.state = {
      isEditing: false,
      isDisplayed: false
    }
  }

  componentDidMount() {
    const { navigation } = this.props

    const isEditing = navigation.getParam('isEditing')
    this.setState({ isEditing })
  }

  toggleEdit = () => this.setState({ isEditing: !this.state.isEditing })

  toggleDetails = () => this.setState({ isDisplayed: !this.state.isDisplayed })

  navigate = params => {
    const { navigation } = this.props
    navigation.navigate('NewIngredientScreen', params)
  }

  render() {
    const { ingredients, recipeId, name } = this.props
    return ingredients.length ? (
      <TouchableOpacity onPress={() => this.toggleDetails()}>
        <Text style={styles.tableHeader}>Ingredients:</Text>
        <TouchableOpacity onPress={this.toggleEdit}>
          <Text style={styles.edit}>
            {!this.state.isEditing ? 'Edit' : 'Done'}
          </Text>
        </TouchableOpacity>
        <View
          style={[styles.container, !this.state.isEditing && styles.notEditing]}
        >
          <View style={[styles.head, styles.row]}>
            <Text style={styles.bold}>Name</Text>
            <Text style={styles.bold}>Amount (g)</Text>
          </View>
          <SingleIngredient
            ingredients={ingredients}
            recipeId={recipeId}
            isEditing={this.state.isEditing}
            isDisplayed={this.state.isDisplayed}
          />
        </View>
        {this.state.isEditing ? (
          <TouchableOpacity
            onPress={() => this.navigate({ recipeId, name, ingredients })}
          >
            <Text style={[styles.edit, { marginTop: 20 }]}>Add ingredient</Text>
          </TouchableOpacity>
        ) : null}
      </TouchableOpacity>
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
