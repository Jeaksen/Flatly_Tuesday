import React, { useEffect, useState } from 'react';
import { useRef, forwardRef } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, TextInput, StatusBar, Image, RefreshControl, Button, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { debug } from 'react-native-reanimated';
import FilterPopUp from './FilterPopUp';
import flatData from './server/db.json';
import HeaderNavBar from './HeaderNavBar';
import LoadingAnim from './LoadingAnim';

const {width,height} = Dimensions.get("screen")
const flagSize=100
const infoBarSize=width*0.78
const buttonW = width*0.3
const centerMargin = (width - 3*buttonW)/4;
const bigButtonW = 3*buttonW + 2*centerMargin

function ListItem({ item, navigation }) {
  return (
        <View style={styles.item}>
                <View style={{flex: 1, flexDirection:'row'}}>
                <TouchableOpacity style={styles.itemBackground} onPress={() => navigation.navigate('FlatDetails',{flat: item})}>
                        <View>
                            <Text style={styles.itemtitle}>{item.name}</Text>
                        </View>
                        <View>
                            <Text style={styles.itemtext}>  {`Location: ${item.region}, ${item.capital}`}</Text>
                            <Text style={styles.itemtext}> {`Price: ${item.population} per night`} </Text>
                        </View>
                    </TouchableOpacity>
                    <View>
                      <Image
                          style={styles.itemFlag}
                          source={{
                          uri: `https://www.countryflags.io/${item.alpha2Code}/flat/64.png`,}}/>
                      <View/>
                    </View>
                </View>
        </View>
    );
}


export default function FlatsScreen({navigation}) {
    const [isLoading, setLoading] = useState(true);
    const [flats, setFlats] = useState([]);
    const [searchString, setSearchString] = useState('');
    const FilterRef = useRef(null);

    const flagSize=150
    const infoBarSize=width*0.78
    const buttonW = width*0.3
    const centerMargin = (width - 3*buttonW)/4;
    const bigButtonW = 3*buttonW + 2*centerMargin
    //const [searchLength, setSearchLength] = useState({last: 111, newest: 0})
  
    const onRefresh = () => {
      console.log(isLoading);
      fetchData(false);
    }
  
    // Odkomentowac jak będzie backend
    const fetchData = () => {
      const url = searchString.length >= 3 ? `https://restcountries.eu/rest/v2/name/${searchString}` : `https://restcountries.eu/rest/v2/all`;
      console.log(`Fetched from ${url}`);
      setLoading(true);
      fetch(url)
        .then((response) => response.json())
        .then((json) => setFlats(json))
        .catch((error) => console.error(error))
        .finally(() => setTimeout(()=>setLoading(false),2000));


    }
  
    useEffect(() => {
      fetchData();
    }, []);

    const FilterManager =() =>{
      console.log("filter manager")
      FilterRef.current.animateView()
    }
    
    return (
      <SafeAreaView style={styles.container}>
        <HeaderNavBar page={"Flats"} navigation={navigation}/>
        <View style={styles.naviFilter}>
                <Button color="#dc8033" title="Filter" onPress={() =>FilterManager()}></Button>
        </View>     

        <View>
        { isLoading ? <LoadingAnim/>:
          <View>
            {/* <Text style={styles.lenCount}>{flats.length > 0 ? `Found ${flats.length} flats` : `No flats found`}</Text> */}
            <FlatList style={{marginBottom: 80}}
              data={flats.length > 0 ? flats.slice(0, flats.length) : []}
              renderItem={({ item }) => <ListItem item={item} navigation={navigation}/>}
              keyExtractor={(item) => item.name}
              refreshControl={<RefreshControl refreshing={isLoading} onRefresh={() => fetchData()}/>}
              />
          </View>}
          <View style={{position: 'absolute'}}>
            <FilterPopUp ref={FilterRef}/>
          </View>
        </View>
      </SafeAreaView>
    );
  }
  

  const styles = StyleSheet.create({
    item: {
      marginHorizontal: 15,
    },
    itemtitle: {
      fontSize: 20,
      color: 'black',
    },
    itemtext: {
      fontSize: 14,
      color: 'gray',
    },
    itemFlag: {
      marginTop: 'auto',
      marginBottom: flagSize/10,
      height: flagSize,
      width: flagSize,
      borderColor: '#dc8033',
      backgroundColor: 'white',
      borderWidth: 5,
      borderRadius: flagSize/2,
      marginLeft: -infoBarSize-flagSize/2,
    },
    itemBackground:{
      backgroundColor: 'white', 
      borderBottomColor: '#dc8033',
      borderBottomWidth: 5,
      width: infoBarSize,
      marginLeft: flagSize/2,
      marginVertical: flagSize*0.1,
      paddingLeft: flagSize*0.6,
      paddingVertical: flagSize*0.1,
    },
    naviPanel:{
      backgroundColor: '#38373c',
      flexDirection:'row', 
      height:height*0.1, 
      width: width,
      justifyContent: 'center', 
      alignItems: 'center', 
    },
    naviButtons:{
      width: buttonW,
      marginTop: 'auto',
      marginVertical: 5,    
    },
    naviSelectedButtons:{
      width: buttonW,
      marginTop: 'auto',
      marginVertical: 5,
      borderBottomColor: 'white',
      borderBottomWidth: 1,    
    },
    naviFilter:{
      paddingHorizontal: 10,
      marginVertical: 5,
      justifyContent: 'center',
    },
    container: {
      flex: 1,
      //marginTop: StatusBar.currentHeight || 0,
    },
    input: {
      borderRadius: 3,
      borderColor: '#000000',
      borderWidth: 2,
      marginTop: 16,
      marginHorizontal: 16,
      paddingLeft: 6
    },
    lenCount: {
      fontSize: 20,
      textAlign: 'center',
      marginTop: 3
    }
  });
  
