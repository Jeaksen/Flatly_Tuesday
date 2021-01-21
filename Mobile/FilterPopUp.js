import React, { Component, useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Dimensions, Animated, Text,Button,Keyboard} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import { Icon } from 'react-native-elements'
import { debug } from 'react-native-reanimated';
import { PixelRatio } from 'react-native';

const {width, height} = Dimensions.get("screen")

//For Dropdowns
const contries=[
    {label: 'Poland', value: 'Poland'},
    {label: 'German', value: 'German'},
]
const cities=[
    {label: 'Płock', value: 'Płock'},
    {label: 'Warszawa', value: 'Warszawa'},
]
//For animation
//animateView:
const initPos=-10
const endiPos =5
var currentPos=initPos
const initOpacity=0
const endiOpacity=1
var currentOpacity=initOpacity
const initBRadious=0
const endiBRadious=20
var currentBRadious=initBRadious

export default class FilterPopUp extends Component{

    
    state={
            //view aniamtion
            posAnimation: new Animated.Value(initPos),
            opaAnimation: new Animated.Value(initOpacity),
            borAnimation: new Animated.Value(initBRadious),

            //keyboard show/hide animation:
            hei1Animation: new Animated.Value(10),
            hei2Animation: new Animated.Value(30),
            //DropDowns
            selectedCountry: 'Poland',
            selectedCity: 'Płock'
    }
    
    //Keyboard:
    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.onKeyboardShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.onKeyboardHide,);
      }
    
      componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
      }
    
    //Animations:
    animateView = () =>{
        if (currentPos==initPos)
        {
            currentPos=endiPos;
            currentOpacity=endiOpacity;
            currentBRadious=endiBRadious;
        }
        else 
        {
            currentPos=initPos;
            currentOpacity=initOpacity;
            currentBRadious=initBRadious;
        }
        Animated.timing(this.state.posAnimation,{
            toValue:  currentPos,
            duration: 300,
            useNativeDriver: true
        }).start(()=>{
            Animated.timing(this.state.posAnimation,{
                toValue:  currentPos-2,
                duration: 150,
                useNativeDriver: true
            }).start();
        }
        );
        Animated.timing(this.state.opaAnimation,{
            toValue:  currentOpacity,
            duration: 200,
            useNativeDriver: true
        }).start();
        Animated.timing(this.state.borAnimation,{
            toValue:  currentBRadious,
            duration: 1200,
            useNativeDriver: true
        }).start();
    };

    onKeyboardShow =() =>{
        Animated.timing(this.state.hei1Animation,{toValue:  0,duration: 200,useNativeDriver: true}).start();
        Animated.timing(this.state.hei2Animation,{toValue:  0,duration: 200,useNativeDriver: true}).start();
    }

    onKeyboardHide =() =>{
        Animated.timing(this.state.hei1Animation,{toValue:  10,duration: 200,useNativeDriver: true}).start();
        Animated.timing(this.state.hei2Animation,{toValue:  20,duration: 200,useNativeDriver: true}).start();
    }

    render(){

        const hei1Animation={transform: [{translateY: this.state.hei1Animation,}],}
        const hei2Animation={transform: [{translateY: this.state.hei2Animation,}],}

        
        const BorderAnimation={
            borderRadius: this.state.borAnimation,
        }

        const ViewAnimation={
            transform: [
                {
                translateY: this.state.posAnimation,
                }
            ],
            opacity: this.state.opaAnimation,
        };
        return(
            <View style={styles.container}>
                <Animated.View style={[styles.PopUp, ViewAnimation]}>
                    <View style={[styles.triangle, this.props.style]} />
                    <Animated.View style={[styles.filterPanel, BorderAnimation]}>
                        <Animated.View style={[styles.SearchBar]}>
                            <Icon name='search'/>
                            <TextInput style={styles.textinput} placeholder="Search by flat name"/>
                        </Animated.View>
                        <View>
                            <DropDownPicker items={contries} placeholder="Country" searchable={true} labelStyle={{color: '#000'}} containerStyle={{height: 40, width: 300,marginVertical: 3}} onChangeItem={item => this.setState({selectedCountry: item.value})}/>                        
                        </View>
                        <View>
                            <DropDownPicker items={cities}   placeholder="City"    searchable={true} labelStyle={{color: '#000'}} containerStyle={{height: 40, width: 300,marginVertical: 3}} onChangeItem={item => this.setState({selectedCity: item.value})}/>                        
                        </View>
                        <Animated.View style={[styles.priceBar,hei1Animation]}>
                            <Text style={{fontSize: 25, marginRight:'auto'}} >Price: </Text>
                            <TextInput keyboardType='numeric' style={styles.textprice} placeholder="From"/>
                            <TextInput keyboardType='numeric' style={styles.textprice} placeholder="To"/>
                        </Animated.View>
                        <Animated.View style={[styles.guestsBar,hei2Animation]}>
                            <Text style={{fontSize: 25,marginRight:'auto'}} >Max Guests: </Text>
                            <TextInput keyboardType='numeric' style={styles.textprice} placeholder="From"/>
                            <TextInput keyboardType='numeric' style={styles.textprice} placeholder="To"/>
                        </Animated.View>
                        <Animated.View style={[styles.SearchButton]}>
                            <Button title="Search" onPress={() => this.animateView()}></Button>
                        </Animated.View>
                     </Animated.View>
                </Animated.View>
            </View>

        )
    }
}

const backgroundPopUpColor="white"
const styles = StyleSheet.create({

    dropdown1:{
        zIndex: 50000,
    },
    guestsBar:{
        zIndex: -1,
        flexDirection:'row', 
        height:40, 
        width: width*0.7,
    },
    priceBar:{
        zIndex: -1,
        flexDirection:'row', 
        height:40, 
        width: width*0.7,
    },
    SearchBar:{
        flexDirection:'row',

    },
    SearchButton:{
        marginTop: 'auto',
    },
    textprice: {
        fontSize: 20,
        width: 60,
        marginHorizontal: 5,
    },
    textinput: {
        fontSize: 20,
        textAlign: 'center'
    },
    container: {
      flex: 1,
      width: width,
      height: height,
      alignItems: 'center',
    },
    PopUp: {
        alignItems: 'center',
      },
      triangle: {
        width: 0,
        height: 10,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderBottomWidth: 20,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: backgroundPopUpColor,
      },
      filterPanel: {
        width: width*0.9,
        height: height*0.4,
        backgroundColor: backgroundPopUpColor,
        alignItems: 'center',
        padding: 10,
      }
})