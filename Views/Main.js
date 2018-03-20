/**
 * Caura mobile Application
 * @MomenKamal
 MAIN.JS: main application page, offering all interacting with single player profiles. The page offers:
  - BLE connectivity (from Sensors.js)
  - infographic display and interaction (form Extra.js and Chart.js)
*/
import React, { Component } from 'react';
import { ScrollView,AsyncStorage,Button,Alert,Platform, View, Text,TextInput,TouchableHighlight,TouchableOpacity,TouchableWithoutFeedback, StyleSheet,Image,Dimensions } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';

import {VictoryTooltip,VictoryVoronoiContainer,VictoryCursorContainer,VictoryScatter,VictoryAnimation,Bar,VictoryPie, VictoryBar,VictoryChart, VictoryArea, VictoryAxis, VictoryLine,VictoryLabel, VictoryStack,VictoryTheme } from "victory-native";

//import Orientation from 'react-native-orientation';
import FontAwesome, { Icons } from "react-native-fontawesome"
import base64 from 'base-64';

import DateTimePicker from 'react-native-modal-datetime-picker';

import Svg,{
    Path, G,Line
} from 'react-native-svg';


console.disableYellowBox = true;





import './global.js'
import June from './June_Logo.js';
import Donut from './Donut.js';

 export class MainScreen extends Component {
   static navigationOptions = {
     title: 'You Today',
   };

   _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {

                    //  console.log(  date.toString().split('') )
                    // console.log(  date.toString().slice(16,21) )

                    global.ProfilelogsTime[this.key]=date.toString().slice(16,21); //format datetime to time (hour:min)

                    this.setState({enable:true})

                    this.store.logsTime[global.ProfileName] =  global.ProfilelogsTime;


                  //  console.log("shot")

                    //  console.log(global.ProfilelogsTime)

                  //  console.log(this.store.logsTime[global.ProfileName])
                  //    console.log(this.state.logTime)


                  this.setState({logTime: this.store.logsTime[global.ProfileName]})


                    this._saver().done();


                  //  console.log(this.key)
                    Alert.alert('Time has been picked: ',date.toString().slice(16,21));

                      this._hideDateTimePicker();
  };



  getIndex(value, arr) {
      for(var i = 0; i < arr.length; i++) {
          if(arr[i] === value) {
              return i;
          }
      }
      return -1; //to handle the case where the value doesn't exist
      }

  constructor() {
    super()
    this.manager = new BleManager()
    console.log( global.ProfilesamplesTime)
    temp = this.getIndex("",global.ProfilelogsTime)
    console.log(temp)
    temp=temp==-1?6:temp; //decides which logs to show

    temp1=temp==6?false:true; //connect button enable
    console.log(temp)

    this.state = {info: "Ready...", values: {},connection: false,tryingtoCon:false,
    mode:1, //switch between activity and recovery Donuts
    type:0, // swith between donuts and graph

    dataValue:  global.ProfilesamplesValue,
    dataTime:   global.ProfilesamplesTime,
    logValue:   global.ProfilelogsValue,
    logTime:    global.ProfilelogsTime,
     isDateTimePickerVisible: false,
     stage:temp,    //progress in the code, reflected by the logs - new user, stage = 0. pretraining is stage 2, post training is stage 4 and first recovery id stage 5, second recovery stage 6
     enable:temp1,  //connect button enable-> whether you can connect your device or not
     attention:6,
     ready:false, //only true after the device is connected and test type selected
  }

// this are transient variables. The are used to update the state variables (this.stage updates this.state.stage)
  this.attention=null;
  this.stage=null;
  this.testOption =0;
  this.key="empty"
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
    this.address=null;

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
   this.setState({info: "ERROR: " + message,connection:false,ready:false})

 }

// Important! function that recieves the input from the device
 updateValue(key, value) {
   if(this.state.ready){// ready has been defined

   timee= new Date().toString().slice(16,21); // extracts hours and minutes only
   buff = timee.split(':')
   var Num = parseInt(buff[0] ,10) + parseInt(buff[1] ,10)/60
   Num = Num.toFixed(2)
   Num = parseFloat(Num)

   o =  this.ParserCon(value); // o is the processed input from the device
   console.log(o)
    if(!this.testOption){
    o=  parseFloat(this.random(80,250).toFixed(2));}
    else {
    o= parseFloat(global.ProfilesamplesValue[0]+ this.random(-5,5).toFixed(2));

   }
   this.setState({values: {...this.state.values, [key]: o}})
   Alert.alert("Test complete!")

   this.setState({attention:this.attention}); this.setState({stage:this.stage})

   global.ProfilesamplesValue[this.testOption] = o;
   global.ProfilesamplesTime[this.testOption]  =   Num;
   this.store.samplesTime[global.ProfileName]  =  global.ProfilesamplesTime;
   this.store.samplesValue[global.ProfileName] = global.ProfilesamplesValue;
   this.setState({dataTime: this.store.samplesTime[global.ProfileName],dataValue: this.store.samplesValue[global.ProfileName]})

   global.ProfilelogsTime[this.address]=timee;
   this.store.logsTime[global.ProfileName] =  global.ProfilelogsTime;
   this.setState({logTime: this.store.logsTime[global.ProfileName]})
   this._saver().done();


  this.stopScanAndDisconnect()
}
 }

  componentDidMount(){

  }

  _saver = async() =>{


    try {
  await AsyncStorage.mergeItem('store', JSON.stringify(this.store));

  this.refs.scrollView1.scrollToEnd({animated: true})
//    console.log(this.store)


} catch (error) {
  // Error saving data
}

  }

  componentWillUnmount() { // not working



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
               Alert.alert('Connected')
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
    this.setState({connection:false})
    this.setState({ready:false})
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

 ParserCon(raw)  //converts base64 to string (BLE device sends data in base64)
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

  random(min,max){

    return (min + Math.random() * (max - min))/100;


  }

  render() {


    const { navigate } = this.props.navigation;

    if(this.state.ready){

    button =  <TouchableOpacity onPress={()=>{
           this.disconnect()
                  }}
    style={[styles.button, {backgroundColor:'#32cd32', }]}>
       <Text style={styles.title}>Listening...</Text>
      </TouchableOpacity>
    }

     // else{
     //
     //   if(this.state.tryingtoCon){
     //
     //     button = <TouchableOpacity onPress={()=>{
     //            this.stopScanAndDisconnect()
     //                   }}
     //        style={[styles.button, {backgroundColor:'red', }]}>
     //        <Text style={styles.title}>Cancel</Text>
     //       </TouchableOpacity>
     //   }
     // }

       else{
         button =  <TouchableHighlight onPress={()=>{
        if(this.state.enable){

             if(!this.state.connection)
           {
               this.scanAndConnect()
           }
           else{

           timee= new Date().toString().slice(16,21);
           buff = timee.split(':')
          var Num = parseInt(buff[0] ,10) + parseInt(buff[1] ,10)/60
           Num = Num.toFixed(2)
           Num = parseFloat(Num)
           console.log(Num)

           Alert.alert(
             'Test',
             'Please choose your test option',
             [
               {text: 'Recovery', onPress: () => {
                // this.setState({enable:false})
                 if(this.state.stage>=5){
                    this.testOption=3;  ;this.address = 5;
                    this.stage =6;
                    this.attention=6;

                //    this.setState({attention:this.attention}); this.setState({stage:this.stage})

                 }
                 else {
                     this.testOption=2;  this.address =4;
                     this.stage =5;
                     this.attention=6;

                     this.setState({attention:this.attention}); this.setState({stage:this.stage})
                 }





                 this.setState({ready:true})
                 Alert.alert("Press test button on the device")




                  this.refs.scrollView1.scrollToEnd({animated: true})

                }  },
             {text: 'Post-workout', onPress: () => {
               this.setState({enable:false})

               this.testOption=1;  this.address = 3;
               this.stage =4;
               this.attention=2;



               this.setState({ready:true})
                Alert.alert("Press test button on the device")

            //    this.scanAndConnect()

                this.refs.scrollView1.scrollToEnd({animated: true})

              }

           },
             {text: 'Pre-workout', onPress: () => {
               this.setState({enable:false})

                 this.testOption=0; ;this.address = 0;
                 this.stage =2;
                 this.attention=1;


            this.setState({ready:true})
             Alert.alert("Press test button on the device")

this.refs.scrollView1.scrollToEnd({animated: true})


             }},

             ],
             { cancelable: true}
           )

this.refs.scrollView1.scrollToEnd({animated: true})
         }

       }
       else {Alert.alert('Enter training time')}
     }
   }
            style={[styles.button,{backgroundColor:this.state.enable?"#F16651":'#F9C1B3'}]}>
            <Text style={styles.title}>{this.state.connection?'Test':'Connect'}</Text>
           </TouchableHighlight>

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
             height= {250}
             width= {250}
             percent = {global.ProfileActivity}
             fontsize= {36}
             fontColor = "black"
             normalColor = "#F16651"
             backColor = "#ddd"
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
            height= {250}
            width= {250}
            percent = {global.ProfileRecovery}
            fontsize= {36}
            fontColor = "black"
            normalColor = "#F16651"
            backColor = "#ddd"
            warningColor ="#c1503f"
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
      justifyContent: 'center',
  }}>

 <VictoryChart  width={380} height={220}
 domain={{x: [0, 24],y: [0, 10]}}
domainPadding={{x: [30, 0], y: 5}}

 theme={theme}

style={{
    parent: {
      borderColor: "red"
    }
  }}



  containerComponent={<VictoryVoronoiContainer voronoiDimension="x"/>}
 >
  <VictoryAxis domain={[0, 24]} tickValues={[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]}
  tickFormat={
                (x) => {
                  if(!(x%3)){
                   hour = Math.floor(x)
                   min = ((x-Math.floor(x))*60)
                   min = ("0" + min).slice(-2);
                   return hour.toString()+":"+min.toString()
                 }
                }
              }
                 />


  <VictoryAxis dependentAxis
               domain={[-10, 15]}
               offsetX={50}
               orientation="left"
               standalone={false}
               style={axisOne}
             />

 <VictoryScatter
          size={10}
            animate={{ duration: 1000 }}
          labels={(d) => `${Math.floor(d.x)}:${("0" +((d.x-Math.floor(d.x))*60)).slice(-2)}->\n${d.y} ng/ml`}
          labelComponent={<VictoryTooltip orientation={(d)=> d.y>7?"bottom":"top"} flyoutStyle={{fill: "#F9C1B3", stroke:axisColor}}/>}
          style={ {data: { stroke: "#F16651" }}}
        size={(datum) => {return datum.y? 8: 1 }}
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
            animate={{ duration: 1000 }}
              style={ {data: { stroke: "#F16651" }}}
                interpolation={"linear"}

            data={[

              { x:   this.state.dataTime[0], y:   this.state.dataValue[0] },
              { x:   this.state.dataTime[1], y:   this.state.dataValue[1] },
              { x:   this.state.dataTime[2], y:   this.state.dataValue[2] },
              { x:   this.state.dataTime[3], y:   this.state.dataValue[3] },


            ]}




          />

 </VictoryChart>

        </View>


    }

var buffer2=0;
      return (


        <View style={{
          flex:1,
          padding:0,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor:'#ffffff'}}>

        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          mode="time"
        />
                <View style={{
                  height:185,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  backgroundColor: 'transparent',
                  alignSelf:'center',

                  marginBottom:0,
                }}>
                <Image resizeMode='contain' style={{
                  height:185,

                  position: 'absolute',
                  justifyContent: 'center',}}
                  source={require('../img/header.png')} />

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

                    flex:2.8,
                   alignSelf: 'stretch',
                  alignItems: 'center',
                  flexDirection: 'column',
                  backgroundColor:'transparent'}} >



                      <TouchableOpacity onPress={()=>{
                      if( this.state.type)
                           this.setState({type:0})
                           else
                            this.setState({type:1})
                         }}
                         onLongPress={()=>{}}
                      >
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
                 width:200,
                 flex:1,
                 alignItems: 'center',
                justifyContent: 'center',
                backgroundColor:'transparent'}} >

                                <View style={{
                                  flex:1,
                                flexDirection:'column',
                                alignItems: 'center',

                                justifyContent: 'center',
                              backgroundColor:'transparent'}} >

                                <TouchableOpacity
                                          onPress={()=>{
                                  this.setState({type:1})
                                     this.setState({mode:1})

                              }}
                                 style={[styles.select, {backgroundColor: !this.state.mode?"#F9C1B3":"#F16651"}]}>
                                 <FontAwesome style={{fontSize: 24,marginBottom:2,}}>{Icons.bolt}</FontAwesome>

                                </TouchableOpacity>
                                   <Text style={styles.text}>Strain</Text>
                                </View>

                                <View style={{
                                  flex:1,
                                flexDirection:'column',
                                alignItems: 'center',


                                justifyContent: 'center',
                                  backgroundColor:'transparent'}} >


                                <TouchableOpacity onPress={()=>{
                                  this.setState({type:1})
                                     this.setState({mode:0})

                              }}
                                 style={[styles.select, {backgroundColor: !this.state.mode?"#F16651":"#F9C1B3"}]}>
                                 <FontAwesome style={{fontSize: 24,marginBottom:2,}}>{Icons.moonO}</FontAwesome>

                                </TouchableOpacity>
                                <Text style={styles.text}>Recovery</Text>
                                </View>

                          </View>




                        <View style={{flex: 2,

                          borderTopWidth:2,
                          borderTopColor: 'grey',
                          marginTop:5,
                      backgroundColor:'transparent',
                      alignSelf:'stretch'}}>
                                  <Svg
                                                   height="1000"
                                                   width="100"
                                                   style={{position:'absolute', backgroundColor:'transparent',alignSelf:'flex-start'}}
                                               >
                                               <Line
                                                      x1="31"
                                                      y1="15"
                                                      x2="31"
                                                      y2="1000"
                                                      stroke="grey"
                                                      strokeDasharray="1,5"
                                                      strokeLinecap="round"
                                                      strokeWidth="2"
                                                  />

                                              </Svg>

                        <ScrollView  ref="scrollView1"
                         keyboardShouldPersistTaps='always'>

                         <View style={{flex: 1,
                         alignItems: 'center',

                         backgroundColor:'transparent' }}>


                           {Object.keys(this.state.logTime).map((key) => {
                             buffer2 =key+1
                             if(key<this.state.stage)
                        return (
                        <View   key={"V1"+key}
                        style={{flex: 1,
                           flexDirection: 'row',
                           padding:7,
                          borderBottomWidth: 0.5,
                          borderBottomColor: '#aaa',
                           }}>
                            <TouchableOpacity key={key}
                            onPress={()=>{ this.key = key; if((key==1||key==2)) this._showDateTimePicker();

                            //  console.log(this.key)

                             }}

                             style={{
                            flex:1,
                            flexDirection:'row',
                            }} >
                           <View  key={"V2"+key}style={{flex:1,  alignItems: 'center',   justifyContent: 'center'  }}>

                          <FontAwesome  key={key} style={{fontSize: this.state.attention == key?40:30, color:this.state.attention == key?'teal':"#76bcbc",color:!(key==1||key==2)?'#F16651':"teal",}}>{Icons.circle}</FontAwesome>
                           </View>

                          <View  key={"V3"+key} style={{flex:3,  alignItems: 'flex-start',   justifyContent: 'space-around', paddingLeft:10  }}>
                          <Text  key={"T"+key}>{  this.state.logTime[key]}</Text>
                          </View>
                          <View  key={"V4"+key} style={{ flex:3, alignItems: 'flex-start',   justifyContent: 'space-around'}} >
                          <Text  key={"V"+key}> { this.state.logValue[key]}</Text>
                          </View>
                          </TouchableOpacity>
                       </View>
                     )})}

                          { <View   key={"V1"}
                             style={{flex: 1,
                                flexDirection: 'row',
                                padding:7,
                               borderBottomWidth: 0.5,
                               borderBottomColor: '#aaa',
                                }}>


                                <View  key={"V2"}
                                style={{flex:1,  alignItems: 'center',   justifyContent: 'center'  }}>
                                <FontAwesome  key={buffer2} style={{fontSize:this.state.enable?40:30, color:this.state.enable?"#F16651":'#F9C1B3'}}>{Icons.circle}</FontAwesome>
                                </View>

                                <View  key={"V3"} style={{flex:6,  alignItems: 'flex-start',   justifyContent: 'space-around'  }}>
                                {button}
                                </View>

                             </View>
                           }
                     </View>

                         </ScrollView>

                      </View>

                      <View style={{flex: 1}}>
                      {Object.keys(this.sensors).map((key) => {
                        return <View key={key}>
                                <Text style={styles.title} key={"t"+key}>
                                 {this.sensors[key] + ": " } </Text>
                                <Text style={styles.value} key={"v"+key}> {(this.state.values[this.notifyUUID(2,key)] || "0")+" mM"}</Text>
                                </View>
                      })}
                      </View>

                      <View style={{flex:0.45,alignItems:'center', justifyContent:"center",backgroundColor:'transparent',alignSelf:'stretch'}}>

                              <View style={{flex:1,alignItems:'center', justifyContent:"center",backgroundColor:'transparent'}}>
                                    {this.state.tryingtoCon && <Bars size={8} color="#F16651"  /> }
                                    {this.state.ready && <Pulse  size={20} color="#F16651" /> }

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
     width:250,
     padding: 10,
     backgroundColor:'#F16651',
     borderRadius:30,
     borderWidth: 0,
     borderColor: '#fff',
     alignItems: 'center',

  },
  select: {
       width:40,
       margin:0,
       height:40,
       padding: 8,
       backgroundColor:"grey",
       borderRadius:20,
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
    color: 'black',
    fontSize: 12,
    textAlign:'center',
    fontFamily: 'SF Pro Display',
    alignSelf:'center',
 },


})

const  axisOne = Object.assign( {
      grid: {
        stroke: (tick) =>
           gridColor,
        strokeWidth: 0
      },
      axis: { stroke: "transparent", strokeWidth: 0 },
      ticks: {

        size: 0,
        stroke: "black"
      },
      tickLabels: {
        fill: "black",
        fontFamily: "inherit",
        fontSize: fontSize,
        angle:0,


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
const charcoal = "black";
const axisColor = "black";
const gridColor = 'rgba(200,200,200,0.5)';
const scatterColor = "#F9C1B3";

// Typography
const sansSerif =
  "'Gill Sans', 'Gill Sans MT', 'Ser­avek', 'Trebuchet MS', sans-serif";
const letterSpacing = "normal";
const fontSize = 12;

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
const tiltbaseLabelStyles = {
  fontFamily: sansSerif,
  fontSize,
  letterSpacing,
  padding: 10,
  fill: charcoal,
  stroke: "transparent",
  angle:45,
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

          size:(tick) => {
            const tickSize =
              tick % 3 === 0 ? 6: 3;
            return tickSize;
          },
          stroke: "black"
        },



        tickLabels: tiltbaseLabelStyles
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
