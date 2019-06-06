/* eslint-disable nonblock-statement-body-position */
/* eslint-disable react/no-unused-state */
import React from 'react'
import { View } from 'react-native'
import Header from './form/Header'
import StringFields from './form/StringFields'
import HydrationField from './form/HydrationField'
import ComplexityField from './form/ComplexityField'
import AddSubIngredient from './form/AddSubIngredient'
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
  pushSubIngredient = (subIngredientIndex, subIngredientObject) => {
    const subIngredients = this.state.subIngredients
    const updatedSubIngredients = [
      ...subIngredients.slice(0, subIngredientIndex),
      subIngredientObject,
      ...subIngredients.slice(subIngredientIndex + 1)
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
    // console.log('subs', this.state.subIngredients)

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
                    <AddSubIngredient
                      key={subIngredientIndex}
                      subIngredientIndex={subIngredientIndex} // get rid of this and just use the key prop, or find a way to generate a static key
                      complexity={this.state.complexity}
                      superIngredientName={this.state.name}
                      pushSubIngredient={this.pushSubIngredient}
                    />
                  )
                )
              : null}

            <Submit
              state={this.state}
              recipeId={recipeId}
              superIngredientId={superIngredientId}
              createIngredient={createIngredient}
              clearFields={this.clearFields}
            />
          </View>
        )}
      </Mutation>
    )
  }
}
