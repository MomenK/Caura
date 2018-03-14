/**
* THIS IS NOT USED !!!!!!!!!!!!!!!!
 * Caura mobile Application
 * @MomenKamal
 CHART.JS: an example of socket communication with Heroku server. THIS IS NOT A FUNCTIONAL PART OF THE APPLICATION, IT IS GOOD FOR FUTURE DEVELOPMENT
*/

import React, { Component } from 'react';
import { Button,Alert,Platform, View, Text,TextInput,TouchableHighlight,TouchableWithoutFeedback, StyleSheet,Image,Dimensions } from 'react-native';

import './global.js'

export class HomeScreen extends Component {


  constructor ()
  {
    super()

    this.state = {name:"",connection:false}
    this.connectThenSend = this.connectThenSend.bind(this)

  }

  connectThenSend(msg)
  {

    if(!this.state.connection){


        this.ws = new WebSocket("ws://desolate-ravine-94118.herokuapp.com/"); //Both IP and port

        this.ws.onopen = () => {
          // connection opened
          this.setState({connection:true})
          this.ws.send(msg); // send a message
        };

        this.ws.onmessage = e => {
          // a message was received
          console.log(e.data);
           Alert.alert("Response:"+ e.data)
        };

        this.ws.onerror = e => {
          // an error occurred
          if (/No/.test(e.message))
          {
             Alert.alert("No Intenet connection")
          }
          console.log(e.message);

        };

        this.ws.onclose = e => {
          // connection closed
         this.setState({connection:false})
          console.log(e.code, e.reason);
        };
    }
    if (this.state.connection) {this.ws.send(msg)}

  }
  validate(text)
  {
    if (/^[A-Z]{3}-[0-9]{2}$/.test(text))
    {
  //  global.deviceName = text
    global.deviceName = "Project Zero" //TODO: This Override must be removed later

    global.signedID = true
   }
   else {
     Alert.alert("Not a valid ID!")
   }

  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
      <Text>Welcome, {global.valueID}!</Text>
      <TextInput
          style={{height: 40}}
          placeholder="example: ABC-12"
          maxLength = {6}
          autoCapitalize = 'characters'
          onChangeText={(text) =>{
            this.setState({name:text})
            global.signedID = false
         }}
        />
        <Button
          title="Register"
          onPress={() =>{
            this.validate(this.state.name)
            navigate('Sensors')
            }
          }
        />
        {this.state.connection &&
        <Button
          title="Test: connected"
          onPress={this.connect}
        />
       }
        <Button
          title="Test: SendSocket"
          onPress={() =>{
            this.connectThenSend(this.state.name)
          }
          }
        />

        </View>

    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex:2,
    padding: 60,
  //  alignItems: 'center'

  },
  button: {
    marginTop:30,
    marginBottom: 15,
  //  width: 260,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#2196F3',

  },
  buttonGreen: {
    marginTop:30,
    marginBottom: 15,
  //  width: 260,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#32cd3288'
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

 title: {
  // position:'absolute',
   alignSelf:'baseline',
   color: 'dodgerblue',
   fontWeight: 'bold',
   fontSize: 20,
   textAlign:'left'
 },
})
