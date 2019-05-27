import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import IngredientsTable from '../components/IngredientsTable'
import { Query } from 'react-apollo'
import { FIND_FULL_RECIPE } from '../gql/queries'
import { dateFormatter } from '../utils'

export default class FullRecipeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { name, createdAt } = navigation.getParam('item')
    const date = (
      <Text style={{ marginRight: 10 }}>{dateFormatter(createdAt)}</Text>
    )
    return {
      title: name,
      headerRight: date
    }
  }

  render() {
    const { id } = this.props.navigation.getParam('item')
    return (
      <Query query={FIND_FULL_RECIPE} variables={{ id }}>
        {({ data, loading, error }) => {
          if (loading) return <Text>Loading...</Text>
          if (error) {
            console.log('error', error)
            return <Text>Error!</Text>
          }
          return (
            <View>
              <Text style={styles.header}>Ingredients:</Text>
              <IngredientsTable ingredients={data.findFullRecipe.ingredients} />
            </View>
          )
        }}
      </Query>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 20
  }
})
