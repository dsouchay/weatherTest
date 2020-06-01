import React, {Component} from 'react'
import * as Plotly from 'plotly.js';

import * as classes from './Mapa.module.css'
import {Spring} from 'react-spring/renderprops'

 
class Mapa extends Component{



drawPlot = () => {
    Plotly.newPlot('mapa'+this.props.index, [{
      x: this.props.xData,
      y: this.props.yData,
      type: this.props.type,
      mode: 'lines+markers',
      marker: {color: this.props.color},
    }], {margin: {
        t: 0, r: 0, l: 30
      },
      xaxis: {
        gridcolor: 'transparent'
      }
    }, {
      displayModeBar: false
    });
    
  
  }
  
  componentDidMount() {
    this.drawPlot();
  }

  componentDidUpdate() {
    this.drawPlot();
  }

  render() {
    return (
     
      <Spring from={{ transform:
        'translate3d(400px,0,0) scale(2) rotateX(90deg)'}}
      to={{ transform:
      'translate3d(0px,0,0) scale(1) rotateX(0deg)' }}>
  {props => <div style={props}> <div id={"mapa"+this.props.index} className={classes.Mapa}></div></div>}
</Spring>


     

    );
  }
}

export default Mapa