import React, { Component } from "react";
import { Button,Alert,Platform, View, Text,TextInput,TouchableHighlight,TouchableWithoutFeedback, StyleSheet,Image,Dimensions } from 'react-native';


import {VictoryAnimation,VictoryPie, VictoryChart, VictoryArea, VictoryAxis, VictoryLine,VictoryLabel, VictoryStack,VictoryTheme } from "victory-native";

import Svg,{
    Path, G
} from 'react-native-svg';


export default function Donut({

  height, //300
  width, //300
  percent,
  thick, //190
  fontsize,
  fontColor,
  normalColor,
  backColor,
  warningColor,
  warningLevel,
  radius,
  scale,


}) {

  return (
    <Svg  height={height} width={width} >
      <G scale ={(height/300).toString()}
        cx={height/2}
        cy ={width/2}>
        <VictoryPie
        standalone={false}
        animate={{ duration: 1000 }}
        width={300} height={300}
        data={[
          {x: 1, y: percent },
          {x: 2, y: 100 - percent}]
        }
        innerRadius={105}
        cornerRadius={10}
        labels={() => null}
        style={{
          data: { fill: (d) => {
            const color = d.y >  warningLevel ? normalColor : warningColor;
            return d.x === 1 ? color : backColor;
          }
          }
        }}
        />
      </G>
        <VictoryAnimation duration={1000} data={this.state}>
         {(newProps) => {
           return (
             <VictoryLabel
               textAnchor="middle" verticalAnchor="middle"
               x={height/2} y={width/2}
                text={`${Math.round(percent)}%`}
               style={{fontSize: fontsize, fill: fontColor}}
             />
           );
         }}
       </VictoryAnimation>

        </Svg>
  );
}
