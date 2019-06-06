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
      hydrationIndex: null,
      complexityIndex: null,
      complexity: ''
    }
  }

  updateStringField = (field, text) => {
    this.setState({ [field]: text })
  }
  setHydration = (input, subIngredientIndex) => {
    // console.log('hydration state', this.state)
    if (typeof input === 'number') {
      this.setState({ hydrationIndex: input, hydrationText: '' }, () =>
        this.pushSubIngredient(subIngredientIndex)
      )

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

    if (complexity) {
      for (let i = 1; i <= complexity; i++) {
        subIngredients.push({})
      }
      this.setState({ subIngredients })
    }

    this.setState({
      isComplex,
      complexityIndex,
      complexity
    })
  }
  pushSubIngredient = (subIngredientIndex, fieldsObject) => {
    if (typeof subIngredientIndex === 'number') {
      // console.log('push state', this.state)
      console.log('push')
      this.setState({ subIngredients: subIngredientIndex })
    }
    // const updatedSubIngredients = [
    //   ...subIngredients.slice(0, subIngredientIndex),
    //   fieldsObject,
    //   subIngredients.slice(subIngredientIndex + 1)
    // ]
    // this.setState({ subIngredients: updatedSubIngredients })
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
    // if (this.props.complexity === undefined)

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
              subIngredientIndex={this.props.subIngredientIndex}
            />

            <StringFields
              state={this.state}
              updateStringField={this.updateStringField}
            />

            <HydrationField
              state={this.state}
              setHydration={this.setHydration}
              subIngredientIndex={this.props.subIngredientIndex}
            />

            {!this.props.complexity ? (
              <ComplexityField
                state={this.state}
                setComplexity={this.setComplexity}
              />
            ) : null}

            {this.state.complexity > 1
              ? this.state.subIngredients.map(
                  (subIngredient, subIngredientIndex) => (
                    <AddIngredient
                      key={shortid.generate()}
                      subIngredientIndex={subIngredientIndex}
                      complexity={this.state.complexity}
                      superIngredientName={this.state.name}
                      pushSubIngredient={this.pushSubIngredient}
                    />
                  )
                )
              : null}

            {this.props.subIngredientIndex === undefined ? (
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
