/**
 * Caura mobile Application
 * @MomenKamal

 PROFILES.JS: The main interface for team management, allowing exploring players, adding new player and deleting existing players
*/

import React, { Component } from 'react';
import {Picker,ActivityIndicator ,AsyncStorage,ScrollView, StatusBar,Button,Alert,Platform, View, Text,TextInput,TouchableHighlight,TouchableWithoutFeedback, TouchableOpacity,StyleSheet,Image,Dimensions } from 'react-native';
import FontAwesome, { Icons } from "react-native-fontawesome";
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
import ModalDropdown from 'react-native-modal-dropdown';

import './global.js'
import Donut from './Donut.js';

export class ProfilesScreen extends Component {




  constructor ()
  {

    super();




this.store=""

  this.state =   {

   isLoading:true,
   adding:false,

    text:{
      1:"",
      2:"",
      3:"",
      },
    }
  }





  _saver = async() =>{

    this.setState({
     isLoading: false
    })

    try {
  await AsyncStorage.setItem('store', JSON.stringify(this.store));
    console.log(this.store)


} catch (error) {
  // Error saving data
}

  }



_loader = async() =>{
  this.setState({
   isLoading: false
  })


  try{
    this.store = await  AsyncStorage.getItem('store');
    console.log(this.store)
    this.store = JSON.parse(this.store)
              if(!this.store){
                Alert.alert('database has been reset')
                this.store ={

                        surname:{
                          "Fosca":"Mirata",
                          "Muru":"Muthu",
                          "Momen":"Kamal",
                          "Alistar":"Margini",},
                        gender:{
                          "Fosca":"Female",
                          "Muru":"Male",
                          "Momen":"Male",
                          "Alistar":"Male",},
                        age:{
                          "Fosca":"30",
                          "Muru":"40",
                          "Momen":"23",
                          "Alistar":"26",},
                        height:{
                          "Fosca":"159",
                          "Muru":"166",
                          "Momen":"200",
                          "Alistar":"190",},
                        weight:{
                          "Fosca":"59",
                          "Muru":"80",
                          "Momen":"75",
                          "Alistar":"78",},

                        activity:{
                          "Fosca":86,
                          "Muru":50,
                          "Momen":95,
                          "Alistar":12},
                        recovery:{
                          "Fosca":75,
                          "Muru":89,
                          "Momen":20,
                          "Alistar":91,},
                        samplesValue:{
                          "Fosca":[6.2, 8.7, 3.2, 0.9],
                          "Muru": [5.9, 7.8, 1.5, 1],
                          "Momen":[5.6, 9, 5, 3],
                          "Alistar":[8.1, 8.2, 2.2, 0.9],
                      },
                        samplesTime:{
                          "Fosca":[9, 10, 14.5, 18],
                          "Muru":[9, 10,  14.5, 18],
                          "Momen":[9, 10,  14.5, 18],
                          "Alistar":[9, 10,  14.5, 18],

                        },
                        logsValue:{
                          "Fosca":["Sampled","Started training","Finished training","Sampled","Recovery","Recovery"],
                          "Momen":["Sampled","Started training","Finished training","Sampled","Recovery","Recovery"],
                          "Muru":["Sampled","Started training","Finished training","Sampled","Recovery","Recovery"],
                          "Alistar":["Sampled","Started training","Finished training","Sampled","Recovery","Recovery"],

                        },
                        logsTime:{
                          "Fosca":["8:52","9:00","10:00","10:15","14:30","18:00"],
                          "Momen":["8:55","9:00","10:00","10:12","14:30","18:00"],
                          "Muru":["8:59","9:00","10:00","10:05","14:30","18:00"],
                          "Alistar":["9:00","9:00","10:00","10:10","14:30","18:00"],

                        },
                      }


                  //    try {
                      await AsyncStorage.setItem('store', JSON.stringify(this.store));
                  //    console.log(this.store)
                  //  }
                  //  catch(error){
                //    console.log(error)

                //    }
              }
   this.setState({
    isLoading: true
   })

  }
  catch(error){
      console.log(error)
      }

}

  componentWillMount() {

this._loader().done()

  }


