import React, { Component } from 'react';
import { StatusBar,Button,Alert,Platform, View, Text,TextInput,TouchableHighlight,TouchableWithoutFeedback, StyleSheet,Image,Dimensions } from 'react-native';
import FontAwesome, { Icons } from "react-native-fontawesome";

import './global.js'

export class ProfilesScreen extends Component {


  constructor ()
  {
    super()
  }

  render() {
    const { navigate } = this.props.navigation;
    return (

      <View style={styles.container}>

      <StatusBar
      translucent={true}
      backgroundColor="transparent"
      barStyle="light-content"
      />

      <Image  resizeMode='contain' style={{flex: 1,
        resizeMode:'cover',
        position: 'absolute',
        justifyContent: 'center',}}
        source={require('../img/Background2.png')} />

        <View style={{flex:1,backgroundColor: 'rgba(0,0,0,0.7)'}}>

        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          backgroundColor: '#F16651',
          alignSelf:'center',
          height :60,
          marginBottom:60,
        }}>
        <View style={{
          position:'absolute',
          marginTop:20,
        }}>
        <Text style={styles.title} >Profiles</Text>
        </View>

        <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-start',
        }}>
        <TouchableHighlight onPress={()=>{
          navigate('SignIn')
        }}>
        <FontAwesome style={{fontSize: 15, color:"white",margin:25}}>{Icons.chevronLeft}</FontAwesome>
        </TouchableHighlight>

        </View>

        </View>


        <View>

        <TouchableHighlight  onPress={()=>{
          global.valueID = "Momen"
          navigate('AppViews')
        }}
        style={styles.button}>
        <Text style={styles.text}>Momen Kamal</Text>
        </TouchableHighlight>

        <TouchableHighlight  onPress={()=>{
          global.valueID = "Renato"
          navigate('AppViews')
        }}
        style={styles.button}>
        <Text style={styles.text}>Renato Circi</Text>
        </TouchableHighlight>

        <TouchableHighlight  onPress={()=>{
          global.valueID = "Alistar"
          navigate('AppViews')
        }}
        style={styles.button}>
        <Text style={styles.text}>Alistar Magrini</Text>
        </TouchableHighlight>


        <TouchableHighlight  onPress={()=>{
          navigate('SignUp')
        }}
        style={[styles.button,{backgroundColor:'green'}]}>
        <Text style={styles.text}>Add</Text>
        </TouchableHighlight>

        </View>
        </View>
        </View>

      );
    }
  }



  const styles = StyleSheet.create({
    container: {
      flex:1,
      padding: 0,
      //  alignItems: 'center'

    },
    button: {
      height: 44,
      padding: 10,
      margin:30,
      marginBottom:0,
      marginTop:13,
      backgroundColor:'#F16651',
      borderRadius:30,
      borderWidth: 0,
      borderColor: '#fff',
      alignItems: 'center',
    },
    fbbutton: {
      height: 44,
      padding: 10,
      margin:30,
      marginTop:80,
      marginBottom:27,
      backgroundColor:'#3B5998',
      borderRadius:30,
      borderWidth: 0,
      borderColor: '#fff',
      alignItems:'center'
    },
    text: {
      color: 'white',
      fontSize: 16,
      fontFamily: 'SF Pro Display',
      textAlign:'center',
    },
    small: {
      fontSize: 10,
      margin:30,
      marginBottom:80,
      marginTop:35,

    },
    title: {
      color: 'white',
      fontSize: 16,
      fontFamily: 'SF Pro Display',
    },
    Input: {
      margin:30,
      marginBottom:16,
      marginTop:0,
      height: 44,
      backgroundColor: 'rgba(255, 255, 255, 0.25)',
      borderRadius:30,
      alignItems: 'center',
      color: 'white',
      fontSize: 16,
      textAlign:'center',
      fontFamily: 'SF Pro Display',
    },

  })
