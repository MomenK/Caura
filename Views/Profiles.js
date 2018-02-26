import React, { Component } from 'react';
import {ActivityIndicator ,AsyncStorage,ScrollView, StatusBar,Button,Alert,Platform, View, Text,TextInput,TouchableHighlight,TouchableWithoutFeedback, TouchableOpacity,StyleSheet,Image,Dimensions } from 'react-native';
import FontAwesome, { Icons } from "react-native-fontawesome";
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';

import './global.js'
import Donut from './Donut.js';

export class ProfilesScreen extends Component {




  constructor ()
  {

    super();




this.store=""

  this.state =   {

   isLoading:true,

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
                Alert.alert('database is empty')
                this.store ={

                        surname:{
                          "Fosca":"Scientist",
                          "Muru":"CSO",
                          "Momen":"king of mango juices",
                          "Alistar":"Designer",},
                        gender:{
                          "Fosca":"female",
                          "Muru":"male",
                          "Momen":"male",
                          "Alistar":"male",},
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
                          "Fosca":13,
                            "Muru":92,
                          "Momen":35,
                          "Alistar":81},
                        recovery:{
                          "Fosca":20,
                          "Muru":30,
                          "Momen":87,
                          "Alistar":43,},
                        samplesValue:{
                          "Fosca":[12,24,10,12],
                          "Momen":[11,34,0,0],
                          "Muru":[21,32,15,4],
                          "Alistar":[13,28,8,10],
                      },
                        samplesTime:{
                          "Fosca":[1,3,7,8],
                          "Momen":[6,8,10,11],
                          "Muru":[1,8,13,24],
                          "Alistar":[4,6,8,10],

                        },
                        logsValue:{
                          "Fosca":["Started training","Sampled","Finished training","Sampled","Recoverd","Sampled","Recoverd","Sampled"],
                          "Momen":["Started training","Sampled","Finished training","Sampled","Recoverd","Sampled","Recoverd","Sampled"],
                          "Muru":["Started training","Sampled","Finished training","Sampled","Recoverd","Sampled","Recoverd","Sampled"],
                          "Alistar":["Started training","Sampled","Finished training","Sampled","Recoverd","Sampled","Recoverd","Sampled"],

                        },
                        logsTime:{
                          "Fosca":["1:00","3:20","7:13","8:45","9:00","9:20","11:13","11:45"],
                          "Momen":["1:00","3:20","7:13","8:45","9:00","9:20","11:13","11:45"],
                          "Muru":["1:00","3:20","7:13","8:45","9:00","9:20","11:13","11:45"],
                          "Alistar":["1:00","3:20","7:13","8:45","9:00","9:20","11:13","11:45"],

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

AsyncStorage.removeItem('store')

this._loader().done()

  }


  render() {
    const { navigate } = this.props.navigation;
    if (this.state.isLoading) {
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

                              {Object.keys(this.store.height).map((key) => {
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

                                           <View style={{width: 200,  alignItems: 'flex-start',   justifyContent: 'space-around'  }} >
                                          <Text style={styles.text} key={"t"+key} >
                                          {[key] + " | " + this.store.height[key]}</Text>
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
                                      })}
                          </View>

                          </ScrollView>
                          <View  style={{marginBottom:100}}>


                          <TouchableOpacity  onPress={()=>{
                            if (this.state.text[1] === "" || this.state.text[2] === "" || this.state.text[3] === "")
                               Alert.alert("fields can't be empty!")
                              else {


                                this.store.surname[this.state.text[1]]=this.state.text[3]
                                this.store.gender[this.state.text[1]]="male"
                                this.store.age[this.state.text[1]]=""
                                this.store.height[this.state.text[1]]=this.state.text[2]
                                this.store.weight[this.state.text[1]]=""

                                this.store.activity[this.state.text[1]]=0
                                this.store.recovery[this.state.text[1]]=0

                                this.store.samplesTime[this.state.text[1]] =  [0,0,0,0]
                                this.store.samplesValue[this.state.text[1]] = [0,0,0,0]

                                this.store.logsTime[this.state.text[1]] =  ["","","","","","","",""]
                                this.store.logsValue[this.state.text[1]] = ["Started training","Sampled","Finished training","Sampled","Recoverd","Sampled","Recoverd","Sampled"],

                                this._saver().done();
                                this._loader().done()
                             // this.setState(previousState=> ({
                             // length : this.state.length +1,
                             // names: {...previousState.names, [this.state.length]: [this.state.text[1]]},
                             // height: {...previousState.height, [this.state.length] : [this.state.text[2]]},
                             // activity: {...previousState.activity, [this.state.length] : 0 },
                             // recovery: {...previousState.recovery, [this.state.length] : 0 },
                             // values: {...previousState.values, [this.state.length]: [this.state.text[3]]} }))
                          }
                           this.refs.scrollView.scrollToEnd({animated: true})
                          }}
                          style={[styles.button,{backgroundColor:'green'}]}>

                                <View style={{  flex:1,
                                  justifyContent: 'center',
                                  alignSelf:'center',}}>

                               <FontAwesome style={{fontSize: 30,color:'#ddd'}}>{Icons.userPlus}</FontAwesome>
                                 </View>
                          </TouchableOpacity>

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



                    </View>






          </View>
    </View>

      );
     }
     else{
       return(  <View style={{flex:1, justifyContent:'center',alignItems:'center', backgroundColor:'transparent'}}>

<View>
      <ActivityIndicator size="large" color="#0000ff" />
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
