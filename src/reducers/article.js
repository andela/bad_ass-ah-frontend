//@call type going to be used..
import {GET_ALL_ARTICLE} from "../actions/type";
const initialState=[];

export const getAllArticle=(state=initialState, action)=>{
const {type,payload}=action;
 switch(type){
     case GET_ALL_ARTICLE:
     return{
         ...state,
         articles:payload
     }
     default:
     return state;
 }
}
