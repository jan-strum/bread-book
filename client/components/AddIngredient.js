/* eslint-disable nonblock-statement-body-position */
/* eslint-disable react/no-unused-state */
import React from 'react'
import { View, TouchableOpacity, Text, Dimensions } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Header from './form/Header'
import StringFields from './form/StringFields'
import HydrationField from './form/HydrationField'
import ComplexityField from './form/ComplexityField'
import Submit from './form/Submit'
import AddSubIngredient from './form/AddSubIngredient'
import { styles } from '../styles/form'
import { Mutation } from 'react-apollo'
import { CREATE_INGREDIENT } from '../gql/mutations'
import { FIND_FULL_RECIPE } from '../gql/queries'

export default class AddIngredient extends React.Component {
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
      complexity: ''
    }
  }

  static navigationOptions = ({ navigation }) => {
    const name = navigation.getParam('name')
    const backButton = (
      <TouchableOpacity
        style={{ marginLeft: 10 }}
        onPress={() => navigation.navigate('FullRecipeScreen')}
      >
        <Text style={{ color: 'gray' }}>&larr; Full Recipe</Text>
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
          <KeyboardAwareScrollView
            // ref={ref => {
            //   this.scrollView = ref
            // }}
            // onContentSizeChange={() => {
            //   this.scrollView.scrollToEnd({ animated: true })
            // }}
            keyboardShouldPersistTaps='never'
            // contentContainerStyle={{ flexGrow: 1 }}
            horizontal={true}
            pagingEnabled={true}
          >
            <View style={[styles.form, { width: screenWidth }]}>
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
                clearFields={this.clearFields}
                navigation={this.props.navigation}
              />
            </View>
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
                    />
                  )
                )
              : null}
          </KeyboardAwareScrollView>
        )}
      </Mutation>
    )
  }
}
