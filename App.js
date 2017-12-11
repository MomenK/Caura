import React, { Component } from 'react';
import FontAwesome, { Icons } from "react-native-fontawesome";

import {
  TabNavigator,NavigationActions
} from 'react-navigation';

import './global.js'
import {HomeScreen } from './Home.js'
import {SensorsComponent} from './Sensors.js'
import {ChartScreen} from './Chart.js'
import {ChatBotScreen} from './ChatBot.js'



const TabNavi = TabNavigator({
  Home: { screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
  				title: "Home",
  				tabBarIcon: ({ tintColor }) => <FontAwesome style={{fontSize: 28}}>{Icons.home}</FontAwesome>
  			}) },
  Sensors: { screen: SensorsComponent,
    navigationOptions: ({ navigation }) => ({
  				title: "Sync",
  				tabBarIcon: ({ tintColor }) => <FontAwesome style={{fontSize: 28}}>{Icons.refresh}</FontAwesome>
  			}) },
  Chart: {screen: ChartScreen,
    navigationOptions: ({ navigation }) => ({
  				title: "Record",
  				tabBarIcon: ({ tintColor }) => <FontAwesome style={{fontSize: 28}}>{Icons.areaChart}</FontAwesome>
  			}) },
  ChatBot: { screen: ChatBotScreen,
    navigationOptions: ({ navigation }) => ({
  				title: "Bar",
  				tabBarIcon: ({ tintColor }) => <FontAwesome style={{fontSize: 28}}>{Icons.bars}</FontAwesome>
  			}) },
},{
  initialRouteName : 'Home',
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  animationEnabled: true,
  lazy:true,
  tabBarOptions: {
    showIcon:true,
    showLabel:false,
    activeTintColor:  '#141823',
    inactiveTintColor: 'red',
    indicatorStyle:{
       backgroundColor:'aliceblue',
    //   width:20,
       height:3,
      // alignSelf:'center'
    },
    style: {
     backgroundColor: 'rgba(33, 150, 243, 1)',
     borderTopWidth: 0,
     borderTopColor: 'midnightblue',

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

export default class App extends React.Component {
  render() {
    return <TabNavi/>;
  }
}
