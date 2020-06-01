import React, { Component } from 'react'
import moment from 'moment'

import ContainerMap from '../ContainerMap/ContainerMap'


import { connect } from 'react-redux'
import * as actionsCreators from '../../store/actions'

import * as classes from './Dashboard.module.css'

  
class Dashboard extends Component{



    componentDidMount(){
        this.props.onSetData();
    }
    
    getAllHandler = ()=>{
        return this.props.data.list
       }

    getDailyHandler = ()=>{
    return this.props.data.list.filter(reading => {   
        return reading.dt_txt.includes("18:00:00")})
   }

   getHourHandler = ()=>{
    return this.props.data.list.filter(reading => {   
        return reading.dt_txt.includes(moment().format('MM-DD'))})
   }

   onPlotClick = (data) => {
       console.log(data)

  }
 
  changeDataHandler = (elem,value)=>{
      this.props.onChangeFrec(elem,value)  

  }

  getListData=(frec,elem,location)=>{
     let data = [] 
    switch (frec){
        case 'daily':
            data = this.getDailyHandler()
            break
        case 'hour': 
            data = this.getHourHandler()
            break
        default:  
            data = this.getAllHandler()        
    } 

    let dataX = location? data.map(x=>x[location][elem]):(data.map(x=>(x[elem]['all']||x[elem]['speed'])))
    let dataY = data.map(x=>x.dt_txt)
    return [dataX,dataY]

  }

    render (){
        let result = null
        let graph = null

        if (this.props.data){
            let test = new Date(this.props.data.city.sunset*1000)
           console.log(typeof(this.props.data.city.sunset),test,moment(test).format()) 
           result = <div className={classes.header}>
                <div className={classes.card}>
                 <div className={classes.weatherIcon}><i className="wi wi-sunrise"></i></div>
                 <span>{moment(new Date(this.props.data.city.sunrise*1000)).format("hh:mm:ss")}</span>
               </div>
               <div className={classes.card}>
                <h1>{this.props.data.city.name}</h1>
               </div>
               <div className={classes.card}>
                <div className={classes.weatherIcon}><i className="wi wi-sunset"></i></div>
                <span>{moment(new Date(this.props.data.city.sunset*1000)).format("hh:mm:ss")} </span>
               </div>
           </div>


            graph =<div className={classes.graphs}>
                    {this.props.plots.map((i,k)=>( <ContainerMap key={k} index={k} xData={this.getListData(i.frec,i.elem,i.location)[1]} yData={this.getListData(i.frec,i.elem,i.location)[0]}   type={i.type} title={i.elem} frec={i.frec} changeData ={this.changeDataHandler} />))}
            </div>

        }
        let err = (this.props.error)?  <div className={classes.error}>{"Oh snap! You got an error!"}</div>:null
        

        return(
        <div className={classes.Dashboard}>
             {err}
             {result} 
             {graph}


        </div>
        )
    }

    
}

const mapStateToProps = state =>{
    return {
         data: state.data,
         error:state.error,
         plots:state.plots

    };
};

const mapDispatchToProps = dispatch =>{
    return {
        onSetData:()=>dispatch(actionsCreators.fetchData()),
        onChangeFrec:(f,i)=>dispatch(actionsCreators.plotsUpdate({pos:i,frec:f})),

    };
}
export default connect(mapStateToProps,mapDispatchToProps)(Dashboard)