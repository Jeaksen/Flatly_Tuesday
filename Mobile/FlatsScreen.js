import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, TextInput, StatusBar, Image, RefreshControl, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


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
  
    return (
      <SafeAreaView >
        <View style={{flexDirection:'column',alignItems: 'stretch',marginHorizontal:15,marginVertical:10}}>
            <View style={{flexDirection:'row', height:40}}>
                <View style={{width:110}}>
                    <Button title="Flats"></Button>
                </View>
                <View style={{width:130,backgroundColor:'#ffffff'}}>
                    <Button title="Bookings"></Button>
                </View>
                <View style={{width:120}}>
                    <Button title="Log out"></Button>
                </View>
            </View>
            <View>
                <Button title="Filter"></Button>
            </View>     
        </View>
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
  
