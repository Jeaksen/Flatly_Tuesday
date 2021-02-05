import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, TextInput, StatusBar, Image, Dimensions,Animated,Button } from 'react-native';
import { HeaderBackButton } from 'react-navigation-stack';
import HeaderNavBar from './HeaderNavBar';

const {width, height} = Dimensions.get("screen")

//            <View style={styles.circle}></View>

export default function FlatsDetailScreen({route, navigation}) {
    const item = navigation.getParam('flat');

    return (
        <View>
            <View style={styles.circle}></View>
            <HeaderNavBar page={"Flats"} navigation={navigation}/>
            <View style={styles.topPanel}>
                <View style={styles.country}>
                <Text style={styles.title}>{item.name}</Text>
                <View style={styles.container}>
                    <Image
                        style={styles.flag}
                        source={{
                            uri: `https://www.countryflags.io/${item.alpha2Code}/flat/64.png`,}}/>
                </View>
            </View>
            <View style={styles.bottomPanel}>
                <View style={styles.row}>
                    <Text style={styles.infoBold}> {`Max guests:  ${item.population}` } </Text>
                    <Text style={styles.infoBoldLeft}> {`${item.alpha2Code} PLN`} </Text>
                </View>
                <Text style={styles.info}> {`Location:  ${item.region}, ${item.subregion}`} </Text>
                <Text style={styles.info}> {`Address:  ${item.capital}`} </Text>
                <Text style={styles.info}> {`Availability:  ${item.alpha3Code}`} </Text>
                <View  style={styles.button}>
                    <Button title="Back" color='black' onPress={() => navigation.navigate('Home')}></Button>
                </View>
            </View>
            </View>
        </View>
    );
}

const circlesize=550;
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    topPanel:{
    },
    bottomPanel:{
        padding: 10,
        height: height*0.35,
    },
    row:{
        flexDirection:'row',   
    },
    country: {
        padding: 20,
        height: height*0.5,
        marginHorizontal: 16,
        textAlign: 'left',
    },
    title: {
        fontSize: 50,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    flag: {
        height: 200,
        width: 200
    },
    info: {
        marginTop: 8,
        fontSize: 20,
    },
    infoBold: {
        marginTop: 8,
        fontSize: 20,
        fontWeight: 'bold',
    },
    infoBoldLeft: {
        marginTop: 8,
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 'auto',
    },
    button:{
        width: width/4,
        marginTop: 10,
        alignSelf: 'center',
        backgroundColor: 'red',
        marginTop: 'auto',
    },
    circle:{
        width: circlesize,
        height: circlesize,
        backgroundColor: '#dc8033',
        borderWidth: 0,
        borderRadius: circlesize/2,
        position: 'absolute',
        marginTop: -circlesize*0.2,
        marginLeft: -circlesize*0.3,
        opacity: 0.9,
    }

  });
  