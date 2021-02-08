import React, { useEffect, useState } from 'react';
import { useRef, forwardRef } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, TextInput, StatusBar, Image, Alert, RefreshControl, Button, Dimensions } from 'react-native';
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

function ListItem({ item, navigation, token }) {
  return (
        <View style={styles.item}>
          <TouchableOpacity onPress={() => navigation.navigate('BookingDetails',{booking: item, token: token})}>
          <View  style={styles.itemrow}>
            <Text style={styles.itemOwner}>{`${item.customer.name} ${item.customer.surname}`}</Text>
            <Text style={styles.itemLocalization}>{item.flat.address.city}</Text>
          </View>
          <Text style={styles.itemName}>{item.flat.name}</Text>
          <Text style={styles.itemData}>{`${item.startDate}-${item.endDate}`}</Text>
          </TouchableOpacity>
        </View>
    );
}

function createAlert() {
  Alert.alert(
    "Warning",
    "Are you sure you want to cancel this booking?",
    [
      {
        text: "NO",
        onPress: () => console.log("NO Pressed"),
        style: "cancel"
      },
      { text: "YES", onPress: () => console.log("YES Pressed") }
    ],
    { cancelable: false }
  );
}

export default function BookingScreen({navigation}) {
  const [isLoading, setLoading] = useState(true);
  const [flats, setFlats] = useState([]);
  const [searchString, setSearchString] = useState('');
  const FilterRef = useRef(null);

  const token = navigation.getParam('token');
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

  const filterData = (data) => {
    let url =`http://flatly-env.eba-pftr9jj2.eu-central-1.elasticbeanstalk.com/bookings?`;
    console.log("data.flatName:"+ data.flatName)
    if(data.flatName!="")  url +=`&name=${data.flatName}`;
    if(data.Country!="")   url +=`&country=${data.Country}`;
    if(data.City!="")      url +=`&city=${data.City}`;
    if(data.dateFrom!="")  url +=`&dateFrom=${data.dateFrom}`;
    if(data.dateTo!="")    url +=`&dateTo=${data.dateTo}`;
    setLoading(true);
    fetch(url, {
      method: "GET",
      headers: {
          'Accept': '*/*',
          'security-header': token       
        },
      })
      .then((response) => response.json())
      .then(response => response.content)
      .then((response) => setFlats(response))
      .catch((error) => console.error(error))
      .finally(() => setTimeout(()=>setLoading(false),1000));
  }

  const fetchData = () => {
    //.log("token (Flats): "+token)
    const url ="http://flatly-env.eba-pftr9jj2.eu-central-1.elasticbeanstalk.com/bookings";
    setLoading(true);

    let bookings=[]
    fetch(url, {
      method: "GET",
      headers: {
          //'Content-Type': 'application/json',
          'Accept': '*/*',
          'security-header': token
          
        },
      })
      .then((response) => response.json())
      .then(response => bookings = response.content)
      .then(() => setFlats(bookings))
      .catch((error) => console.error(error))
      .finally(() => setTimeout(()=>setLoading(false),1000));
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
      <HeaderNavBar page={"Bookings"} navigation={navigation} token={token}/>
      <View style={styles.naviFilter}>
              <Button color="#dc8033" title="Filter" onPress={() =>FilterManager()}></Button>
      </View>     

      <View>
      { isLoading ? <LoadingAnim/>:
        <View>
          {/* <Text style={styles.lenCount}>{flats.length > 0 ? `Found ${flats.length} flats` : `No flats found`}</Text> */}
          <FlatList style={{marginBottom: 80}}
            data={flats.length > 0 ? flats.slice(0, flats.length) : []}
            renderItem={({ item }) => <ListItem item={item} navigation={navigation} token={token}/>}
            keyExtractor={(item) => item.id}
            refreshControl={<RefreshControl refreshing={isLoading} onRefresh={() => fetchData()}/>}
            />
        </View>}
        <View style={{position: 'absolute'}}>
          <FilterPopUp ref={FilterRef} DateActive="true"  token={token} handleSearch={filterData}/>
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


  