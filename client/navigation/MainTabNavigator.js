/* eslint-disable react/display-name */
import React from 'react'
import { Platform } from 'react-native'
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation'

import SettingsScreen from '../screens/SettingsScreen'
import TabBarIcon from '../components/TabBarIcon'

import AllIngredientsScreen from '../screens/AllIngredientsScreen'
import IngredientsTable from '../components/ingredients/IngredientsTable'
import AddIngredient from '../components/ingredients/ingredientForm/AddIngredient'

import AllRecipesScreen from '../screens/AllRecipesScreen'
import FullRecipeScreen from '../screens/FullRecipeScreen'
import NewRecipe from '../components/recipes/NewRecipe'

const RecipesStack = createStackNavigator({
  AllRecipesScreen,
  NewRecipe,
  FullRecipeScreen,
  IngredientsTable,
  AddIngredient
})
RecipesStack.navigationOptions = {
  tabBarLabel: 'Recipes',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  )
}

const IngredientsStack = createStackNavigator({
  AllIngredientsScreen,
  AddIngredient
})
IngredientsStack.navigationOptions = {
  tabBarLabel: 'Ingredients',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  )
}

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
})

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  )
}

export default createBottomTabNavigator({
  RecipesStack,
  IngredientsStack,
  SettingsStack
})
