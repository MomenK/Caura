import React, { Component } from 'react';
import { StatusBar,Button,Alert,Platform, View, Text,TextInput,TouchableHighlight,TouchableWithoutFeedback, StyleSheet,Image,Dimensions } from 'react-native';
import FontAwesome, { Icons } from "react-native-fontawesome";

import './global.js'

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

      <View style={{ alignItems: 'center'}}>
        <Text  style={styles.titl} >Sign in</Text>
        <Image  resizeMode='contain' resizeMethod='scale' style={{width: 56,height: 59,marginTop:40,marginBottom:70}}
        source={require('../img/logo_orange1.png')} />
      </View>

      <View style={{flex:2}}>
        <TextInput
            style={styles.Input}
            placeholder="Email"
            placeholderTextColor='#fff'
            selectionColor='#F16641'
            underlineColorAndroid="transparent"
          />

          <TextInput
              style={styles.Input}
              placeholder="Password"
              placeholderTextColor='#fff'
              selectionColor='#F16641'
              underlineColorAndroid="transparent"
            />

          <TouchableHighlight onPress={()=>{
               navigate('AppViews')
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
     backgroundColor:'#F16641',
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
  buttonText: {
    padding: 20,
    color: 'white'
  },
  canvasContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    position: 'relative'
 },
 canvas: {
  // position: 'absolute',
     alignSelf: 'center',
     top: 0,
     left: 0,
     bottom: 0,
     right: 0,
     //width:300
 },
 value: {
  // color: '#F5FCFF',
   fontWeight: 'bold',
   fontSize: 30,
   alignSelf: 'center'

 },

})
