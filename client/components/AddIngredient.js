/* eslint-disable nonblock-statement-body-position */
/* eslint-disable react/no-unused-state */
import React from 'react'
import { View, Text } from 'react-native'
const shortid = require('shortid')
import Header from './form/Header'
import StringFields from './form/StringFields'
import HydrationField from './form/HydrationField'
import ComplexityField from './form/ComplexityField'
import Submit from './form/Submit'
import { styles } from '../styles/form'
import { Mutation } from 'react-apollo'
import { CREATE_INGREDIENT } from '../gql/mutations'
import { FIND_FULL_RECIPE } from '../gql/queries'

export default class AddIngredient extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      description: '',
      quantity: '',
      hydration: null,
      isComplex: false,
      subIngredients: [],
      hydrationText: '',
      // superIngredientId: null,
      // superIngredientName: '',
      hydrationIndex: null,
      complexityIndex: null,
      complexity: ''
    }
  }

  updateStringField = (field, text) => {
    this.setState({ [field]: text })
  }
  setHydration = input => {
    if (typeof input === 'number') {
      this.setState({ hydrationIndex: input, hydrationText: '' })

      if (input === 0) this.setState({ hydration: 0.0 })
      else if (input === 1) this.setState({ hydration: 100.0 })
      else if (input === 2) this.setState({ hydration: null })
    } else {
      this.setState({
        hydration: input,
        hydrationIndex: null,
        hydrationText: input
      })
    }
  }
  setComplexity = (complexityIndex, complexity) => {
    const isComplex = complexityIndex === 1
    const subIngredients = []

    for (let i = 1; i <= complexity; i++) subIngredients.push({})

    if (complexity) this.setState({ subIngredients })

    this.setState({
      isComplex,
      complexityIndex,
      complexity
    })
  }
  pushSubIngredient = (index, fieldsObject) => {
    const subIngredients = this.state.subIngredients
    const updatedSubIngredients = [
      ...subIngredients.slice(0, index),
      fieldsObject,
      subIngredients.slice(index + 1)
    ]
    this.setState({ subIngredients: updatedSubIngredients })
  }
  clearFields = () => {
    this.setState({
      name: '',
      description: '',
      quantity: '',
      hydrationIndex: null,
      hydrationText: '',
      complexityIndex: null
    })
  }

  render() {
    const { recipeId, superIngredientId, superIngredientName } = this.props

    return (
      <Mutation
        mutation={CREATE_INGREDIENT}
        refetchQueries={() => [
          { query: FIND_FULL_RECIPE, variables: { id: recipeId } }
        ]}
      >
        {createIngredient => (
          <View style={styles.form}>
            <Header
              superIngredientName={superIngredientName}
              complexity={this.props.complexity}
              index={this.props.index}
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

            {this.state.complexity > 1
              ? this.state.subIngredients.map((subIngredient, index) => (
                  <AddIngredient
                    key={shortid.generate()}
                    index={index}
                    complexity={this.state.complexity}
                    superIngredientName={this.state.name}
                    pushSubIngredient={this.pushSubIngredient}
                  />
                ))
              : null}

            {this.props.index === undefined ? (
              <Submit
                state={this.state}
                recipeId={recipeId}
                superIngredientId={superIngredientId}
                createIngredient={createIngredient}
                clearFields={this.clearFields}
              />
            ) : null}
          </View>
        )}
      </Mutation>
    )
  }
}
