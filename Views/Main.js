
import React, { Component } from 'react';
import { ScrollView,AsyncStorage,Button,Alert,Platform, View, Text,TextInput,TouchableHighlight,TouchableOpacity,TouchableWithoutFeedback, StyleSheet,Image,Dimensions } from 'react-native';
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
    dataValue:  global.ProfilesamplesValue,
    dataTime:  global.ProfilesamplesTime,

  }

  this.store ={

          surname:{
          },
          gender:{
            },
          age:{
            },
          height:{
            },
          weight:{
          },
          activity:{
            },
          recovery:{
          },
          samplesValue:{
                    },
          samplesTime:{
                  },
          logsValue:{
                    },
          logsTime:{
          },
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



  componentWillUnmount() {

    _saver = async() =>{


      try {
    await AsyncStorage.setItem('store', JSON.stringify(this.store));
      console.log(this.store)


  } catch (error) {
    // Error saving data
  }

    }

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
    const min = 1;
    const max = 100;
    const rand = min + Math.random() * (max - min);

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
           global.ProfilesamplesValue[3]=50;
           global.ProfilesamplesTime[3]=11.5;

           this.store.samplesTime =    global.ProfilesamplesTime;
           this.store.samplesValue = global.ProfilesamplesValue;
           this.setState({dataTime: this.store.samplesTime,dataValue: this.store.samplesValue})
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
      justifyContent: 'center',}}>

 <VictoryChart  width={400} height={300}
 domain={{x: [1, 24], y: [0, 50]}}
domainPadding={{x: [20, 10], y: 5}}

 theme={theme}

