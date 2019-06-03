/* eslint-disable nonblock-statement-body-position */
/* eslint-disable react/no-unused-state */
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import StringFields from './form/StringFields'
import HydrationField from './form/HydrationField'
import ComplexityField from './form/ComplexityField'
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
      hydrationText: '',
      isComplex: false,
      subIngredients: [],
      superIngredientId: null,
      superIgredientName: '',
      hydrationIndex: null,
      complexityIndex: null
    }
  }

  updateStringField = (field, text) => {
    this.setState({ [field]: text })
  }
  setHydration = input => {
    if (typeof input === 'number') {
      if (input === 0) this.setState({ hydration: 0.0, hydrationIndex: input })
      else if (input === 1)
        this.setState({ hydration: 100.0, hydrationIndex: input })
      else if (input === 2)
        this.setState({ hydration: null, hydrationIndex: input })
    } else {
      this.setState({
        hydration: input,
        hydrationIndex: null,
        hydrationText: input
      })
    }
  }
  setComplexity = complexityIndex => {
    const isComplex = complexityIndex === 1
    this.setState({ isComplex, complexityIndex })
  }

  render() {
    const { recipeId } = this.props
    const { name, description, quantity, hydration, isComplex } = this.state
    return (
      <Mutation
        mutation={CREATE_INGREDIENT}
        refetchQueries={() => [
          { query: FIND_FULL_RECIPE, variables: { id: recipeId } }
        ]}
      >
        {createIngredient => (
          <View style={styles.form}>
            <Text style={styles.header}>Add an ingredient</Text>

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

            <TouchableOpacity
              onPress={() => {
                createIngredient({
                  variables: {
                    name,
                    description,
                    quantity: Number(quantity),
                    hydration: Number(hydration),
                    isComplex,
                    recipeId: Number(recipeId)
                  }
                })
                this.setState({
                  name: '',
                  description: '',
                  quantity: '',
                  hydrationIndex: 2,
                  hydrationText: ''
                })
              }}
              style={styles.add}
            >
              <Text style={{ fontSize: 18, marginBottom: 20 }}>
                {!this.state.isComplex ? 'Add' : 'Add sub-ingredient'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Mutation>
    )
  }
}
