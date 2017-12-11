
import React, { Component } from "react";
import {Alert} from 'react-native'
import ChatBot from 'react-native-chatbot';


export class ChatBotScreen extends Component {

  render(){
    return(

      <ChatBot
        steps={[
          {
            id: '1',
            message: 'What is your name?',
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
            trigger: '5',
          },
          {
            id: '5',
            options: [
              { value: 1, label: 'Press', trigger: 'correct' },
              { value: 2, label: "Don't press", trigger: 'wrong' },
              { value: 3, label: "Don't press", trigger: 'wrong' },
            ],
          },
          {
            id: 'wrong',
            message: 'I told you not to press this right??',
            trigger: '5',
          },
          {
            id: 'correct',
            message : (value) => {Alert.alert("You mama!")
            return 'Awesome! You are a good boy'},
            trigger: ()=> {Alert.alert("You dada!")
              return '1'},
          },
        ]}
      />

)}
}
