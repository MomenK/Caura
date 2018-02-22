
import React, { Component } from 'react';
import { AsyncStorage,Button,Alert,Platform, View, Text,TextInput,TouchableHighlight,TouchableOpacity,TouchableWithoutFeedback, StyleSheet,Image,Dimensions } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';

import {VictoryTooltip,VictoryVoronoiContainer,VictoryCursorContainer,VictoryScatter,VictoryAnimation,Bar,VictoryPie, VictoryBar,VictoryChart, VictoryArea, VictoryAxis, VictoryLine,VictoryLabel, VictoryStack,VictoryTheme } from "victory-native";

//import Orientation from 'react-native-orientation';
import FontAwesome, { Icons } from "react-native-fontawesome"
import base64 from 'base-64';


import './global.js'
import June from './June_Logo.js';
import Donut from './Donut.js';

 export class MainScreen extends Component {
   static navigationOptions = {
     title: 'You Today',
   };

  constructor() {
    super()
    this.manager = new BleManager()
    this.state = {info: "Ready...", values: {},connection: false,tryingtoCon:false,
    mode:1,
    type:1,
    testOption:"",

  }
  //  this.prefixUUID = "f00011"
    this.prefixUUID = "f000bab"
    this.suffixUUID = "-0451-4000-b000-000000000000"
    this.SerprefixUUID = "0000bab"
    this.SersuffixUUID = "-0000-1000-8000-00805f9b34fb"
    this.sensors = { //This need to be changed to have each chemical in a different service
      1: "Cortisol",


    }

this.win = Dimensions.get('window');


  }

  serviceUUID(num) {
    return this.SerprefixUUID + "0" + this.SersuffixUUID
  }

  notifyUUID(ser,num) {
    return this.prefixUUID + num + this.suffixUUID
  }

  writeUUID(num) {
    return this.prefixUUID + num + "2" + this.suffixUUID
  }

  info(message) {
   this.setState({info: message})
 }

 error(message) {
   this.setState({info: "ERROR: " + message,connection:false})

 }
 updateValue(key, value) {

   o =  this.ParserCon(value);
   this.setState({values: {...this.state.values, [key]: o}})
 }

  //componentWillMount() {

                     ////Allows auto detection of Device with no need to press button to connect
 //   if (Platform.OS === 'ios') {
 //     this.manager.onStateChange((state) => {
 //       if (state === 'PoweredOn') this.scanAndConnect()
 //     })
 //   }
 //    else {
 //      this.scanAndConnect()
 //    }
  //}

  componentDidMount(){

    AsyncStorage.setItem('@MySuperStore:key', 'I like to save it.',()=>{
    //  console.log('saved')
      AsyncStorage.getItem('@MySuperStore:key',(err, res)=>{
      //  console.log(res)
       AsyncStorage.removeItem('@MySuperStore:key',()=>{
    //     console.log('deleted')
         AsyncStorage.getItem('@MySuperStore:key',(err,res)=> {
  //         console.log(res)
         });
       });
     });
  });


  }

scanAndConnect() {
  global.signedID = true;
   if(global.signedID){
     this.setState({tryingtoCon:true})
     this.info("Scanning...")
     this.manager.startDeviceScan(null,
                                  null, (error, device) => {
      //  console.log(global.deviceNam)
         if (error) {
           this.error(error.message)
           this.setState({tryingtoCon:false})
          return
         }

         if (device.name === global.deviceNam ) {
           this.device = device
           this.info("Connecting device")
           this.manager.stopDeviceScan()
           device.connect()
             .then((device) => {
               this.setState({tryingtoCon:false})
               this.setState({connection:true})
               this.info("Discovering services and characteristics")
               return device.discoverAllServicesAndCharacteristics()
             })
             .then((device) => {
               this.info("Setting notifications")
               return this.setupNotifications(device)
             })
             .then(() => {
               this.info("Listening...")
             }, (error) => {
               this.error(error.message)
             })

         }
    });
 }
 else {
   this.info("Must Register ID first")
 }
 }


 async setupNotifications(device) {
  for (const id in this.sensors) {
      const service = this.serviceUUID(2)
    //  const characteristicW = this.writeUUID(id)
      const characteristicN = this.notifyUUID(2,id)

      // const characteristic = await device.writeCharacteristicWithResponseForService(
      //   service, characteristicW, "AQ==" /* 0x01 in hex */
      // )

      device.monitorCharacteristicForService(service, characteristicN, (error, characteristic) => {
        if (error) {
          this.error(error.message)
          return
        }


        this.updateValue(characteristic.uuid, characteristic.value)
      })

          device.onDisconnected((error,device)=>{
            if (error){
                this.error(error.message)
                this.info("Disconnected..")
                return
            }
            this.info("Disconnected..")

          })
    }
  }

stopScanAndDisconnect()
  {
    this.info("Aborting...")
    this.setState({tryingtoCon:false})
    this.manager.stopDeviceScan()
    if(this.device){
    this.device.cancelConnection()}
    this.info("Ready..")
  }

disconnect()
  {
    this.device.cancelConnection()
    this.info("Ready..")
  }

 ParserCon(raw)
  {
    value = raw.slice(0,8); //4 depends on the length of notification from BLE
    //  this.info(value+"..")
  //  value = "D/8="; //To testcase weird input use https://cryptii.com/base64-to-hex
    str = base64.decode(value);
    m="";
    for(var i = 0; i < str.length; i++ )
    {
    m += (str.charCodeAt(i) >>4& 0xF ).toString(16);
    m += (str.charCodeAt(i) & 0xF ).toString(16);
    }
    num = parseInt(m,16);
  //  console.log(m);
  //  console.log(num);
  return  (num);
  }

  render() {
    const { navigate } = this.props.navigation;
    if(this.state.connection){

    button =  <TouchableOpacity onPress={()=>{
           this.disconnect()
                  }}
    style={[styles.button, {backgroundColor:'#32cd32', }]}>
       <Text style={styles.title}>Disconnect</Text>
      </TouchableOpacity>


    }
    else{

       if(this.state.tryingtoCon){

         button = <TouchableOpacity onPress={()=>{
                this.stopScanAndDisconnect()
                       }}
            style={[styles.button, {backgroundColor:'red', }]}>
            <Text style={styles.title}>Cancel</Text>
           </TouchableOpacity>


       }
       else{
         button =  <TouchableHighlight onPress={()=>{

           Alert.alert(
             'Test',
             'Please choose your test option',
             [
               {text: 'Recovery', onPress: () => {this.setState({testOption:'Recovery'});   this.scanAndConnect() }},
             {text: 'Post-workout', onPress: () => {this.setState({testOption:'Post-workout'});   this.scanAndConnect() }},
             {text: 'Pre-workout', onPress: () => {this.setState({testOption:'Pre-workout'});   this.scanAndConnect() }},

             ],
             { cancelable: true }
           )



              }}
            style={styles.button}>
            <Text style={styles.title}>Connect</Text>
           </TouchableHighlight>

     }
    }

    if(this.state.type){

      if(this.state.mode){

            Graph =
            <View pointerEvents='none' style={{
              flex:1,
              alignItems: 'center',
              flexDirection: 'row',
               justifyContent: 'center',}}>
               <Donut
             height= {300}
             width= {300}
             percent = {global.ProfileActivity}
             fontsize= {45}
             fontColor = "white"
             normalColor = "#F16651"
             backColor = "rgba(256,256,256,0.25)"
             warningColor ="#c1503f"
             warningLevel = {30}
               />
                   </View>
      }
      else{

            Graph =
            <View pointerEvents='none' style={{
              flex:1,
              alignItems: 'center',
              flexDirection: 'row',
               justifyContent: 'center',}}>
               <Donut
            height= {300}
            width= {300}
            percent = {global.ProfileRecovery}
            fontsize= {45}
            fontColor = "white"
            normalColor = "#13afaf"
            backColor = "rgba(256,256,256,0.25)"
            warningColor ="teal"
            warningLevel = {30}
              />
                  </View>
      }
    }
    else {
      Graph =

   <View pointerEvents='box-none' style={{
     flex:1,
     alignItems: 'center',
     flexDirection: 'row',
      justifyContent: 'center',}}>

 <VictoryChart  width={400} height={300}
domainPadding={{x: [20, 10], y: 5}}

style={{
    parent: {
      borderColor: "red"
    }
  }}



  containerComponent={<VictoryVoronoiContainer/>}
 >

 <VictoryScatter
          size={10}
          labels={(d) => `${d.x}, ${d.y}mg/uL`}
              labelComponent={<VictoryTooltip/>}
          style={ {data: { stroke: "#F16651" }}}

          data={[
            { x: 1, y: 21 },
            { x: 8, y: 31 },
            { x: 13, y: 15 },
            { x: 24, y: 4 },

          ]}

          containerComponent={
    <VictoryCursorContainer
      cursorLabel={(d) => `${d.x.toPrecision(2)}, ${d.y.toPrecision(2)}`}
    />
  }
        />
          <VictoryLine
            animate={{ duration: 500 }}
              style={ {data: { stroke: "#F16651" }}}

            data={[
              { x: 1, y: 21 },
              { x: 8, y: 31 },
              { x: 13, y: 15 },
              { x: 24, y: 4 },

            ]}

            containerComponent={
    <VictoryCursorContainer
      cursorDimension="x"
      cursorLabel={(d) => `${round(d.x, 2)}, ${round(d.y, 2)}`}
      cursorLabel={(d) => `${round(d.x, 2)}, ${round(d.y, 2)}`}
/>
}


          />

 </VictoryChart>

        </View>


    }


      return (


        <View style={{
          flex:1,
          padding:0,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor:'transparent'}}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          backgroundColor: '#F16651',
          alignSelf:'center',
          height :60,
          marginBottom:0,
        }}>
              <View style={{
                position:'absolute',
                marginTop:20,
              }}>
              <Text style={styles.title} >{global.ProfileName}</Text>
              </View>

              <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-start',
              }}>
              <TouchableHighlight onPress={()=>{
                navigate('Profiles')
              }}>
              <FontAwesome style={{fontSize: 15, color:"white",margin:25}}>{Icons.chevronLeft}</FontAwesome>
              </TouchableHighlight>

              </View>
        </View>

                      <View style={{

                        flex:1.5,
                       alignSelf: 'stretch',

                      alignItems: 'center',
                      flexDirection: 'column',
                      backgroundColor:'transparent'}} >

                      <Image  resizeMode='contain' style={{flex: 1.5,
                        resizeMode:'cover',
                        position: 'absolute',
                        justifyContent: 'center',}}
                        source={require('../img/Background1.png')} />

                      <TouchableOpacity onPress={()=>{
                      if( this.state.type)
                           this.setState({type:0})
                           else
                            this.setState({type:1})
                         }}

                         onLongPress={()=>{}}
                    >
                    <View style={{

                      flex:1.5,

                    alignItems: 'center',
                    flexDirection: 'column',
                    backgroundColor:'transparent'}} >

                    {Graph}

                    </View>
                      </TouchableOpacity  >


                     </View>


                <View style={{
                  flex:0.5,
                flexDirection:'row',
                alignItems: 'flex-start',
                justifyContent: 'center',
                backgroundColor:'transparent'}} >

                      <TouchableOpacity style ={{backgroundColor:'red'}}
                      onPress={()=>{
                        this.setState({type:1})
                           this.setState({mode:1})

                    }}
                       style={[styles.select, {backgroundColor: this.state.mode?"#ccc":"#F16651"}]}>
                       <FontAwesome style={{fontSize: 20,marginBottom:2,}}>{Icons.bolt}</FontAwesome>
                       <Text style={styles.text}>Intensity</Text>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={()=>{
                        this.setState({type:1})
                           this.setState({mode:0})

                    }}
                       style={[styles.select, {backgroundColor: this.state.mode?"#13afaf":"#ccc"}]}>
                       <FontAwesome style={{fontSize: 20,marginBottom:2}}>{Icons.star}</FontAwesome>
                       <Text style={styles.text}>Recovery</Text>
                      </TouchableOpacity>
                </View>




                        <View style={{flex: 1,

                        backgroundColor:'transparent' }}>

                        {Object.keys(this.sensors).map((key) => {
                          return <View
                          style={{
                           flex: 2,


                           backgroundColor:'transparent'
                         }}
                          key={key}
                        >
                                  <Text style={[styles.title,{color:'black'}]} key={"t"+key}>
                                   {this.sensors[key] + ": " } </Text>
                                  <Text style={styles.value} key={"v"+key}> {(this.state.values[this.notifyUUID(2,key)] || "0")+" mM"}</Text>
                                  </View>
                        })}

                        {button}



                              <View style={{flex:1,alignItems:'center', backgroundColor:'transparent'}}>

                            {this.state.tryingtoCon && <Bars size={12} color="#F16651"  /> }
                            {this.state.connection && <Pulse  size={20} color="#F16651" /> }

                            </View>

                </View>


          </View>




      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 60,
  //  alignItems: 'center'

  },
  button: {
     height: 44,
     width:300,
     padding: 10,
     backgroundColor:'#F16651',
     borderRadius:30,
     borderWidth: 0,
     borderColor: '#fff',
     alignItems: 'center',

  },
  select: {
       width:200,
       padding: 5,
       backgroundColor:"grey",
       borderRadius:0,
       borderWidth: 0,
       borderColor: '#fff',
       alignItems: 'center',
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
   color: 'white',
   fontSize: 16,
   fontFamily: 'SF Pro Display',
 },
 text: {
    color: 'white',
    fontSize: 12,
    textAlign:'center',
    fontFamily: 'SF Pro Display',
    alignSelf:'center',
 },
})



// <View style={styles.canvasContainer}>
// <Image  resizeMode='contain' style={{width: this.win.width,height: this.win.height}}
// source={require('../img/Logo_alpha.png')} />
//   </View>
