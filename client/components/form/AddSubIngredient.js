// const AddSubIngredient = 'add it'
// export default AddSubIngredient

/* eslint-disable nonblock-statement-body-position */
/* eslint-disable react/no-unused-state */
import React from 'react'
import { View, Text } from 'react-native'
// import StringFields from './form/StringFields'
// import HydrationField from './form/HydrationField'
// import ComplexityField from './form/ComplexityField'
// import Submit from './form/Submit'
// import { styles } from '../styles/form'
// import { Mutation } from 'react-apollo'
// import { CREATE_INGREDIENT } from '../gql/mutations'
// import { FIND_FULL_RECIPE } from '../gql/queries'

// import { AddIngredient } from '../../index'
import AddIngredient from '../AddIngredient'

export default class AddSubIngredient extends AddIngredient {
  constructor() {
    super()
  }

  render() {
    console.log('method', this.state)
    return <Text>hi</Text>
  }
}