  render() {

    const { navigate } = this.props.navigation;
    if (this.state.isLoading) {
      if(!this.state.adding)
      {
        List=   Object.keys(this.store.height).map((key) => {
            return <TouchableOpacity   key={key}  onPress={()=>{

                      global.ProfileName=[key]
                      global.ProfileSurname=this.store.surname[key]
                      global.ProfileGender=this.store.gender[key]
                      global.ProfileAge=this.store.age[key]
                      global.ProfileHeight=this.store.height[key]
                      global.ProfileWeight=this.store.weight[key]

                      global.ProfileActivity=this.store.activity[key]
                      global.ProfileRecovery=this.store.recovery[key]

                      global.ProfilesamplesTime=this.store.samplesTime[key]
                      global.ProfilesamplesValue=this.store.samplesValue[key]

                      global.ProfilelogsTime=this.store.logsTime[key]
                      global.ProfilelogsValue=this.store.logsValue[key]

                      console.log(  global.ProfilesamplesTime)

                      navigate('Main')
                    }}

                    onLongPress={()=>{

                      Alert.alert(
                          'Warning!',
                          'Are you sure you want to delete '+[key]+"'s Profile?",
                          [
                            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                            {text: 'OK', onPress: () => {

                              delete  this.store.surname[key]
                              delete  this.store.gender[key]
                              delete  this.store.age[key]
                              delete  this.store.height[key]
                              delete  this.store.weight[key]

                              delete  this.store.activity[key]
                              delete  this.store.recovery[key]

                              delete  this.store.samplesTime[key]
                              delete  this.store.samplesValue[key]
                              delete  this.store.logsTime[key]
                              delete  this.store.logsValue[key]

                                this._saver().done()
                                this._loader().done()



                          }    },
                          ],
                          { cancelable: false }
                        )
                    }}
                    style={styles.profile}>


                   <View style={{flex: 1,
                      flexDirection: 'row',
                      }}>
                      <View style={{

                      alignItems: 'center',
                      flexDirection: 'row',
                    backgroundColor:'transparent'}} >

                    <FontAwesome style={{fontSize: 35, color:"white",margin:20}}>{Icons.userCircle}</FontAwesome>


                    </View>

                       <View style={{width: 180,  alignItems: 'flex-start',   justifyContent: 'space-around'  }} >
                      <Text style={styles.text} key={"t"+key} >
                      {[key] + " " + this.store.surname[key]}</Text>
                      <Text style={[styles.text,{fontSize:12}]} key={"t"+key} >
                      {this.store.age[key] + ", " + this.store.height[key]+ " cm"}</Text>
                      </View>

                      <View style={{width: 100,
                      alignItems: 'center',
                      flexDirection: 'row',
                    backgroundColor:'transparent'}} >

                                  <Donut
                                 key={"A"+key}
                                 height= {44}
                                 width= {44}
                                 percent = {this.store.activity[key]}
                                 fontsize= {10}
                                 fontColor = "white"
                                 normalColor = "#F16651"
                                 backColor = "#aaa"
                                 warningColor ="#c1503f"
                                 warningLevel = {30}
                                   />

                                   <Donut
                                  key={"R"+key}
                                  height= {44}
                                  width= {44}
                                  percent = {this.store.recovery[key]}
                                  fontsize= {10}
                                  fontColor = "white"
                                  normalColor = "#13afaf"
                                  backColor = "#aaa"
                                  warningColor ="teal"
                                  warningLevel = {30}
                                    />
                       </View>
                       </View>

                      </TouchableOpacity >
                  })
      }
      else {

        List=   <View  style={{flex: 1}}>
            <View  style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>


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
                  placeholder="Surname"
                  placeholderTextColor='#fff'
                  selectionColor='#F16651'
                  underlineColorAndroid="transparent"
                  onChangeText={(text) => {this.setState({text:{...this.state.text,2:text}})
                  }}
                  value={this.state.text[2]}
                  />


                <ModalDropdown   style={styles.Input} textStyle={styles.text} dropdownTextStyle={{fontSize:20}} dropdownStyle={{width:100, height:100}}  defaultValue="Gender" options={['Male', 'Female']}


                onSelect={(itemValue, itemIndex) =>{

                  this.setState({text:{...this.state.text,3:itemValue==="0"?"Male":"Female"}})  }}
                />

            </View>

            <View  style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>


                  <TextInput ref="NameInput"
                  style={styles.Input}
                  placeholder="Age"
                  placeholderTextColor='#fff'
                  selectionColor='#F16651'
                  underlineColorAndroid="transparent"
                  onChangeText={(text) => {this.setState({text:{...this.state.text,4:text}})
                  }}
                  value={this.state.text[4]}
                  />



                  <TextInput
                  style={styles.Input}
                  placeholder="Height"
                  placeholderTextColor='#fff'
                  selectionColor='#F16651'
                  underlineColorAndroid="transparent"
                  onChangeText={(text) => {this.setState({text:{...this.state.text,5:text}})
                  }}
                  value={this.state.text[5]}
                  />

                  <TextInput
                  style={styles.Input}
                  placeholder="Weight"
                  placeholderTextColor='#fff'
                  selectionColor='#F16651'
                  underlineColorAndroid="transparent"
                  onChangeText={(text) => {this.setState({text:{...this.state.text,6:text}})
                  }}
                  value={this.state.text[6]}
                  />

                  </View>
              </View>

      }
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
                    marginBottom:0,
                  }}>
                        <View style={{
                          position:'absolute',
                          marginTop:20,
                        }}>
                        <Text style={styles.title} >Team</Text>
                        </View>

