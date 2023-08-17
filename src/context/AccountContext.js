import { createContext, useReducer } from 'react'
 
export const AccountContext = createContext() 

export const AccountReducer = (state , action) => {
    switch (action.type){
      case 'GET_ACCOUNT' :
      return {
        account : action.payload
      }
      case 'DELETE_ACCOUNT' : 
      return {
        account : null
      }
      case 'GET_ACCOUNTS' : 
      return {
        accounts : action.payload,
        account : state.account
      }
      case 'DELETE_ACCOUNTS' : 
      return {
        accounts : state.accounts.filter((acc)=>acc._id !== action.payload._id),
        account : state.account
      }
      default : 
        return state
  }
}

export const AccountContextProvider = ({ children }) => {
    const [state , dispatch] = useReducer (AccountReducer , {
        account : null ,
        accounts : null
    })

    return(
        <AccountContext.Provider value={{ ...state , dispatch}}>
           { children } 
        </AccountContext.Provider>
      )
  }    