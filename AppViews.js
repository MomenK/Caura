//
// import React, { Component } from 'react';
// import FontAwesome, { Icons } from "react-native-fontawesome";
// import {Image,View,Text,Keyboard} from 'react-native'
//
// import {
//   TabNavigator,NavigationActions,TabBarBottom
// } from 'react-navigation';
//
//
//
// import './Views/global.js'
// import June from './Views/June_Logo.js'
// import {HomeScreen} from './Views/Home.js'
// import {SensorsComponent} from './Views/Sensors.js'
// import {ChartScreen} from './Views/Chart.js'
// import {ChatBotScreen} from './Views/ChatBot.js'
// import {ExtraScreen} from './Views/Extra.js'
//
// export class AppViewsScreen extends React.PureComponent {
//
//
//   constructor(props) {
//     super(props)
//
//     this.keyboardWillShow = this.keyboardWillShow.bind(this)
//     this.keyboardWillHide = this.keyboardWillHide.bind(this)
//
//     this.state = {
//       isVisible: true
//     }
//   }
//
//   componentWillMount() {
//     this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow)
//     this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide)
//   }
//
//   componentWillUnmount() {
//     this.keyboardWillShowSub.remove()
//     this.keyboardWillHideSub.remove()
//   }
//
//   keyboardWillShow = event => {
//     this.setState({
//       isVisible: false
//     })
//   }
//
//   keyboardWillHide = event => {
//     this.setState({
//       isVisible: true
//     })
//   }
//
//
//   render() {
//
//     const TabNavi = TabNavigator({
//       Home: { screen: HomeScreen,
//         navigationOptions: ({ navigation }) => ({
//               title: "Home",
//               tabBarIcon: ({ tintColor }) => <FontAwesome style={{fontSize: 15,color:tintColor}}>{Icons.home}</FontAwesome>
//             }) },
//       Sensors: { screen: SensorsComponent,
//         navigationOptions: ({ navigation }) => ({
//               title: "Test",
//               tabBarIcon: ({ tintColor }) => <FontAwesome style={{fontSize: 15, color:'#fff'}}>{Icons.refresh}</FontAwesome>
//             }) },
//       Chart: {screen: ChartScreen,
//         navigationOptions: ({ navigation }) => ({
//               title: "Discover",
//               tabBarIcon: ({ tintColor }) => <FontAwesome style={{fontSize: 15, color:tintColor}}>{Icons.areaChart}</FontAwesome>
//             }) },
//       ChatBot: { screen: ChatBotScreen,
//         navigationOptions: ({ navigation }) => ({
//               title: "June",
//
//               tabBarIcon: ({ tintColor }) =>    <June
//                 height="30"
//                 width  = "30"
//                 scale = "0.1"
//                 fill = {tintColor}
//                 />
//               }) },
//       Extra: { screen: ExtraScreen,
//         navigationOptions: ({ navigation }) => ({
//               title: "Profile",
//
//               tabBarIcon: ({ tintColor }) => <FontAwesome style={{fontSize: 15,color:tintColor}}>{Icons.bars}</FontAwesome>
//               }) },
//     },{
//
//       tabBarPosition: 'bottom',
//       swipeEnabled: false,
//       animationEnabled: false,
//       lazy:true,
//
//       navigationOptions: {
//
//
//          },
//       tabBarOptions: {
//
//         showIcon:true,
//         showLabel:true,
//         activeTintColor:  '#F16651',
//
//         indicatorStyle:{
//            backgroundColor:'#F16651',
//
//            height:0,
//
//         },
//         labelStyle: {
//           fontSize: 10,
//           padding:1,
//           margin:0,
//         },
//         tabStyle: {
//           height:48,
//           paddingBottom:12,
//           margin:0,
//         },
//         style: {
//
//          backgroundColor: 'rgba(77, 77, 77, 79)',
//          borderTopWidth: 0,
//          borderTopColor: 'midnightblue',
//          padding:0,
//          margin:0,
//            height:48,
//
//
//        }
//       },
//     });
//
//     // const defaultGetStateForAction = TabNavi.router.getStateForAction;
//     //
//     // TabNavi.router.getStateForAction = (action, state) => {
//     //   if ((!global.signedID) && (action.type === NavigationActions.NAVIGATE) &&
//     //      (action.routeName === "Sensors")) {
//     //     return null;
//     //   }
//     //
//     //   return defaultGetStateForAction(action, state);
//     // };
//
//
//
//
//       return (
//           <TabNavi />
//       )
//
//
//
//
//   }
// }
//
//
//
//
//
// const TabNaviHid = TabNavigator({
//   Home: { screen: HomeScreen,
//     navigationOptions: ({ navigation }) => ({
//           title: "Home",
//           tabBarIcon: ({ tintColor }) => <FontAwesome style={{fontSize: 15,color:tintColor}}>{Icons.home}</FontAwesome>
//         }) },
//   Sensors: { screen: SensorsComponent,
//     navigationOptions: ({ navigation }) => ({
//           title: "Test",
//           tabBarIcon: ({ tintColor }) => <FontAwesome style={{fontSize: 15, color:'#fff'}}>{Icons.refresh}</FontAwesome>
//         }) },
//   Chart: {screen: ChartScreen,
//     navigationOptions: ({ navigation }) => ({
//           title: "Discover",
//           tabBarIcon: ({ tintColor }) => <FontAwesome style={{fontSize: 15, color:tintColor}}>{Icons.areaChart}</FontAwesome>
//         }) },
//   ChatBot: { screen: ChatBotScreen,
//     navigationOptions: ({ navigation }) => ({
//           title: "June",
//           tabBarIcon: ({ tintColor }) =>    <June
//             height="30"
//             width  = "30"
//             scale = "0.1"
//             fill = {tintColor}
//             />
//           }) },
//   Extra: { screen: ExtraScreen,
//     navigationOptions: ({ navigation }) => ({
//           title: "Profile",
//
//           tabBarIcon: ({ tintColor }) => <FontAwesome style={{fontSize: 15,color:tintColor}}>{Icons.bars}</FontAwesome>
//           }) },
// },{
//
//   tabBarPosition: 'top',
//   swipeEnabled: false,
//   animationEnabled: false,
//   lazy:true,
//
//
//   tabBarOptions: {
//
//     showIcon:true,
//     showLabel:true,
//     activeTintColor:  '#F16651',
//
//     indicatorStyle:{
//        backgroundColor:'#F16651',
//
//        height:0,
//
//     },
//     labelStyle: {
//       fontSize: 10,
//       padding:1,
//       margin:0,
//     },
//     tabStyle: {
//       height:48,
//       paddingBottom:12,
//       margin:0,
//     },
//     style: {
//
//      backgroundColor: 'rgba(77, 77, 77, 79)',
//      borderTopWidth: 0,
//      borderTopColor: 'midnightblue',
//      padding:0,
//      margin:0,
//        height:48,
//
//
//    }
//   },
// });
