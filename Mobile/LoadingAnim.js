import React, { Component, useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Dimensions, Animated, Text,Button,Keyboard} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import { Icon } from 'react-native-elements'
import { debug } from 'react-native-reanimated';
import { PixelRatio } from 'react-native';

const {width, height} = Dimensions.get("screen")
const speed=200
const initMaxH=3
export default class FilterPopUp extends Component{

    state={
        dot1UpAnimation: new Animated.Value(initMaxH),
        dot2UpAnimation: new Animated.Value(initMaxH),
        dot3UpAnimation: new Animated.Value(initMaxH),
        dot4UpAnimation: new Animated.Value(initMaxH),

        maxH1: initMaxH,
        maxH2: initMaxH,
        maxH3: initMaxH,
        maxH4: initMaxH,

    }

    constructor(props){
        super(props);
        console.debug("text");
        this.dot1Up()
        this.dot2Up()
        this.dot3Up()
        this.dot4Up()
    }

    dot1Up =() =>{
        Animated.timing(this.state.dot1UpAnimation,{toValue:  this.state.maxH1,duration: speed,useNativeDriver: true}).start(
        ()=>Animated.timing(this.state.dot1UpAnimation,{toValue:  -this.state.maxH1,duration: speed,useNativeDriver: true}).start(
            ()=>{
                this.setState({ maxH1: - this.state.maxH1 });
                this.dot1Up();}
        ))
    }
    dot2Up =() =>{
        Animated.timing(this.state.dot2UpAnimation,{toValue:  this.state.maxH2,duration: 1.5*speed,useNativeDriver: true}).start(
        ()=>Animated.timing(this.state.dot2UpAnimation,{toValue:  -this.state.maxH2,duration: 1.5*speed,useNativeDriver: true}).start(
            ()=>{
                this.setState({ maxH2: - this.state.maxH2 });
                this.dot2Up();}
            ))
    }
    dot3Up =() =>{
        Animated.timing(this.state.dot3UpAnimation,{toValue:  this.state.maxH3,duration: 2*speed,useNativeDriver: true}).start(
        ()=>Animated.timing(this.state.dot3UpAnimation,{toValue:  -this.state.maxH3,duration: 2*speed,useNativeDriver: true}).start(
            ()=>{
                this.setState({ maxH3: - this.state.maxH3 });
                this.dot3Up();}
            ))
    }
    dot4Up =() =>{
        Animated.timing(this.state.dot4UpAnimation,{toValue:  this.state.maxH4,duration: 2.5*speed,useNativeDriver: true}).start(
        ()=>Animated.timing(this.state.dot4UpAnimation,{toValue:  -this.state.maxH4,duration: 2.5*speed,useNativeDriver: true}).start(
            ()=>{
                this.setState({ maxH4: - this.state.maxH4 });
                this.dot4Up();}
            ))
    }
    render(){
        const dot1Animation={transform: [{translateY: this.state.dot1UpAnimation,}],};
        const dot2Animation={transform: [{translateY: this.state.dot2UpAnimation,}],};
        const dot3Animation={transform: [{translateY: this.state.dot3UpAnimation,}],};
        const dot4Animation={transform: [{translateY: this.state.dot4UpAnimation,}],};

        return(
            
            <View style={styles.container}>
                <Animated.View style={{flexDirection:'row'}}>
                    <Animated.View style={[styles.dot, dot1Animation]}></Animated.View>
                    <Animated.View style={[styles.dot, dot2Animation]}></Animated.View>
                    <Animated.View style={[styles.dot, dot3Animation]}></Animated.View>
                    <Animated.View style={[styles.dot, dot4Animation]}></Animated.View>
                </Animated.View>
            </View>
        )
    }
}


const dotsize=10
const styles = StyleSheet.create({
    container:{
        height: 3*initMaxH,
        marginVertical: 3*initMaxH,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: height*0.4,
        marginBottom: 'auto',
    },

    dot:{
        width: dotsize,
        height: dotsize,
        backgroundColor: 'orange',
        borderWidth: 0,
        borderRadius: dotsize/2,
        margin: dotsize/2,
    }

});