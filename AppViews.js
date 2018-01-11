import React, { Component } from 'react';
import FontAwesome, { Icons } from "react-native-fontawesome";
import {Image} from 'react-native'

import {
  TabNavigator,NavigationActions
} from 'react-navigation';

import './Views/global.js'
import June from './Views/June_Logo.js'
import {HomeScreen} from './Views/Home.js'
import {SensorsComponent} from './Views/Sensors.js'
import {ChartScreen} from './Views/Chart.js'
import {ChatBotScreen} from './Views/ChatBot.js'
import {ExtraScreen} from './Views/Extra.js'



const TabNavi = TabNavigator({
  Home: { screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
  				title: "Home",
  				tabBarIcon: ({ tintColor }) => <FontAwesome style={{fontSize: 15,color:tintColor}}>{Icons.home}</FontAwesome>
  			}) },
  Sensors: { screen: SensorsComponent,
    navigationOptions: ({ navigation }) => ({
  				title: "Sync",
  				tabBarIcon: ({ tintColor }) => <FontAwesome style={{fontSize: 15, color:'#fff'}}>{Icons.refresh}</FontAwesome>
  			}) },
  Chart: {screen: ChartScreen,
    navigationOptions: ({ navigation }) => ({
  				title: "Record",
  				tabBarIcon: ({ tintColor }) => <FontAwesome style={{fontSize: 15, color:tintColor}}>{Icons.areaChart}</FontAwesome>
  			}) },
  ChatBot: { screen: ChatBotScreen,
    navigationOptions: ({ navigation }) => ({
  				title: "Bar",
  				tabBarIcon: ({ tintColor }) => <FontAwesome style={{fontSize: 15,color:tintColor}}>{Icons.bars}</FontAwesome>
  			}) },
  Extra: { screen: ExtraScreen,
    navigationOptions: ({ navigation }) => ({
  				title: "Extra",
  				tabBarIcon: ({ tintColor }) =>    <June
            height="30"
            width  = "30"
            scale = "0.1"
            fill = {tintColor}
            />
          }) },
},{
  initialRouteName : 'Home',
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  animationEnabled: true,
  lazy:true,
  tabBarOptions: {

    showIcon:true,
    showLabel:true,
    activeTintColor:  '#F16651',

    indicatorStyle:{
       backgroundColor:'#F16651',
    //   width:20,
       height:0,
      // alignSelf:'center'
    },
    labelStyle: {
      fontSize: 10,
      padding:1,
      margin:0,
    },
    tabStyle: {
      height:48,
      paddingBottom:12,
      margin:0,
    },
    style: {
     backgroundColor: 'rgba(77, 77, 77, 79)',
     borderTopWidth: 0,
     borderTopColor: 'midnightblue',
     padding:0,
     margin:0,

   }
  },
});

const defaultGetStateForAction = TabNavi.router.getStateForAction;

TabNavi.router.getStateForAction = (action, state) => {
  if ((!global.signedID) && (action.type === NavigationActions.NAVIGATE) &&
     (action.routeName === "Sensors")) {
    return null;
  }

  return defaultGetStateForAction(action, state);
};

export class AppViewsScreen extends React.Component {
  render() {
    return <TabNavi/>;
  }
}
