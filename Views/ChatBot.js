/**
 * Caura mobile Application
 * @MomenKamal
 CHATBOT.JS: Caura CHAT BOT
*/


import React, { Component } from "react";
import {Alert,View,Text,Dimensions,Image} from 'react-native'
import ChatBot from 'react-native-chatbot';



export class ChatBotScreen extends Component {


  constructor(props) {
    super(props);
    this.state = {botColor:"white"};
    this.updateColor = this.updateColor.bind(this);
  }

  updateColor(){


     this.setState({botColor:"blue"})
     Alert.alert(this.state.botColor)
     return '5'
  }
  render(){
    return(
<View style= {{flex:1}} >
      <View style={{
        alignItems:'center',
        backgroundColor:'#F16651',
        height :60,
      }}>
        <Text style={{
          marginTop:20,
          color: 'white',
          fontSize: 16,
          fontFamily: 'SF Pro Display'
        }}> June </Text>
      </View>

      <ChatBot
        style= {{flex:1, backgroundColor:'#222'}}
        footerStyle= {{height:50,backgroundColor:'white'}}
        botBubbleColor = '#fff'
        botFontColor = "#000"
        userBubbleColor = "#f8b4a2"
        userFontColor = "#000"
        hideUserAvatar={true}
        botAvatar = 'https://png.icons8.com/color/540/user-female-skin-type-1-2.png'
        contentStyle={{backgroundColor:'transparent',marginTop:10}}

        steps={[
          {
            id: '1',
            message: "Hi, I'm June. Your personal health assistant.",
            trigger: "1A",
          },
          {
            id: '1A',
            message: "What shall I call you?",
            trigger: '2',
          },
          {
            id: '2',
            user: true,
            trigger: '3',
          },
          {
            id: '3',
            message: 'Hi {previousValue}, nice to meet you!',
            trigger: '4',
          },
          {
            id: '4',
            message: 'Are you good with instructions?',
            trigger:"5",
          },
          {
            id: '5',
            options: [
              { value: 1, label: 'Press', trigger: 'correct' },
              { value: 2, label: "Don't press", trigger: 'wrong' },
              { value: 3, label: "Lucky?", trigger: 'easter' },
            ],
          },
          {
            id: 'easter',
            component: <View  style={{alignItems:'center'}}><Image  resizeMode='contain' style={{width: 100,height: 100}}
            source={require('../img/Logo_alpha.png')} /></View>,

            trigger: '1',
          },
          {
            id: 'wrong',
            message: 'I told you not to press this right??',
            trigger: '5',
          },
          {
            id: 'correct',
            message : (value) => {Alert.alert("You are my good boy")
            return 'Awesome! You are a good boy'},
            trigger: ()=> {Alert.alert("Yes, I just said that")
              return '1'},
          },
        ]}
        />

</View>
)}
}
