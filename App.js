import React, { Component } from 'react';
import FontAwesome, { Icons } from "react-native-fontawesome";

import {
 StackNavigator,NavigationActions
} from 'react-navigation';

import './Views/global.js'
import {SignUpScreen } from './Views/SignUp.js'
import {SignInScreen} from './Views/SignIn.js'
import {AppViewsScreen} from './AppViews.js'



const StackNavi =  StackNavigator({
  SignUp: { screen: SignUpScreen,
    navigationOptions: ({ navigation }) => ({
  				title: "",
  			  }) },
  SignIn: { screen: SignInScreen,
    navigationOptions: ({ navigation }) => ({
  				title: "",
  				}) },
  AppViews: { screen: AppViewsScreen,
    navigationOptions: ({ navigation }) => ({
  				title: "",
  			  }) },
},{
  initialRouteName : 'SignIn',
  animationEnabled: true,
   headerMode: 'none',
  lazy:true,
  headerTintColor:'white',
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
     headerBackTitleStyle:{
       color:'white',
       backgroundColor: 'white',
     },
     headerLeft: ( <FontAwesome style={{fontSize: 15, color:"white",margin:20,marginTop:30}}>{Icons.chevronLeft}</FontAwesome>)
   },


});



export default class App extends React.Component {
  render() {
    return <StackNavi/>;
  }
}
