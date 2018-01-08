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
import {ExtraScreen} from './Extra.js'



const TabNavi = TabNavigator({
  Home: { screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
  				title: "Home",
  				tabBarIcon: ({ tintColor }) => <FontAwesome style={{fontSize: 15,color:'#fff'}}>{Icons.home}</FontAwesome>
  			}) },
  Sensors: { screen: SensorsComponent,
    navigationOptions: ({ navigation }) => ({
  				title: "Sync",
  				tabBarIcon: ({ tintColor }) => <FontAwesome style={{fontSize: 15, color:'#fff'}}>{Icons.refresh}</FontAwesome>
  			}) },
  Chart: {screen: ChartScreen,
    navigationOptions: ({ navigation }) => ({
  				title: "Record",
  				tabBarIcon: ({ tintColor }) => <FontAwesome style={{fontSize: 15, color:'#fff'}}>{Icons.areaChart}</FontAwesome>
  			}) },
  ChatBot: { screen: ChatBotScreen,
    navigationOptions: ({ navigation }) => ({
  				title: "Bar",
  				tabBarIcon: ({ tintColor }) => <FontAwesome style={{fontSize: 15,color:tintColor}}>{Icons.bars}</FontAwesome>
  			}) },
  Extra: { screen: ExtraScreen,
    navigationOptions: ({ navigation }) => ({
  				title: "Ext",
  				tabBarIcon: ({ tintColor }) => <FontAwesome style={{fontSize: 15, color:'#fff'}}>{Icons.refresh}</FontAwesome>
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
    activeTintColor:  '#fff',

    indicatorStyle:{
       backgroundColor:'#36D16D',
    //   width:20,
       height:2,
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

export default class App extends React.Component {
  render() {
    return <TabNavi/>;
  }
}
