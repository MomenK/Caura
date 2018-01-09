import React, { Component } from 'react';
import FontAwesome, { Icons } from "react-native-fontawesome";

import {
 StackNavigator,NavigationActions
} from 'react-navigation';

import './Views/global.js'
import {HomeScreen } from './Views/Home.js'
import {SignInScreen} from './Views/SignIn.js'



const StackNavi =  StackNavigator({
  Home: { screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
  				title: "",
  			  }) },
  SignIn: { screen: SignInScreen,
    navigationOptions: ({ navigation }) => ({
  				title: "",
  				}) },
},{
  initialRouteName : 'SignIn',
  animationEnabled: true,
   headerMode: 'float',
  lazy:true,
  navigationOptions: {
     gesturesEnabled: false,
     headerStyle:{
       position:'absolute',
       backgroundColor: 'transparent',
       zIndex: 100,
       top: 0,
       left: 0,
       right: 0
     },
     headerTitleStyle:{
       color: 'white',
       fontSize: 16,
       fontFamily: 'SF Pro Display',
     },
   },


});



export default class App extends React.Component {
  render() {
    return <StackNavi/>;
  }
}
