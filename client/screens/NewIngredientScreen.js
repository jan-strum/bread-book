/* eslint-disable complexity */
/* eslint-disable nonblock-statement-body-position */
/* eslint-disable react/no-unused-state */
import React from 'react'
import {
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
  Alert,
  Dimensions
} from 'react-native'
import Header from '../components/ingredients/ingredientForm/Header'
import StringFields from '../components/ingredients/ingredientForm/StringFields'
import HydrationField from '../components/ingredients/ingredientForm/HydrationField'
import ComplexityField from '../components/ingredients/ingredientForm/ComplexityField'
import Submit from '../components/ingredients/ingredientForm/Submit'
import AddSubIngredient from '../components/ingredients/ingredientForm/AddSubIngredient'
import { styles } from '../components/ingredients/ingredientForm/ingredientFormStyles'
import { Mutation } from 'react-apollo'
import { CREATE_INGREDIENT } from '../gql/mutations'
import { FIND_FULL_RECIPE } from '../gql/queries'

export default class NewIngredientScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      ingredient: {
        name: '',
        description: '',
        quantity: '',
        hydration: null,
        isComplex: false,
        subIngredients: []
      },
      hydrationText: '',
      hydrationIndex: null,
      complexityIndex: null,
      complexity: '',
      decimalsChecked: false,
      emptyFields: '',
      isValid: false
    }
  }

  static navigationOptions = ({ navigation }) => {
    const name = navigation.getParam('name')
    const backButton = (
      <TouchableOpacity
        style={{ marginLeft: 10 }}
        onPress={() => navigation.navigate('FullRecipeScreen')}
      >
        <Text style={{ color: 'gray' }}>&larr; Full recipe</Text>
      </TouchableOpacity>
    )

    return {
      title: name,
      headerLeft: backButton
    }
  }

  updateStringField = (field, text) => {
    const { ingredient } = { ...this.state }
    ingredient[field] = text
    this.setState({ ingredient })

    this.validateFields()
  }
  setHydration = input => {
    const { ingredient } = { ...this.state }

    if (typeof input === 'number') {
      if (input === 0) ingredient.hydration = 0.0
      else if (input === 1) ingredient.hydration = 100.0
      else if (input === 2) ingredient.hydration = null
      this.setState({ ingredient, hydrationIndex: input, hydrationText: '' })
    } else {
      ingredient.hydration = input
      this.setState({
        ingredient,
        hydrationIndex: null,
        hydrationText: input
      })
    }

    this.validateFields()
  }
  setComplexity = (complexityIndex, complexity) => {
    const { ingredient } = { ...this.state }
    const isComplex = complexityIndex === 1
    const subIngredients = []

    if (complexity) {
      for (let i = 1; i <= complexity; i++) {
        subIngredients.push({})
      }
      ingredient.subIngredients = subIngredients
      this.setState({ ingredient })
    }

    ingredient.isComplex = isComplex
    this.setState({
      ingredient,
      complexityIndex,
      complexity
    })
  }
  pushSubIngredient = (subIngredientIndex, subIngredientObject) => {
    const { ingredient } = { ...this.state }
    const subIngredients = this.state.ingredient.subIngredients
    const updatedSubIngredients = [
      ...subIngredients.slice(0, subIngredientIndex),
      subIngredientObject,
      ...subIngredients.slice(subIngredientIndex + 1)
    ]

    ingredient.subIngredients = updatedSubIngredients
    this.setState({ ingredient })
  }
  validateFields = () => {
    const { name, hydration, quantity } = this.state.ingredient
    let emptyFields = ''
    const nameMessage = 'You must give this ingredient a name.'
    const hydrationMessagge =
      "If you specify this ingredient's hydration, you must also specify its quantity."

    if (!name) {
      emptyFields += nameMessage
      if (hydration !== null && !quantity) {
        emptyFields += `\n${hydrationMessagge}`
      }
    } else if (name && hydration !== null && !quantity) {
      emptyFields += hydrationMessagge
    }
    this.setState({ emptyFields })
    if (!emptyFields) {
      this.setState({ isValid: true })
    }
  }
  alertValidations = () => {
    const { emptyFields } = this.state
    if (emptyFields) {
      Alert.alert('Missing information:', emptyFields, [{ text: 'OK' }])
    }
  }
  clearFields = () => {
    const { ingredient } = { ...this.state }
    ingredient.name = ''
    ingredient.description = ''
    ingredient.quantity = ''
    ingredient.isComplex = false
    ingredient.subIngredients = []

    this.setState({
      ingredient,
      hydrationIndex: null,
      hydrationText: '',
      complexityIndex: null
    })
  }

  render() {
    const { recipeId, ingredients } = this.props.navigation.state.params
    const screenWidth = Dimensions.get('window').width

    return (
      <Mutation
        mutation={CREATE_INGREDIENT}
        refetchQueries={() => [
          { query: FIND_FULL_RECIPE, variables: { id: recipeId } }
        ]}
      >
        {createIngredient => (
          <ScrollView
            keyboardShouldPersistTaps='never'
            // contentContainerStyle={{ flexGrow: 1 }}
            horizontal={true}
            pagingEnabled={true}
          >
            <KeyboardAvoidingView
              behavior='padding'
              keyboardVerticalOffset={100}
              style={[styles.form, { width: screenWidth }]}
            >
              <Header
                complexity={this.props.complexity}
                ingredients={ingredients}
              />

              <StringFields
                state={this.state}
                updateStringField={this.updateStringField}
              />

              <HydrationField
                state={this.state}
                setHydration={this.setHydration}
              />

              <ComplexityField
                state={this.state}
                setComplexity={this.setComplexity}
              />

              <Submit
                state={this.state}
                recipeId={recipeId}
                createIngredient={createIngredient}
                validateFields={this.validateFields}
                alertValidations={this.alertValidations}
                clearFields={this.clearFields}
                navigation={this.props.navigation}
              />
            </KeyboardAvoidingView>
            {this.state.complexity > 1
              ? this.state.ingredient.subIngredients.map(
                  (subIngredient, subIngredientIndex) => (
                    <AddSubIngredient
                      key={subIngredientIndex}
                      ingredients={ingredients}
                      complexity={this.state.complexity}
                      subIngredientIndex={subIngredientIndex} // get rid of this and just use the key prop, or find a way to generate a static key
                      superIngredientName={this.state.ingredient.name}
                      pushSubIngredient={this.pushSubIngredient}
                      screenWidth={screenWidth}
                      state={this.state}
                      recipeId={recipeId}
                      createIngredient={createIngredient}
                      validateFields={this.validateFields}
                      alertValidations={this.alertValidations}
                      clearFields={this.clearFields}
                      navigation={this.props.navigation}
                    />
                  )
                )
              : null}
          </ScrollView>
        )}
      </Mutation>
    )
  }
}
