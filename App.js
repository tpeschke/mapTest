import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {StackNavigator} from 'react-navigation'
import Home from './components/Home'
import MapComp from './components/MapComp'

const RootStack = StackNavigator(
  {
  HomeScreen: {
    screen: Home,
  },
  Map: {
    screen: MapComp
  }
},
{
  initialRouteName: 'HomeScreen'
}
)

export default class App extends React.Component {

  render() {
    return <RootStack />
  }
}


const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
});