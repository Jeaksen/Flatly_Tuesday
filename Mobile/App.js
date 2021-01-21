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
<<<<<<< HEAD
    //  Bookings: {
    //    screen: BookingScreen,
    //  },
=======
    // Bookings: {
    //   screen: BookingScreen,
    // },
>>>>>>> 901d6fb6b5a7dc84cb4203e35ee261dc25030761
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
