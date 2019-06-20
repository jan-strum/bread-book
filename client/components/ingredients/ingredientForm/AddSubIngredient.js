/* eslint-disable nonblock-statement-body-position */
/* eslint-disable react/no-unused-state */
import React from 'react'
import { KeyboardAvoidingView } from 'react-native'
import Header from './Header'
import StringFields from './StringFields'
import HydrationField from './HydrationField'
import Submit from './Submit'
import { styles } from '../../../styles/ingredientForm'

export default class AddSubIngredient extends React.Component {
  constructor() {
    super()
    this.state = {
      ingredient: {
        name: '',
        description: '',
        quantity: '',
        hydration: null,
        isComplex: false
        // subIngredients: []
      },
      hydrationText: '',
      hydrationIndex: null
      // complexityIndex: null,
      // complexity: ''
    }
  }

  updateStringField = (field, text, subIngredientIndex) => {
    const { ingredient } = { ...this.state }

    ingredient[field] = text
    this.setState({ ingredient }, () =>
      this.props.pushSubIngredient(subIngredientIndex, ingredient)
    )
  }
  setHydration = (input, subIngredientIndex) => {
    const { ingredient } = { ...this.state }

    if (typeof input === 'number') {
      if (input === 0) ingredient.hydration = 0.0
      else if (input === 1) ingredient.hydration = 100.0
      else if (input === 2) ingredient.hydration = null
      this.setState(
        { ingredient, hydrationIndex: input, hydrationText: '' },
        () => this.props.pushSubIngredient(subIngredientIndex, ingredient)
      )
    } else {
      ingredient.hydration = input
      this.setState(
        {
          ingredient,
          hydrationIndex: null,
          hydrationText: input
        },
        () => this.props.pushSubIngredient(subIngredientIndex, ingredient)
      )
    }
  }

  render() {
    const {
      superIngredientName,
      subIngredientIndex,
      complexity,
      ingredients,
      state,
      recipeId,
      createIngredient,
      checkDecimals,
      clearFields,
      navigation,
      screenWidth
    } = this.props

    return (
      <KeyboardAvoidingView
        behavior='padding'
        style={[styles.form, { width: screenWidth }]}
      >
        <Header
          ingredients={ingredients}
          superIngredientName={superIngredientName}
          complexity={complexity}
          subIngredientIndex={subIngredientIndex}
        />

        <StringFields
          state={this.state}
          updateStringField={this.updateStringField}
          subIngredientIndex={subIngredientIndex}
        />

        <HydrationField
          state={this.state}
          setHydration={this.setHydration}
          subIngredientIndex={subIngredientIndex}
        />

        {subIngredientIndex + 1 === Number(complexity) ? (
          <Submit
            state={state}
            recipeId={recipeId}
            createIngredient={createIngredient}
            checkDecimals={checkDecimals}
            clearFields={clearFields}
            navigation={navigation}
            totalSubmit={true}
          />
        ) : null}
      </KeyboardAvoidingView>
    )
  }
}
