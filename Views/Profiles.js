import React, { Component } from 'react';
import {ScrollView, StatusBar,Button,Alert,Platform, View, Text,TextInput,TouchableHighlight,TouchableWithoutFeedback, StyleSheet,Image,Dimensions } from 'react-native';
import FontAwesome, { Icons } from "react-native-fontawesome";

import './global.js'

export class ProfilesScreen extends Component {


  constructor ()
  {
    super()
    this.state = {
      text:{
        1:"",
        2:"",
        3:"",
        },
      length:5,
      names:{
      1:"Fosca",
      2:"Muru",
      3:"Momen",
      4:"Alistar",},
      height:{
      1:"159",
      2:"166",
      3:"200",
      4:"190",},
      values:{
      1:"Scientist",
      2:"CSO",
      3:"king of mango juices",
      4:"Designer",},
    }
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


        <ScrollView ref="scrollView" contentContainerStyle={{ paddingVertical: 0}} keyboardShouldPersistTaps='always'>

        {Object.keys(this.state.names).map((key) => {
          return <TouchableHighlight  key={key}  onPress={()=>{
                    global.valueID = this.state.values[key]
                    navigate('AppViews')
                  }}
                  style={styles.button}>
                    <Text style={styles.text} key={"t"+key} >
                    {this.state.names[key] + " | " + this.state.height[key]}</Text>
                    </TouchableHighlight>
        })}

<View  style={{marginBottom:100}}>

<View  style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>


<TextInput ref="NameInput"
style={styles.Input}
placeholder="Name"
placeholderTextColor='#fff'
selectionColor='#F16651'
underlineColorAndroid="transparent"
onChangeText={(text) => {this.setState({text:{...this.state.text,1:text}})
}}
value={this.state.text[1]}
/>

<TextInput
style={styles.Input}
placeholder="Height"
placeholderTextColor='#fff'
selectionColor='#F16651'
underlineColorAndroid="transparent"
onChangeText={(text) => {this.setState({text:{...this.state.text,2:text}})
}}
value={this.state.text[2]}
/>

<TextInput
style={styles.Input}
placeholder="Position"
placeholderTextColor='#fff'
selectionColor='#F16651'
underlineColorAndroid="transparent"
onChangeText={(text) => {this.setState({text:{...this.state.text,3:text}})
}}
value={this.state.text[3]}
/>
</View>
        <TouchableHighlight  onPress={()=>{
           this.setState(previousState=> ({
           length : this.state.length +1,
           names: {...previousState.names, [this.state.length]: [this.state.text[1]]},
           height: {...previousState.height, [this.state.length] : [this.state.text[2]]},
           values: {...previousState.values, [this.state.length]: [this.state.text[3]]} }))
           this.refs.scrollView.scrollToEnd({animated: true})
          //navigate('SignUp')
        }}
        style={[styles.button,{backgroundColor:'green'}]}>
        <Text style={styles.text}>Add</Text>
        </TouchableHighlight>
  </View>





        </ScrollView>
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
      margin:3,
      marginBottom:2,
      marginTop:20,
      height: 44,
      width:80,
      backgroundColor: 'rgba(255, 255, 255, 0.25)',
      borderRadius:30,
      alignItems: 'center',
      color: 'white',
      fontSize: 16,
      textAlign:'center',
      fontFamily: 'SF Pro Display',
    },

  })
