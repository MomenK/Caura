/**
 * Caura mobile Application
 * @MomenKamal

 APP.JS: The main page of the application consisting of navigation bars:
      Stack Navigator: navigates between the introductionary and setting Views; such as SignIn, SignUp, Team page and add play page
      Tab Navigator: navigators between the common views that the user mainly interact with; including teat, history,reports and ChatBot
*/


import React, { Component } from 'react';
import FontAwesome, { Icons } from "react-native-fontawesome";

import {
 TabNavigator,StackNavigator,NavigationActions
} from 'react-navigation';

import './Views/global.js'
import {SignUpScreen } from './Views/SignUp.js'
import {SignInScreen} from './Views/SignIn.js'
import {ProfilesScreen} from './Views/Profiles.js'
import {MainScreen} from './Views/Main.js'


import './Views/global.js'
import June from './Views/June_Logo.js'
import {HomeScreen} from './Views/Home.js'
import {SensorsComponent} from './Views/Sensors.js'
import {ChartScreen} from './Views/Chart.js'
import {ChatBotScreen} from './Views/ChatBot.js'
import {ExtraScreen} from './Views/Extra.js'



import {TabBarComponent} from './wrapper.js'


const TabNavi = TabNavigator({

      // Home: { screen: HomeScreen,
      //   navigationOptions: ({ navigation }) => ({
      //         title: "HOME",
      //         tabBarIcon: ({ tintColor }) => <FontAwesome style={{fontSize: 15,color:tintColor}}>{Icons.home}</FontAwesome>
      //       }) },

      // Chart: {screen: ChartScreen,
      //   navigationOptions: ({ navigation }) => ({
      //         title: "DISCOVER",
      //         tabBarIcon: ({ tintColor }) => <FontAwesome style={{fontSize: 15, color:tintColor}}>{Icons.areaChart}</FontAwesome>
      //       }) },
      ChatBot: { screen: ChatBotScreen,
        navigationOptions: ({ navigation }) => ({
              title: "JUNE",

              tabBarIcon: ({ tintColor }) =>    <June
                height="30"
                width  = "30"
                scale = "0.11"
                fill = {tintColor}
                />
              }) },
      Sensors: { screen: SensorsComponent,
        navigationOptions: ({ navigation }) => ({
              title: "TEST",
              tabBarIcon: ({ tintColor }) => <FontAwesome style={{fontSize: 20, color:tintColor}}>{Icons.stethoscope}</FontAwesome>
            }) },
      Extra: { screen: ExtraScreen,
        navigationOptions: ({ navigation }) => ({
              title: "PROFILE",

              tabBarIcon: ({ tintColor }) => <FontAwesome style={{fontSize: 20,color:tintColor}}>{Icons.bars}</FontAwesome>
              }) },
    },{
      initialRouteName: 'Extra',
      tabBarComponent: TabBarComponent,
      tabBarPosition: 'bottom',
      swipeEnabled: false,
      animationEnabled: true,
      lazy:true,

      navigationOptions: {


         },
      tabBarOptions: {

        showIcon:true,
        showLabel:true,
        activeTintColor:  '#F16651',
        inactiveTintColor :'#ddd',

        indicatorStyle:{
           backgroundColor:'#F16651',

           height:0,

        },
        labelStyle: {
          fontSize: 10,
          padding:0,
          margin:0,

        },
        tabStyle: {

          paddingBottom:0,
          margin:0,

        },
        style: {
          alignItems:'center',
         backgroundColor: 'rgba(77, 77, 77, 79)',
         borderTopWidth: 0,
         borderTopColor: 'midnightblue',
         padding:4,
         margin:0,
           height:48,


       }
      },
    });

    // const defaultGetStateForAction = TabNavi.router.getStateForAction;
    //
    // TabNavi.router.getStateForAction = (action, state) => {
    //   if ((!global.signedID) && (action.type === NavigationActions.NAVIGATE) &&
    //      (action.routeName === "Sensors")) {
    //     return null;
    //   }
    //
    //   return defaultGetStateForAction(action, state);
    // };

const StackNavi =  StackNavigator({
  SignIn: { screen: SignInScreen,
    navigationOptions: ({ navigation }) => ({
  				title: "",
  				}) },
  SignUp: { screen: SignUpScreen,
    navigationOptions: ({ navigation }) => ({
  				title: "",
  			  }) },
  Profiles: { screen: ProfilesScreen,
    navigationOptions: ({ navigation }) => ({
  				title: "",
  			  }) },
  AppViews: { screen: TabNavi,
    navigationOptions: ({ navigation }) => ({
  				title: "",
  			  }) },
          Main: { screen: MainScreen,
            navigationOptions: ({ navigation }) => ({
                  title: "PROFILE",

                  tabBarIcon: ({ tintColor }) => <FontAwesome style={{fontSize: 20,color:tintColor}}>{Icons.bars}</FontAwesome>
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
