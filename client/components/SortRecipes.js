import React from 'react'
import { Dropdown } from 'react-native-material-dropdown'

export default class SortRecipes extends React.Component {
  constructor() {
    super()
    this.state = {
      fields: [
        { value: 'Name' },
        { value: 'Recently Created' },
        { value: 'Recently Updated' }
      ],
      selectedValue: ''
    }
  }
  render() {
    return (
      <Dropdown
        label='&#8593;&#8595;'
        // labelFontSize={20}
        // constainerStyle={{}}
        data={this.state.fields}
      />
    )
  }
}
