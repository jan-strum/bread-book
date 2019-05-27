/* eslint-disable react/display-name */
import React from 'react'
import { Platform } from 'react-native'
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation'

import TabBarIcon from '../components/TabBarIcon'
import AllIngredientsScreen from '../screens/AllIngredientsScreen'
import AllRecipesScreen from '../screens/AllRecipesScreen'
import SingleRecipeScreen from '../screens/SingleRecipeScreen'
import SettingsScreen from '../screens/SettingsScreen'

const AllRecipesStack = createStackNavigator({
  AllRecipesScreen,
  SingleRecipeScreen
})
AllRecipesStack.navigationOptions = {
  tabBarLabel: 'Recipes',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  )
}

const AllIngredientsStack = createStackNavigator({
  AllIngredientsScreen
})
AllIngredientsStack.navigationOptions = {
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
  AllRecipesStack,
  AllIngredientsStack,
  SettingsStack
})
