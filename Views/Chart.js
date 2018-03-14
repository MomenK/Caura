/**
* THIS IS NOT USED !!!!!!!!!!!!!!!!
 * Caura mobile Application
 * @MomenKamal

 CHART.JS: an example of a stack graph. THIS IS NOT A FUNCTIONAL PART OF THE APPLICATION, IT IS GOOD FOR FUTURE DEVELOPMENT
*/


import React, { Component } from "react";
import { Button,Alert,Platform, View, Text,TextInput,TouchableHighlight,TouchableWithoutFeedback, StyleSheet,Image,Dimensions } from 'react-native';


import {VictoryAnimation,VictoryPie, VictoryChart, VictoryArea, VictoryAxis, VictoryLine,VictoryLabel, VictoryStack,VictoryTheme } from "victory-native";

import Svg,{
    Path, G
} from 'react-native-svg';


export class ChartScreen extends Component {
  static navigationOptions = {
    title: 'History',
  };

  constructor() {
    super();
    this.state = {
      percent: 0, data: this.getData(0)
    };
  }

  componentDidMount() {
    let percent = 0;
    this.setStateInterval = window.setInterval(() => {
      percent += (Math.random() * 25);
      percent = (percent > 100) ? 0 : percent;
      this.setState({
        percent, data: this.getData(percent)
      });
    }, 2000);
  }

  componentWillUnmount() {
    window.clearInterval(this.setStateInterval);
  }

  getData(percent) {
    return [{ x: 1, y: percent }, { x: 2, y: 100 - percent }];
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{alignItems: 'center'}}>
      <TouchableWithoutFeedback  onPress={()=>{
        navigate('ChatBot')
      }}>

             <Svg  height={300} width={300}>
            <VictoryPie
            standalone={false}
            animate={{ duration: 1000 }}
            width={300} height={300}
            data={this.state.data}
            innerRadius={110}
            cornerRadius={2}
            labels={() => null}
            style={{
              data: { fill: (d) => {
                const color = d.y > 30 ? "#F16651" : "red";
                return d.x === 1 ? color : "transparent";
              }
              }
            }}
          />

          <VictoryAnimation duration={1000} data={this.state}>
           {(newProps) => {
             return (
               <VictoryLabel
                 textAnchor="middle" verticalAnchor="middle"
                 x={150} y={150}
                 text={`${Math.round(newProps.percent)}%`}
                 style={{ fontSize: 45 }}
               />
             );
           }}
         </VictoryAnimation>


          </Svg>
</TouchableWithoutFeedback>


<TouchableWithoutFeedback  onPress={()=>{
  navigate('ChatBot')
}}>

       <Svg  height={300} width={300}>
      <VictoryPie
      standalone={false}
      animate={{ duration: 1000 }}
      width={300} height={300}
      data={this.state.data}
      innerRadius={110}
      cornerRadius={2}
      labels={() => null}
      style={{
        data: { fill: (d) => {
          const color = d.y > 30 ? "grey" : "red";
          return d.x === 1 ? color : "transparent";
        }
        }
      }}
    />

    <VictoryAnimation duration={1000} data={this.state}>
     {(newProps) => {
       return (
         <VictoryLabel
           textAnchor="middle" verticalAnchor="middle"
           x={150} y={150}
           text={`${Math.round(newProps.percent)}%`}
           style={{ fontSize: 45 }}
         />
       );
     }}
   </VictoryAnimation>


    </Svg>
</TouchableWithoutFeedback>

          </View>
    );
  }
}

// import React, { Component } from "react";
//
// import { VictoryChart, VictoryArea, VictoryAxis, VictoryLine,VictoryLabel, VictoryStack,VictoryTheme } from "victory-native";
//
// export class ChartScreen extends Component {
//   static navigationOptions = {
//     title: 'History',
//   };
//
//   constructor(props) {
//      super(props);
//      this.state = { data: this.getData() };
//    }
//
//    componentDidMount() {
//        this.setStateInterval = window.setInterval(() => {
//       //   console.log(Math.random(1,10))
//          this.setState({ data: this.getData() });
//        }, 10000);
//      }
//
//      componentWillUnmount() {
//        window.clearInterval(this.setStateInterval);
//      }
//
//    getData() {
//      var x = ['1','2','3','4','5']
//      return x.map(()=> {
//      return[
//         { x: 0, y: Math.random(1,10) },
//         { x: 1, y: Math.random(1,10) },
//         { x: 2, y: Math.random(1,10) },
//         { x: 3, y: Math.random(1,10) },
//         { x: 4, y: Math.random(1,10) },
//         { x: 5, y: Math.random(1,10) }
//           ];
//           });
//    }
//
//    render() {
//      return (
//        <VictoryChart
//        theme={VictoryTheme.material}
//        domainPadding={2}
//        animate={{ duration: 2000 }} height={250}>
//        <VictoryAxis
//                  tickValues={[0,1, 2, 3, 4,5]}
//                  tickFormat={["Week 1", "Week 2", "Week 3", "Week 4","Week 5", "Week 6"]}
//                />
//        <VictoryAxis
//          dependentAxis
//           style={{ tickLabels: { angle: -60 } }}
//             tickFormat={(x) => (`${x }mM`)}
//        />
//
//          <VictoryStack
//            colorScale={"blue"}
//          >
//            {this.state.data.map((data, i) => {
//              return (
//                <VictoryArea
//                  key={i}
//                  data={data}
//                  interpolation={"basis"}
//                />
//              );
//            })}
//          </VictoryStack>
//
//
//          <VictoryArea
//          style={{ data: { fill: "rgba(127, 255, 0, 0.1)" } }}
//              data={[
//                { x: 0, y: 3, y0: 1 },
//                { x: 5, y: 3, y0: 1 }
//              ]}
//            />
//
//          <VictoryLine
//       style={{ data: { stroke: "#7fff00", strokeWidth: 2 } }}
//       y={(d) => 3}
//     />
//
//     <VictoryLine
//  style={{ data: { stroke: "red", strokeWidth: 2 } }}
//  y={(d) => 1}
// />
//
//   <VictoryLine
//     style={{
//       data: { stroke: "rgba(33, 150, 243, 0)", strokeWidth: 2 },
//       labels: { angle: 0, fill: "green", fontSize: 10 }
//     }}
//     labels={["Normal Range"]}
//     labelComponent={<VictoryLabel x ={100} />}
//     y={() => 2}
//   />
//        </VictoryChart>
//      );
//    }
// }
