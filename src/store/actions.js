import * as actionTypes from './actionsTypes'
import axios from '../axios-data'

export const successData = (datafetch)=>{
    return {
        type: actionTypes.SUCCESS_DATA,
        data: datafetch

    }
}
export const plotsUpdate = (plotUpdate)=>{
    return {
        type: actionTypes.UPDATE_PLOTS,
        plot:plotUpdate


    }
}

export const FailData = ()=>{
    return {
        type: actionTypes.FAIL_DATA
    }
}

export const fetchData = ()=>{
    return dispatch =>{
        axios.get('/forecast?q=Barcelona&units=metric&APPID=0614d13377e407e8c0724c47d862443b')
        .then(response => {
            dispatch(successData(response.data));
        })
        .catch(error=> {
            console.log(error);
            dispatch(FailData())
        });
    }
}