style={{
    parent: {
      borderColor: "red"
    }
  }}



  containerComponent={<VictoryVoronoiContainer/>}
 >
  <VictoryAxis tickValues={[0,6, 12, 18, 24]} tickFormat={["0:00","6:00", "12:00", "18:00", "11:59"]}/>

 <VictoryAxis dependentAxis tickFormat={(tick) => tick}/>

 <VictoryScatter
          size={10}
            animate={{ duration: 500 }}
          labels={(d) => `${d.x}, ${d.y}mg/uL`}
              labelComponent={<VictoryTooltip flyoutStyle={{fill: "black", stroke:axisColor}}/>}
          style={ {data: { stroke: "#F16651" }}}

          data={[
            { x:   this.state.dataTime[0], y:   this.state.dataValue[0] },
            { x:   this.state.dataTime[1], y:   this.state.dataValue[1] },
            { x:   this.state.dataTime[2], y:   this.state.dataValue[2] },
            { x:   this.state.dataTime[3], y:   this.state.dataValue[3] },

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

              { x:   this.state.dataTime[0], y:   this.state.dataValue[0] },
              { x:   this.state.dataTime[1], y:   this.state.dataValue[1] },
              { x:   this.state.dataTime[2], y:   this.state.dataValue[2] },
              { x:   this.state.dataTime[3], y:   this.state.dataValue[3] },


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

                    flex:2.2,
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

                         onLongPress={()=>{}}>
                        <View style={{

                          flex:1,

                        alignItems: 'center',
                        flexDirection: 'column',
                        backgroundColor:'transparent'}} >

                        {Graph}

                        </View>
                      </TouchableOpacity  >


                     </View>


                <View style={{

                flexDirection:'row',
                alignSelf:'stretch',
                 alignItems: 'flex-start',
                justifyContent: 'center',
                backgroundColor:'transparent'}} >

                                <View style={{
                                  flex:1,
                                flexDirection:'column',
                                alignItems: 'center',
                                 alignItems: 'stretch',
                                justifyContent: 'center',
                              backgroundColor:'transparent'}} >

                                <TouchableOpacity
                                          onPress={()=>{
                                  this.setState({type:1})
                                     this.setState({mode:1})

                              }}
                                 style={[styles.select, {backgroundColor: !this.state.mode?"#ccc":"#F16651"}]}>
                                 <FontAwesome style={{fontSize: 20,marginBottom:2,}}>{Icons.bolt}</FontAwesome>
                                 <Text style={styles.text}>Intensity</Text>
                                </TouchableOpacity>
                                </View>

                                <View style={{
                                  flex:1,
                                flexDirection:'column',
                                alignItems: 'center',

                                 alignItems: 'stretch',
                                justifyContent: 'center',
                                  backgroundColor:'transparent'}} >


                                <TouchableOpacity onPress={()=>{
                                  this.setState({type:1})
                                     this.setState({mode:0})

                              }}
                                 style={[styles.select, {backgroundColor: !this.state.mode?"#13afaf":"#ccc"}]}>
                                 <FontAwesome style={{fontSize: 20,marginBottom:2}}>{Icons.star}</FontAwesome>
                                 <Text style={styles.text}>Recovery</Text>
                                </TouchableOpacity>
                                </View>

                          </View>




                        <View style={{flex: 1,


                      backgroundColor:'transparent',
                      alignSelf:'stretch'}}>

                        <ScrollView
                         keyboardShouldPersistTaps='always'>

                         <View style={{flex: 1,
                         alignItems: 'center',

                         backgroundColor:'transparent' }}>

                           {Object.keys(global.ProfilelogsTime).map((key) => {

                      return (
                        <View   key={"V1"+key}
                        style={{flex: 1,
                           flexDirection: 'row',
                           padding:7,
                          borderBottomWidth: 0.5,
                          borderBottomColor: '#aaa',
                           }}>

                           <View  key={"V2"+key}style={{flex:0.5,  alignItems: 'flex-start',   justifyContent: 'center'  }}>

                          <FontAwesome  key={"F"+key} style={{fontSize: 30, color:'#F16651'}}>{Icons.circle}</FontAwesome>
                           </View>

                          <View  key={"V3"+key} style={{flex:1.5,  alignItems: 'flex-start',   justifyContent: 'space-around'  }}>
                          <Text  key={"T"+key}>{global.ProfilelogsTime[key]}</Text>
                          </View>
                          <View  key={"V4"+key} style={{ flex:1, alignItems: 'flex-start',   justifyContent: 'space-around'}} >
                          <Text  key={"V"+key}> {global.ProfilelogsValue[key]}</Text>
                          </View>
                       </View>
                     )})}
</View>

                         </ScrollView>

                      </View>



                      <View style={{flex:0.7,alignItems:'center', justifyContent:"center",backgroundColor:'transparent',alignSelf:'stretch'}}>

                              <View style={{flex:1,alignItems:'center', justifyContent:"center",backgroundColor:'transparent'}}>
                                    {this.state.tryingtoCon && <Bars size={12} color="#F16651"  /> }
                                    {this.state.connection && <Pulse  size={20} color="#F16651" /> }
                              </View>


                              <View style={{flex:1,alignItems:'center', justifyContent:"center",backgroundColor:'transparent'}}>
                                    {button}
                              </View>


                              <View style={{alignItems:'center', justifyContent:"center",backgroundColor:'transparent'}}>

                              {Object.keys(this.sensors).map((key) => {
                                return <View key={key}>

                                        <Text style={[styles.text,{color:'black'}]} key={"v"+key}> {this.sensors[key] + ": "+(this.state.values[this.notifyUUID(2,key)] || rand.toFixed(2))+" mM"}</Text>
                                        </View>
                              })}

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

         margin:0,
       padding: 4,
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


/*
  "grayscale" theme (VictoryTheme.grayscale)
  The grayscale is the default theme.
  Try changing it. You could start with `colors` or `fontSize`.
*/

// Colors
const colors = [
  "#252525",
  "#525252",
  "#737373",
  "#969696",
  "#bdbdbd",
  "#d9d9d9",
  "#f0f0f0"
];
const charcoal = "white";
const axisColor = "#aaa";
const gridColor = 'rgba(2,2,2,0.5)';
const scatterColor = "#252525";

// Typography
const sansSerif =
  "'Gill Sans', 'Gill Sans MT', 'Ser­avek', 'Trebuchet MS', sans-serif";
const letterSpacing = "normal";
const fontSize = 14;

// Layout
const baseProps = {
  width: 450,
  height: 300,
  padding: 50,
  colorScale: colors
};

// Labels
const baseLabelStyles = {
  fontFamily: sansSerif,
  fontSize,
  letterSpacing,
  padding: 10,
  fill: charcoal,
  stroke: "transparent"
};
const centeredLabelStyles = Object.assign({ textAnchor: "middle" }, baseLabelStyles);

// Strokes
const strokeLinecap = "round";
const strokeLinejoin = "round";

// Put it all together...
const theme = {
  area: Object.assign(
    {
      style: {
        data: {
          fill: charcoal
        },
        labels: centeredLabelStyles
      }
    },
    baseProps
  ),
  axis: Object.assign(
    {
      style: {
        axis: {
          fill: "transparent",
          stroke: axisColor,
          strokeWidth: 1,
          strokeLinecap,
          strokeLinejoin
        },
        axisLabel: Object.assign({}, centeredLabelStyles, {
          padding: 25
        }),
        grid: {
          fill: "none",
          stroke: gridColor,
          pointerEvents: "visible"
        },
        ticks: {
          fill: "transparent",
          size: 1,
          stroke: "transparent"
        },
        tickLabels: baseLabelStyles
      }
    },
    baseProps
  ),
  bar: Object.assign(
    {
      style: {
        data: {
          fill: charcoal,
          padding: 8,
          strokeWidth: 0
        },
        labels: baseLabelStyles
      }
    },
    baseProps
  ),
  candlestick: Object.assign(
    {
      style: {
        data: {
          stroke: charcoal,
          strokeWidth: 1
        },
        labels: centeredLabelStyles
      },
      candleColors: {
        positive: "#ffffff",
        negative: charcoal
      }
    },
    baseProps
  ),
  chart: baseProps,
  errorbar: Object.assign(
    {
      borderWidth: 8,
      style: {
        data: {
          fill: "transparent",
          stroke: charcoal,
          strokeWidth: 2
        },
        labels: centeredLabelStyles
      }
    },
    baseProps
  ),
  group: Object.assign(
    {
      colorScale: colors
    },
    baseProps
  ),
  line: Object.assign(
    {
      style: {
        data: {
          fill: "transparent",
          stroke: "blue",
          strokeWidth: 2
        },
        labels: centeredLabelStyles
      }
    },
    baseProps
  ),
  pie: {
    style: {
      data: {
        padding: 10,
        stroke: "transparent",
        strokeWidth: 1
      },
      labels: Object.assign({}, baseLabelStyles, { padding: 20 })
    },
    colorScale: colors,
    width: 400,
    height: 400,
    padding: 50
  },
  scatter: Object.assign(
    {
      style: {
        data: {
          fill: scatterColor,
          stroke: "transparent",
          strokeWidth: 0
        },
        labels: centeredLabelStyles
      }
    },
    baseProps
  ),
  stack: Object.assign(
    {
      colorScale: colors
    },
    baseProps
  ),
  tooltip: {
    style: Object.assign({}, centeredLabelStyles, {
      padding: 5,
      pointerEvents: "none"
    }),
    flyoutStyle: {
      stroke: charcoal,
      strokeWidth: 1,
      fill: "#f0f0f0",
      pointerEvents: "none"
    },
    cornerRadius: 5,
    pointerLength: 10
  },
  voronoi: Object.assign(
    {
      style: {
        data: {
          fill: "transparent",
          stroke: "transparent",
          strokeWidth: 0
        },
        labels: Object.assign({}, centeredLabelStyles, {
          padding: 5,
          pointerEvents: "none"
        }),
        flyout: {
          stroke: charcoal,
          strokeWidth: 1,
          fill: "#f0f0f0",
          pointerEvents: "none"
        }
      }
    },
    baseProps
  ),
  legend: {
    colorScale: colors,
    gutter: 10,
    orientation: "vertical",
    titleOrientation: "top",
    style: {
      data: {
        type: "circle"
      },
      labels: baseLabelStyles,
      title: Object.assign({}, baseLabelStyles, { padding: 5 })
    }
  }
};
