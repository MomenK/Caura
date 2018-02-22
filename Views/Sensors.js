import React, { Component } from 'react';
import { AsyncStorage,Button,Alert,Platform, View, Text,TextInput,TouchableHighlight,TouchableOpacity,TouchableWithoutFeedback, StyleSheet,Image,Dimensions } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
//import Orientation from 'react-native-orientation';
import base64 from 'base-64';


import './global.js'
import June from './June_Logo.js';

 export class SensorsComponent extends Component {
   static navigationOptions = {
     title: 'You Today',
   };

  constructor() {
    super()
    this.manager = new BleManager()
    this.state = {info: "Ready...", values: {},connection: false,tryingtoCon:false}
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
       <Text style={styles.text}>Disconnect</Text>
      </TouchableOpacity>


    }
    else{

       if(this.state.tryingtoCon){

         button = <TouchableOpacity onPress={()=>{
                this.stopScanAndDisconnect()
                       }}
            style={[styles.button, {backgroundColor:'red', }]}>
            <Text style={styles.text}>Disconnect</Text>
           </TouchableOpacity>


       }
       else{
         button =  <TouchableHighlight onPress={()=>{
                this.scanAndConnect()
              }}
            style={styles.button}>
            <Text style={styles.text}>Connect</Text>
           </TouchableHighlight>

     }
    }


      return (
  <View style={{flex: 1, flexDirection: 'column'}}>

              <View   style={{
                flex: 1,
                marginTop:20,marginBottom:70,
                justifyContent: 'center',
                alignSelf:'center',
              }}>
              <June
              height="80"
              width  = "80"
              scale = "0.3"
              fill = "#F16651"
              />
              </View>


          <View style={[styles.container,{flex: 2}]}>
          {Object.keys(this.sensors).map((key) => {
            return <View key={key}>
                    <Text style={styles.title} key={"t"+key}>
                     {this.sensors[key] + ": " } </Text>
                    <Text style={styles.value} key={"v"+key}> {(this.state.values[this.notifyUUID(2,key)] || "0")+" mM"}</Text>
                    </View>
          })}
          </View>

          <View style={{flex: 1,margin:30}}>

          {button}



        <View style={{alignItems:'center'}}>
      <Text> {"Status: "} <Text>{this.state.info}</Text> </Text>
      {this.state.tryingtoCon && <Bars size={10} color="#F16651" style={{alignSelf: 'center'}} /> }
      {this.state.connection && <Pulse  size={10} color="#F16651" style={{alignSelf: 'center'}} /> }

      </View>

        </View>
        </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:2,
    padding: 60,
  //  alignItems: 'center'

  },
  button: {
     height: 44,
     padding: 10,
     backgroundColor:'#F16651',
     borderRadius:30,
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
  // position:'absolute',
   alignSelf:'baseline',
   color: '#F16651',
   fontWeight: 'bold',
   fontSize: 20,
   textAlign:'left'
 },
 text: {
    color: 'white',
    fontSize: 16,
    textAlign:'center',
    fontFamily: 'SF Pro Display',
    alignSelf:'center',
 },
})



// <View style={styles.canvasContainer}>
// <Image  resizeMode='contain' style={{width: this.win.width,height: this.win.height}}
// source={require('../img/Logo_alpha.png')} />
//   </View>
