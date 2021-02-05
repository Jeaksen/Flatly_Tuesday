import React, { useEffect, useState } from 'react';
import { useRef, forwardRef } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, TextInput, StatusBar, Image, RefreshControl, Button, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import HeaderNavBar from './HeaderNavBar';



export default function BookingScreen({navigation}) {
    return (
      <SafeAreaView>
        <HeaderNavBar page={"Bookings"} navigation={navigation}/>
        <View>
            <Text>Hello I'm bookingscreen</Text>
        </View>
      </SafeAreaView>
    );
  }
  