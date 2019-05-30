import React from 'react'
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
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

  toggleEdit = () => {
    this.setState({ isEditing: !this.state.isEditing })
  }

  render() {
    const { navigate } = this.props.navigation
    const { ingredients, recipeId } = this.props
    return (
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        ref={ref => (this.scrollView = ref)}
        onContentSizeChange={(contentWidth, contentHeight) => {
          this.scrollView.scrollToEnd({ animated: true })
        }}
      >
        <Text style={styles.header}>Ingredients:</Text>
        <TouchableOpacity onPress={this.toggleEdit}>
          <Text style={styles.edit}>
            {!this.state.isEditing ? 'Edit' : 'Cancel'}
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
              this.setState({ isAdding: !this.state.isAdding })
            }}
          >
            <Text style={[styles.edit, { marginTop: 20 }]}>
              {!this.state.isAdding ? 'Add ingredient' : 'Cancel'}
            </Text>
            {!this.state.isAdding ? null : (
              <AddIngredient recipeId={recipeId} />
            )}
          </TouchableOpacity>
        ) : null}
      </KeyboardAwareScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    borderColor: '#bbb',
    borderWidth: StyleSheet.hairlineWidth
  },
  header: {
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
