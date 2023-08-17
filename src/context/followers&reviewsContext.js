import { createContext, useReducer } from 'react'

export const FRContext = createContext() 

export const FRReducer = (state , action) => {
    switch (action.type){
        case 'GET_FOLLOWERS' :
      return {
        followers : action.payload,
        reviews : state.reviews
      }
      case 'GET_REVIEWS' :
      return {
        reviews : action.payload,
        followers : state.followers
      }
      case 'ADD_FOLLOWER' :
      return {
        followers : [action.payload , ...state.followers],
        reviews : state.reviews
      }
      case 'ADD_REVIEW' :
      return {
        reviews : [action.payload , ...state.reviews],
        followers : state.followers
      }
      case 'DELETE_FOLLOWER' :
      return {
        followers : state.followers.filter((flwr)=>flwr._id !== action.payload._id),
        reviews : state.reviews
      }
      default : 
        return state
  }
}

export const FRContextProvider = ({ children }) => {
    const [state , dispatch] = useReducer (FRReducer , {
        followers :null ,
        reviews : null
    })

    return(
        <FRContext.Provider value={{ ...state , dispatch}}>
           { children } 
        </FRContext.Provider>
      )
  }    