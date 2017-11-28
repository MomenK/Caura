import React, { Component } from 'react';


import {
  TabNavigator,NavigationActions
} from 'react-navigation';

import './global.js'
import {HomeScreen } from './Home.js'
import {SensorsComponent} from './Sensors.js'



const TabNavi = TabNavigator({
  Home: { screen: HomeScreen },
  Sensors: { screen: SensorsComponent },
},{
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: 'white',
    indicatorStyle:{
       backgroundColor:'red',

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
