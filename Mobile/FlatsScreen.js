import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { forwardRef } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, TextInput, StatusBar, Image, RefreshControl, Button, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { debug } from 'react-native-reanimated';
import FilterPopUp from './FilterPopUp';

function ListItem({ item, navigation }) {
    return (
        <View style={styles.item}>
            <TouchableOpacity onPress={() => navigation.navigate('FlatDetails',{flat: item})}>
                <View style={{flex: 1, flexDirection:'row'}}>
                    <View style={{flex: 1}}>
                    <Image
                        style={styles.flag}
                        source={{
                        uri: `https://www.countryflags.io/pl/flat/64.png`,}}/>
                    </View>
                    <View style={{flexDirection:'column'}}>
                        <View style={{}}>
                            <Text style={styles.title}>{item.flatName}</Text>
                        </View>
                        <View style={{}}>
                            <Text> {`Location: ${item.country}, ${item.city}`}</Text>
                            <Text> {`Price: ${item.price} per night`} </Text>
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

    const buttonW=width*0.3
    const centerMargin =(width-3*buttonW)/4;
    const bigButtonW=3*buttonW + 2*centerMargin
    //const [searchLength, setSearchLength] = useState({last: 111, newest: 0})
  
    const onRefresh = () => {
      console.log(isLoading);
      fetchData(false);
    }
  
    const fetchData = () => {
      setLoading(true);
      fetch('http://10.0.2.2:3004/flats')
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
      <SafeAreaView >
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
            <View style={{width:bigButtonW}}>
                <Button title="Filter" onPress={() =>FilterManager()}></Button>
            </View>     
        </View>
        <View>
        { isLoading ? <Text style={styles.lenCount}>Loading...</Text> :
          <View style={styles.container}>
             
            {/* <Text style={styles.lenCount}>{flats.length > 0 ? `Found ${flats.length} flats` : `No flats found`}</Text> */}
            <FlatList style={{marginBottom: 80}}
              data={flats.length > 0 ? flats.slice(0, flats.length) : []}
              renderItem={({ item }) => <ListItem item={item} navigation={navigation}/>}
              keyExtractor={(item) => item.id}
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
      marginVertical: 10,
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
      fontSize: 24,
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
  
