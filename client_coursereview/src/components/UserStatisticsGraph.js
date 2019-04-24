import React, { Component } from 'react';
// var CanvasJSReact = require('../resources/canvasjs.react');
// var CanvasJS = CanvasJSReact.CanvasJS;
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;
import './UserStatisticsGraph.css';
import {Chart} from "react-charts";

class UserStatisticsGraph extends Component {
render() {
   return( 
//    <div style={{ width: "200px",height: "200px"}} >
   <div className="userChart" >
     <Chart
      data={[
        {
          label: "Series 1",
          data: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7]]
        },
        {
          label: "Series 2",
          data: [[0, 3], [1, 1], [2, 5], [3, 6], [4, 4]]
        }
      ]}
      axes={[
        { primary: true, type: "linear", position: "bottom" },
        { type: "linear", position: "left" }
      ]}
    />
  </div>
);
}
}

// class UserStatisticsGraph extends Component {
//   render() {
//     const options = {
//         animationEnabled: true,
//         exportEnabled: true,
//         theme: "light2", //"light1", "dark1", "dark2"
//         title:{
//             text: "Simple Column Chart with Index Labels"
//         },
//         data: [{
//             type: "column", //change type to bar, line, area, pie, etc
//             //indexLabel: "{y}", //Shows y value on all Data Points
//             indexLabelFontColor: "#5A5757",
//             indexLabelPlacement: "outside",
//             dataPoints: [
//                 { x: 10, y: 71 },
//                 { x: 20, y: 55 },
//                 { x: 30, y: 50 },
//                 { x: 40, y: 65 },
//                 { x: 50, y: 71 },
//                 { x: 60, y: 68 },
//                 { x: 70, y: 38 },
//                 { x: 80, y: 92, indexLabel: "Highest" },
//                 { x: 90, y: 54 },
//                 { x: 100, y: 60 },
//                 { x: 110, y: 21 },
//                 { x: 120, y: 49 },
//                 { x: 130, y: 36 }
//             ]
//         }]
//     }
//     console.log(options)
//     return (
// 		<div>
// 			<CanvasJSChart options = {options} 
// 				/* onRef={ref => this.chart = ref} */
// 			/>
// 			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
// 		</div>
//     )
//   }
// }

export default UserStatisticsGraph;
