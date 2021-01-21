import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, TextInput, StatusBar, Image, RefreshControl } from 'react-native';


export default function FlatsDetailScreen({route, navigation}) {
    const item = navigation.getParam('flat');

    return (
        <SafeAreaView>
            <View style={styles.country}>
            <Text style={styles.title}>{item.name}</Text>
            <View style={styles.container}>
                <Image
                    style={styles.flag}
                    source={{
                    uri: `https://www.countryflags.io/pl/flat/64.png`,
                }}/>
            </View>
            <Text style={styles.info}> {`Price:  ${item.alpha2Code} PLN`} </Text>
            <Text style={styles.info}> {`Max guest number:  ${item.population}` } </Text>
            <Text style={styles.info}> {`Location:  ${item.region}, ${item.subregion}`} </Text>
            <Text style={styles.info}> {`Address:  ${item.capital}`} </Text>
            <Text style={styles.info}> {`Availability:  ${item.alpha3Code}`} </Text>
            {/* <Button title="Back" onPress={() => navigation.navigate('List')} ></Button> */}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    country: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        textAlign: 'left',
    },
    title: {
        fontSize: 30,
        textAlign: 'center'
    },
    flag: {
        height: 200,
        width: 200
    },
    info: {
        marginTop: 8,
        fontSize: 20
    }
  });
  