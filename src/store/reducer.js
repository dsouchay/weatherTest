import * as actionsType from './actionsTypes'

const inicialState = {
    data:null,
    error:false,
    //plots:null
    plots:[
        {elem:'temp',location:'main',frec:'daily',type:'bar'},
        {elem:'temp',location:'main',frec:'daily',type:'scatter'},
        {elem:'humidity',location:'main',frec:'daily',type:'bar'},
        {elem:'humidity',location:'main',frec:'daily',type:'scatter'},
        {elem:'pressure',location:'main',frec:'daily',type:'bar'},
        {elem:'pressure',location:'main',frec:'daily',type:'scatter'},
        {elem:'clouds',location:'',frec:'daily',type:'bar'},
        {elem:'clouds',location:'',frec:'daily',type:'scatter'},   
        {elem:'wind',location:'',frec:'daily',type:'bar'},
        {elem:'wind',location:'',frec:'daily',type:'scatter'}             
    ]
}


const updatePlots = (state, action)=>{

    const plot={...state.plots[action.plot.pos]}
    plot.frec = action.plot.frec
    const newPlots=[...state.plots]
    newPlots[action.plot.pos] = plot

    return {
        ...state,
        plots:newPlots
    }

}

const dataSuccess = (state, action)=>{
    const updState = {
        data:action.data,
        error:false
    }
    return {
        ...state,
        ...updState
    }
}

const dataFail = (state, action)=>{
    return{
        ...state,
        ...{error:true,data:null }
    } 
}



const reducer = (state = inicialState ,action) => {

switch (action.type){
    case actionsType.SUCCESS_DATA: return dataSuccess(state,action)  
    case actionsType.FAIL_DATA:return dataFail(state,action)
    case actionsType.UPDATE_PLOTS:return updatePlots(state,action)
    default: return state;

    
}   

}


export default reducer;