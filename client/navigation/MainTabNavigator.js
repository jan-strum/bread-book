/* eslint-disable react/display-name */
import React from 'react'
import { Platform } from 'react-native'
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation'

import SettingsScreen from '../screens/SettingsScreen'
import TabBarIcon from '../components/TabBarIcon'

import NewIngredientScreen from '../screens/NewIngredientScreen'

import AllRecipesScreen from '../screens/AllRecipesScreen'
import FullRecipeScreen from '../screens/FullRecipeScreen'
import NewRecipeScreen from '../screens/NewRecipeScreen'

const RecipesStack = createStackNavigator({
  AllRecipesScreen,
  FullRecipeScreen,
  NewRecipeScreen,
  NewIngredientScreen
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
  SettingsStack
})
