import React from 'react'
import { Platform, StatusBar, StyleSheet, View } from 'react-native'
import { AppLoading, Asset, Font, Icon } from 'expo'
import AppNavigator from './navigation/AppNavigator'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { ApolloProvider } from 'react-apollo'

// 192.168.0.4
// 2601:241:8303:720:9947:c6de:4db4:1180

const cache = new InMemoryCache()
const link = new HttpLink({
  uri: 'http://192.168.0.4:4000/'
})
const client = new ApolloClient({
  cache,
  link
})

export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  }

  render() {
    return !this.state.isLoadingComplete && !this.props.skipLoadingScreen ? (
      <ApolloProvider client={client}>
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      </ApolloProvider>
    ) : (
      <ApolloProvider client={client}>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle='default' />}
          <AppNavigator />
        </View>
      </ApolloProvider>
    )
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png')
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in Ingredients.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf')
      })
    ])
  }

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error)
  }

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})
