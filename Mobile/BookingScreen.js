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
          <View  style={styles.itemrow}>
            <Text style={styles.itemOwner}>{item.alpha3Code}</Text>
            <Text style={styles.itemLocalization}>{item.name}</Text>
          </View>
          <Text style={styles.itemName}>{item.capital}</Text>
          <Text style={styles.itemData}>20.03.2020 - 20.03.2020</Text>
          <TouchableOpacity style={styles.itembuttoncancel}>
              <Text style={styles.itemcancel}>Cancel</Text>
          </TouchableOpacity>
        </View>
    );
}

export default function BookingScreen({navigation}) {
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
      <HeaderNavBar page={"Bookings"} navigation={navigation}/>
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
    padding: 10,
    backgroundColor: 'white',
    borderColor: 'orange',
    borderBottomWidth: 2,
    marginHorizontal: 15,
    marginVertical: 5,
  },
  itemrow:{
        flexDirection:'row',   
  },
  itemOwner:{
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',

  },
  itemName:{
    fontSize: 35,
    textAlign: 'center',
  },
  itemData:{
    fontSize: 17,
    textAlign: 'center',
    color: 'orange',
  },
  itemLocalization:{
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginLeft: 'auto',
  },
  itembuttoncancel:{
    textAlign: 'center',
    backgroundColor: '#38373c',
    marginTop:5,
    marginLeft: 'auto',
    marginRight: 'auto',
    height: 35,
    alignContent: 'center',
    width: width*0.3,
  },
  itemcancel:{
    color: 'white', 
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: 'auto',
    marginTop: 'auto',
    fontSize: 20,
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


  