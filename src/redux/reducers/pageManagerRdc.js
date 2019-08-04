import {SET_PG,MAIN_PG} from "../../constants";


const initialState= {
    pg:MAIN_PG,
}


const pageManagerReducer = (state=initialState,{type,pg})=>{
    switch (type){
        case SET_PG:
            return {
                ...state,
                pg
            }
        default:
            return state;
    }
}

export default pageManagerReducer;