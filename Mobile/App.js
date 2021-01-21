import * as React from 'react';
import { View, Text } from 'react-native';
//import { NavigationContainer } from '@react-navigation/native';
//import { createStackNavigator } from '@react-navigation/stack';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
//import { StackNavigator } from 'react-navigation'
import FlatsScreen from './FlatsScreen'
import FlatsDetailScreen from './FlatsDetailScreen'

const MainNavigator = createStackNavigator(
  {
    Home: { 
      screen: FlatsScreen,
    },
    FlatDetails: {
      screen: FlatsDetailScreen,
    },
     Bookings: {
       screen: BookingScreen,
     },
  },
  {
    initialRouteName: 'Home',
  }
);

const Navigation = createAppContainer(MainNavigator);

export default class App extends React.Component {
  render() {
    return (
        <Navigation/>
    );
  }
}
