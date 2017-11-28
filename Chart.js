import React, { Component } from "react";

import { VictoryChart, VictoryArea, VictoryStack,VictoryTheme } from "victory-native";

export class ChartScreen extends Component {
  static navigationOptions = {
    title: 'History',
  };

  constructor(props) {
     super(props);
     this.state = { data: this.getData() };
   }

   componentDidMount() {
       this.setStateInterval = window.setInterval(() => {
         console.log(Math.random(1,10))
         this.setState({ data: this.getData() });
       }, 2000);
     }

     componentWillUnmount() {
       window.clearInterval(this.setStateInterval);
     }

   getData() {
     var x = ['1','2','3','4','5']
     return x.map(()=> {
     return[
        { x: 1, y: Math.random(1,10) },
        { x: 2, y: Math.random(1,10) },
        { x: 3, y: Math.random(1,10) },
        { x: 4, y: Math.random(1,10) },
        { x: 5, y: Math.random(1,10) }
          ];
          });
   }

   render() {
     return (
       <VictoryChart
         theme={VictoryTheme.material}
         animate={{ duration: 500, onLoad: { duration: 1000 } }}
       >
         <VictoryStack
           colorScale={"blue"}
         >
           {this.state.data.map((data, i) => {
             return (
               <VictoryArea
                 key={i}
                 data={data}
                 interpolation={"basis"}
               />
             );
           })}
         </VictoryStack>
       </VictoryChart>
     );
   }
}
