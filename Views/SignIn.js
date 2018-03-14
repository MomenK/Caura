/**
 * Caura mobile Application
 * @MomenKamal
 SIGN IN.JS: User sign in page. THIS PAGE IS STILL NOT CONNECTED TO SERVER BACKBONE
*/

import React, { Component } from 'react';
import { StatusBar,Button,Alert,Platform, View, Text,TextInput,TouchableHighlight,TouchableWithoutFeedback, StyleSheet,Image,Dimensions } from 'react-native';
import FontAwesome, { Icons } from "react-native-fontawesome";
import Svg,{
    Path, G
} from 'react-native-svg';

import './global.js'

import June from './June_Logo.js';


export class SignInScreen extends Component {


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
      source={require('../img/Background1.png')} />

      <View style={{ flex:1, alignItems: 'center'}}>
        <Text  style={styles.titl} >Sign in</Text>

        <View   style={{flex:1, backgroundColor:"transparent", alignItems:'center', justifyContent:'center'}}>
        <June
        height="80"
        width  = "80"
        scale = "0.3"
        fill = "#F16651"
        />
        </View>

      </View>

      <View style={{flex:2}}>
        <TextInput
            style={styles.Input}
            placeholder="Email"
            placeholderTextColor='#fff'
            selectionColor='#F16651'
            underlineColorAndroid="transparent"
          />

          <TextInput
              style={styles.Input}
              placeholder="Password"
              secureTextEntry = {true}
              placeholderTextColor='#fff'
              selectionColor='#F16651'
              underlineColorAndroid="transparent"
            />

          <TouchableHighlight onPress={()=>{
               navigate('Profiles')

        }}
           style={styles.button}>
           <Text style={styles.text}>Sign in</Text>
          </TouchableHighlight>

           <Text style={styles.text}>Forgot your password?</Text>

           <TouchableHighlight style={styles.fbbutton}>
              <View  style={{
                flex:1,
                flexDirection: 'row'}}>
              <FontAwesome style={{fontSize: 15, color:"#fff",margin:4,marginRight:20}}>{Icons.facebook}</FontAwesome>
              <Text style={styles.text}> Sign in with facebook</Text>
              </View>
           </TouchableHighlight>



              <TouchableHighlight  onPress={()=>{
                   navigate('SignUp')

            }}>
            <Text style={styles.text}>Don&#39;t have an account?  <Text style={{color: '#39A9DB'}}>Sign up</Text> </Text>
              </TouchableHighlight>
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
     marginBottom:27,
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
     textAlign:'center',
     fontFamily: 'SF Pro Display',
     alignSelf:'center',
  },
  titl: {
     color: 'white',
     fontSize: 16,
     textAlign:'center',
     fontFamily: 'SF Pro Display',
     marginTop:23
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