                        <View style={{
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                        }}>
                        <TouchableHighlight onPress={()=>{
                            if(this.state.adding) this.setState({adding:false})
                            else
                          navigate('SignIn')
                        }}>
                        <FontAwesome style={{fontSize: 15, color:"white",margin:25}}>{Icons.chevronLeft}</FontAwesome>
                        </TouchableHighlight>

                        </View>
                  </View>


                  <ScrollView ref="scrollView" contentContainerStyle={{ paddingVertical: 45}}
                   keyboardShouldPersistTaps='always'>
                        <View
                         style={{
                           flex:1, justifyContent: 'center', alignItems: 'center',
                           padding:1}}>

                           {List}
                          </View>

                          </ScrollView>
                          <View  style={{marginBottom:0}}>

                          <TouchableOpacity  onPress={()=>{

                                Alert.alert(
                                'Reset',
                                'Are you sure you want to reset database?',
                                [
                                  {text: 'No', },
                                 {text: 'Yes', onPress: () =>{
                                     AsyncStorage.removeItem('store').then(this._loader().done())

                                 } },
                                ],
                                { cancelable: false }
                              )



                          }}

                            style={{backgroundColor:'transparent'}}>
                              <Text style={{color:"red",fontSize:5}}>Reset</Text>
                          </TouchableOpacity>


                          <TouchableOpacity  onPress={()=>{

                            if(this.state.adding){
                            if (this.state.text[1] === "" || this.state.text[2] === "" || this.state.text[3] === ""|| this.state.text[4] === "" || this.state.text[5] === "" || this.state.text[6] === "")
                               Alert.alert("fields can't be empty!")
                              else {
                                this.setState({adding:!this.state.adding})

                                this.store.surname[this.state.text[1]]=this.state.text[2]
                                this.store.gender[this.state.text[1]]=this.state.text[3]
                                this.store.age[this.state.text[1]]=this.state.text[4]
                                this.store.height[this.state.text[1]]=this.state.text[5]
                                this.store.weight[this.state.text[1]]=this.state.text[6]

                                this.store.activity[this.state.text[1]]=0
                                this.store.recovery[this.state.text[1]]=0

                                this.store.samplesTime[this.state.text[1]] =  [null,null,null,null]
                                this.store.samplesValue[this.state.text[1]] = [0,null,null,null]

                                this.store.logsTime[this.state.text[1]] =  ["","","","","",""]
                                this.store.logsValue[this.state.text[1]] = ["Sampled","Started training","Finished training","Sampled","Recovery","Recovery"],
                                   Alert.alert("Player Added")
                                this._saver().done();
                                this._loader().done();
                             // this.setState(previousState=> ({
                             // length : this.state.length +1,
                             // names: {...previousState.names, [this.state.length]: [this.state.text[1]]},
                             // height: {...previousState.height, [this.state.length] : [this.state.text[2]]},
                             // activity: {...previousState.activity, [this.state.length] : 0 },
                             // recovery: {...previousState.recovery, [this.state.length] : 0 },
                             // values: {...previousState.values, [this.state.length]: [this.state.text[3]]} }))
                          }
                           this.refs.scrollView.scrollToEnd({animated: true})
                         }
                         else {  this.setState({adding:!this.state.adding})}

                       }}
                          style={[styles.button,{backgroundColor:'green'}]}>

                                <View style={{  flex:1,
                                  justifyContent: 'center',
                                  alignSelf:'center',}}>

                               <FontAwesome style={{fontSize: 30,color:'#ddd'}}>{Icons.userPlus}</FontAwesome>
                                 </View>
                          </TouchableOpacity>





                    </View>






          </View>
    </View>

      );
     }
     else{
       return(  <View style={{flex:1, justifyContent:'center',alignItems:'center', backgroundColor:'#F9C1B3'}}>

<View>
      <ActivityIndicator size="large" color="#F16651" />
      <Text> Loading</Text>
</View>
       </View>);
     } // end of loading
   } // end of render

 } // end of class



  const styles = StyleSheet.create({
    container: {
      flex:1,
      padding: 0,
      //  alignItems: 'center'

    },

    profile: {
      height: 60,
      padding: 10,
      width: 400,
      margin:30,
      marginBottom:0,
      marginTop:1,
      backgroundColor: 'rgba(255, 255, 255, 0.25)',
      borderRadius:3,
      borderWidth: 0,
      borderColor: '#fff',
      alignItems: 'center',
    },

    button: {
      height: 44,
      padding: 0,
      width: 300,
      margin:30,
      marginBottom:0,
      marginTop:13,
      backgroundColor: 'rgba(255, 255, 255, 0.25)',
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
      width:300,
      padding:10,
      backgroundColor: 'rgba(255, 255, 255, 0.25)',
      borderRadius:30,
      alignItems: 'center',
      color: 'white',
      fontSize: 16,
      textAlign:'center',
      fontFamily: 'SF Pro Display',
    },

  })
