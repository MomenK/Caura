/**
* THIS IS NOT USED !!!!!!!!!!!!!!!!
 * Caura mobile Application
 * @MomenKamal

EXTRA.JS: an example of a dynamic pie charts graph. THIS IS NOT A FUNCTIONAL PART OF THE APPLICATION.
*/

import React, { Component } from "react";
import { TouchableOpacity,ScrollView,Button,Alert,Platform, View, Text,TextInput,TouchableHighlight,TouchableWithoutFeedback, StyleSheet,Image,Dimensions } from 'react-native';

import FontAwesome, { Icons } from "react-native-fontawesome";
import {VictoryAnimation,Bar,VictoryPie, VictoryBar,VictoryChart, VictoryArea, VictoryAxis, VictoryLine,VictoryLabel, VictoryStack,VictoryTheme } from "victory-native";

import Svg,{
    Path, G
} from 'react-native-svg';

import './global.js'
import Donut from './Donut.js';


export class ExtraScreen extends Component {
  static navigationOptions = {
    title: 'History',
  };

  constructor() {
    super();
    this.state = {
      mode:1,
      type:1,
      activtyZoom: 300,
        recoveryZoom: 300,
        activtyFont: 45,
          recoveryFont: 45,
    };
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }



  render() {
    const { navigate } = this.props.navigation;
  if(this.state.type){

    if(this.state.mode){

          Graph =   <Donut
           height= {300}
           width= {300}
           percent = {global.ProfileActivity}
           fontsize= {45}
           fontColor = "black"
           normalColor = "#F16651"
           backColor = "#ccc"
           warningColor ="#c1503f"
           warningLevel = {30}
             />
    }
    else{

          Graph =  <Donut
          height= {300}
          width= {300}
          percent = {global.ProfileRecovery}
          fontsize= {45}
          fontColor = "black"
          normalColor = "#13afaf"
          backColor = "#ccc"
          warningColor ="teal"
          warningLevel = {30}
            />
    }
  }
  else {
    Graph =

 <View pointerEvents='none' style={{
   flex:1,
   alignItems: 'center',
   flexDirection: 'row',
    justifyContent: 'center',}}>


        <VictoryBar
          animate={{ duration: 500 }}
            style={ {data: { fill: "#F16651" }}}

          data={[
            { x: 1, y: 2 },
            { x: 2, y: 3 },
            { x: 3, y: 50 },
            { x: 4, y: 4 },
            { x: 5, y: 2 },
            { x: 6, y: 30 },
            { x: 7, y: 5 },
            { x: 8, y: 4 },
            { x: 9, y: 2 },
            { x: 10, y: 3 },
            { x: 11, y: 50 },
            { x: 12, y: 4 },
            { x: 13, y: 2 },
            { x: 14, y: 3 },
            { x: 15, y: 5 },
            { x: 16, y: 4 },
            { x: 17, y: 2 },
            { x: 18, y: 3 },
            { x: 19, y: 5 },
            { x: 20, y: 4 },
            { x: 21, y: 20 },
            { x: 22, y: 3 },
            { x: 23, y: 5 },
            { x: 24, y: 40 },
          ]}
        />



      </View>


  }



    return (
      <View style={{
        flex:1,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      backgroundColor:'transparent'}}>

                    <View style={{

                      flex:2.3,
                    alignItems: 'center',
                    flexDirection: 'row',
                    backgroundColor:'transparent'}} >


                    <TouchableOpacity onPress={()=>{
                    if( this.state.type)
                         this.setState({type:0})
                         else
                          this.setState({type:1})
                       }}
                  >


                  {Graph}
                    </TouchableOpacity  >


                            </View>


              <View style={{
                flex:1,
              flexDirection:'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor:'transparent'}} >

                    <TouchableOpacity style ={{backgroundColor:'red'}}
                    onPress={()=>{
                      this.setState({type:1})
                         this.setState({mode:1})

                  }}
                     style={styles.select}>
                     <FontAwesome style={{fontSize: 20}}>{Icons.bars}</FontAwesome>
                     <Text style={styles.text}>Activity</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>{
                      this.setState({type:1})
                         this.setState({mode:0})

                  }}
                     style={styles.select}>
                     <FontAwesome style={{fontSize: 20}}>{Icons.plusCircle}</FontAwesome>
                     <Text style={styles.text}>Recovery</Text>
                    </TouchableOpacity>
              </View>



              <View style={{
                flex:1,
              alignItems: 'flex-end',
              justifyContent: 'center',
              backgroundColor:'transparent'}} >

                    <TouchableOpacity onPress={()=>{
                         navigate('Sensors')

                  }}
                     style={styles.button}>
                     <Text style={styles.text}>Test Now</Text>
                    </TouchableOpacity>
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
     width:200,
     padding: 10,
     backgroundColor:'#F16651',
     borderRadius:30,
     borderWidth: 0,
     borderColor: '#fff',
     alignItems: 'center',
  },
  select: {
       width:200,
       padding: 10,
       backgroundColor:"grey",
       borderRadius:0,
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
