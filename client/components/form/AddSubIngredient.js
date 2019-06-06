/* eslint-disable nonblock-statement-body-position */
/* eslint-disable react/no-unused-state */
import React from 'react'
import { View, Text } from 'react-native'
const shortid = require('shortid')
import Header from './Header'
import StringFields from './StringFields'
import HydrationField from './HydrationField'
import ComplexityField from './ComplexityField'
import { styles } from '../../styles/form'

export default class AddSubIngredient extends React.Component {
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

  render() {
    const { recipeId, superIngredientId, superIngredientName } = this.props
    // if (this.props.complexity === undefined)

    return (
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
                  key={shortid.generate()}
                  subIngredientIndex={subIngredientIndex}
                  complexity={this.state.complexity}
                  superIngredientName={this.state.name}
                  pushSubIngredient={this.pushSubIngredient}
                />
              )
            )
          : null}
      </View>
    )
  }
}
