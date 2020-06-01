import React,{useState} from 'react'
import {useSpring, animated} from 'react-spring'




import Mapa from '../Mapa/Mapa'
import * as classes from './ContainerMap.module.css'



const ContainerMap = (props)=>{
   const onChangeType=(e,i)=>{
       return props.changeData(e.target.value,i)
    }
    const  colorGraph = ()=>{
        return  "#" + Math.floor(Math.random()*16777215).toString(16);
      }

    const propsA = useSpring({
        to: [{opacity: 0}, {opacity: 0.5}],
        from: {opacity: 1},
  
      })

    return (


        <div className={classes.ContainerMap}>
                        <h1>{props.title} <span>{props.frec}</span> </h1> 

            <animated.div style={propsA}>
            <Mapa  index={props.index} color={colorGraph()} xData={props.xData} yData={props.yData} type={props.type} />
            </animated.div>
            <select value={props.frec} onChange={(e)=>onChangeType(e,props.index)}>
                <option value="all">All</option>
                <option value="daily">Daily</option>
                <option value="hour">Hour</option>

            </select>
            </div>

    )
        
}


export default ContainerMap