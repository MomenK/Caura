import React, { Component } from 'react';
import { Button,Alert,Platform, View, Text,TextInput,TouchableHighlight,TouchableWithoutFeedback, StyleSheet,Image,Dimensions } from 'react-native';

import './global.js'

export class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Welcome',
  };

  constructor ()
  {
    super()
    this.state = {name:""}
  }
  validate(text)
  {
    if (text.length == 12)
    {
    global.deviceName = text
    global.signedID = true
   }
   else {
     Alert.alert("Not a valid ID")
   }

  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
      <Text>Welcome</Text>
      <TextInput
          style={{height: 40}}
          placeholder="Enter your KEYA unique ID"
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
