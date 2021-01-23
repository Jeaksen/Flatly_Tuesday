import React, { useEffect, useState } from 'react';
import { useRef, forwardRef } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, TextInput, StatusBar, Image, RefreshControl, Button, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { debug } from 'react-native-reanimated';
import FilterPopUp from './FilterPopUp';
import flatData from './server/db.json'


function ListItem({ item, navigation }) {
    return (
        <View style={styles.item}>
            <TouchableOpacity onPress={() => navigation.navigate('FlatDetails',{flat: item})}>
                <View style={{flex: 1, flexDirection:'row'}}>
                    <View style={{flex: 1}}>
                    <Image
                        style={styles.flag}
                        source={{
                        uri: `https://www.countryflags.io/${item.alpha2Code}/flat/64.png`,}}/>
                    </View>
                    <View style={{flexDirection:'column'}}>
                        <View style={{}}>
                            <Text style={styles.title}>{item.name}</Text>
                        </View>
                        <View style={{}}>
                            <Text> {`Location: ${item.region}, ${item.capital}`}</Text>
                            <Text> {`Price: ${item.population} per night`} </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}


export default function FlatsScreen({navigation}) {
    const [isLoading, setLoading] = useState(true);
    const [flats, setFlats] = useState([]);
    const [searchString, setSearchString] = useState('');
    const {width,height} = Dimensions.get("screen")
    const FilterRef = useRef(null);

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
        .finally(() => setLoading(false));
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
        <View style={{flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>
            <View style={{flexDirection:'row', height:40, justifyContent: 'center', alignItems: 'center'}}>
                <View style={{width:buttonW}}>
                    <Button title="Flats"></Button>
                </View>
                <View style={{width:buttonW, marginHorizontal: centerMargin}}>
                    <Button title="Bookings"></Button>
                </View>
                <View style={{width:buttonW}}>
                    <Button title="Log out"></Button>
                </View>
            </View>
            <View style={{width:bigButtonW,marginTop:6}}>
                <Button title="Filter" onPress={() =>FilterManager()}></Button>
            </View>     
        </View>
        <View>
        { isLoading ? <Text style={styles.lenCount}>Loading...</Text> :
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
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      backgroundColor: '#e6ffff', 
      padding: 10,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 5,
      borderColor: '#e6ffff', 
      borderWidth: 1
    },
    title: {
      fontSize: 20,
    },
    flag: {
      height: 64,
      width: 64
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
  
