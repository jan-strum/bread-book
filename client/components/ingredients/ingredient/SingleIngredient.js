import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Swipeout from 'react-native-swipeout'
import { Mutation } from 'react-apollo'
import { REMOVE_INGREDIENT } from '../../../gql/mutations'
import { FIND_FULL_RECIPE } from '../../../gql/queries'
import SuperIngredient from './SuperIngredient'
const shortid = require('shortid')

export const SingleIngredient = ({
  ingredients,
  recipeId,
  isEditing,
  isDisplayed
}) => {
  return ingredients.map((ingredient, index) => (
    <Mutation
      mutation={REMOVE_INGREDIENT}
      refetchQueries={() => [
        { query: FIND_FULL_RECIPE, variables: { id: recipeId } }
      ]}
      key={shortid.generate()}
    >
      {removeIngredient => (
        <Swipeout
          right={[
            {
              text: 'Edit',
              backgroundColor: 'lightgray',
              onPress: () => {
                removeIngredient({
                  variables: { ingredientId: ingredient.id, recipeId }
                })
              }
            },
            {
              text: 'Remove',
              onPress: () => {
                removeIngredient({
                  variables: { ingredientId: ingredient.id, recipeId }
                })
              }
            }
          ]}
          autoClose={true}
          disabled={!isEditing}
        >
          <View
            style={[
              styles.row,
              { backgroundColor: index % 2 === 0 ? '#fff' : '#fafafa' }
            ]}
          >
            {ingredient.isComplex ||
            ingredient.description ||
            typeof ingredient.hydration === 'number' ? (
              <SuperIngredient
                ingredient={ingredient}
                isDisplayed={isDisplayed}
              />
            ) : (
              <Text>{ingredient.name}</Text>
            )}
            <Text>{String(ingredient.quantity)}</Text>
          </View>
        </Swipeout>
      )}
    </Mutation>
  ))
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between'
  }
})
