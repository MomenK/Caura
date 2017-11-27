import React, { Component } from 'react';
import { Button,Alert,Platform, View, Text,TextInput,TouchableHighlight,TouchableWithoutFeedback, StyleSheet,Image,Dimensions } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
//import Orientation from 'react-native-orientation';
import base64 from 'base-64';
import buffer from 'buffer'; //Brower based! JS6

import {
  TabNavigator,
} from 'react-navigation';


 class SensorsComponent extends Component {
   static navigationOptions = {
     title: 'You Today',
   };

  constructor() {
    super()
    this.manager = new BleManager()
    this.state = {info: "Ready...", values: {},connection: false,deviceName:"Project Zero"}
    this.prefixUUID = "f00011"
    this.suffixUUID = "-0451-4000-b000-000000000000"
    this.sensors = { //This need to be changed to have each chemical in a different service
      1: "Cortisol",
      2: "Testosterone"

    }

this.win = Dimensions.get('window');


  }

  serviceUUID(num) {
    return this.prefixUUID + num + "0" + this.suffixUUID
  }

  notifyUUID(ser,num) {
    return this.prefixUUID + ser + num + this.suffixUUID
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

 scanAndConnect() {
   this.manager.startDeviceScan(null,
                                null, (error, device) => {
     this.info("Scanning...")
     console.log(device)

     if (error) {
       this.error(error.message)
      return
     }

     if (device.name === this.state.deviceName ) {
       this.info("Connecting device")
       this.manager.stopDeviceScan()
       device.connect()
         .then((device) => {
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
                this.info("Dicounted due to reasons no one knows!")
                return
            }
            this.info("Disconnected..")

          })
    }
  }

 ParserCon(raw)
  {
    value = raw.slice(0,4); //4 depends on the length of notification from BLE
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
    console.log(m);
    console.log(num);
  return  (num);
  }

  render() {
    const { navigate } = this.props.navigation;
      return (
  <View style={{flex: 1, flexDirection: 'column'}}>
        <View style={styles.canvasContainer}>
        <Image  resizeMode='contain' style={{width: this.win.width,height: this.win.height}}
        source={require('./img/Logo_alpha.png')} />
          </View>

          <View style={styles.container}>


          {Object.keys(this.sensors).map((key) => {
            return <View key={key}>
                    <Text style={styles.title} key={"t"+key}>
                     {this.sensors[key] + ": " } </Text>
                    <Text style={styles.value} key={"v"+key}> {this.state.values[this.notifyUUID(2,key)]}</Text>
                    </View>
          })}


          {this.state.connection ? (
            <TouchableWithoutFeedback >
                <View style={styles.buttonGreen}>
                <Text style={styles.buttonText}>Connected</Text></View>
         </TouchableWithoutFeedback>
          ):(
             <TouchableHighlight  onPress={this.scanAndConnect.bind(this)} underlayColor="#F5FCFF">
                 <View style={styles.button}>
                 <Text style={styles.buttonText}>Press to Connect</Text></View>
          </TouchableHighlight>
        )}

      <Text> {"Status: "} <Text>{this.state.info}</Text> </Text>

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
    marginTop:30,
    marginBottom: 15,
    width: 260,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#2196F3',

  },
  buttonGreen: {
    marginTop:30,
    marginBottom: 15,
    width: 260,
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


class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
      <Text>Welcome</Text>
      <TextInput
          style={{height: 40}}
          placeholder="Enter your KEYA unique ID"
          onChangeText={(text) => this.setState({text})}
        />
        <Button
          title="Register"
          onPress={() =>
            navigate('Sensors')
          }
        />
        </View>

    );
  }
}



const AwesomeProject = TabNavigator({
  Home: { screen: HomeScreen },
  Sensors: { screen: SensorsComponent },
},{
  tabBarPosition: 'bottom',
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: 'white',
    indicatorStyle:{
       backgroundColor:'red',

    }
  },
});

export default class App extends React.Component {
  render() {
    return <AwesomeProject/>;
  }
}
