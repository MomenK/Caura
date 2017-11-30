import React, { Component } from "react";

import { VictoryChart, VictoryArea, VictoryAxis, VictoryLine,VictoryLabel, VictoryStack,VictoryTheme } from "victory-native";

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
       }, 10000);
     }

     componentWillUnmount() {
       window.clearInterval(this.setStateInterval);
     }

   getData() {
     var x = ['1','2','3','4','5']
     return x.map(()=> {
     return[
        { x: 0, y: Math.random(1,10) },
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
       domainPadding={2}
       animate={{ duration: 2000 }} height={250}>
       <VictoryAxis
                 tickValues={[0,1, 2, 3, 4,5]}
                 tickFormat={["Week 1", "Week 2", "Week 3", "Week 4","Week 5", "Week 6"]}
               />
       <VictoryAxis
         dependentAxis
          style={{ tickLabels: { angle: -60 } }}
            tickFormat={(x) => (`${x }mM`)}
       />

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


         <VictoryArea
         style={{ data: { fill: "rgba(127, 255, 0, 0.1)" } }}
             data={[
               { x: 0, y: 3, y0: 1 },
               { x: 5, y: 3, y0: 1 }
             ]}
           />

         <VictoryLine
      style={{ data: { stroke: "#7fff00", strokeWidth: 2 } }}
      y={(d) => 3}
    />

    <VictoryLine
 style={{ data: { stroke: "red", strokeWidth: 2 } }}
 y={(d) => 1}
/>

  <VictoryLine
    style={{
      data: { stroke: "rgba(33, 150, 243, 0)", strokeWidth: 2 },
      labels: { angle: 0, fill: "green", fontSize: 10 }
    }}
    labels={["Normal Range"]}
    labelComponent={<VictoryLabel x ={100} />}
    y={() => 2}
  />
       </VictoryChart>
     );
   }
}
