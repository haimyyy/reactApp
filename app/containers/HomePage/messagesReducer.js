/**
 * Created by yaakovh on 15/11/2016.
 */
import {
ADD_MESSAGE,
GET_ALL_MESSAGES} from '../App/constants';
import { fromJS } from 'immutable';

let initialState ={
    messages :[{text: "hey", user: 1},{text: "heyha", user: 2},{text: "hey123", user: 3}]
}


const messageReducer = (state = initialState, action = undefined) =>{
    let newState = state
    switch (action.type) {
        case ADD_MESSAGE:
            newState.messages.push(action.message)
            return newState
        case GET_ALL_MESSAGES:
            return newState
        default:
            return newState;
    }
}

export default messageReducer;