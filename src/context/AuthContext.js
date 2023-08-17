import { createContext, useEffect, useReducer } from 'react'
 
export const AuthContext = createContext() 

export const AuthReducer = (state , action) => {
    switch (action.type){
      case 'SIGNIN' : 
      return {
          user : action.payload
      }
      case 'SIGNOUT' : 
      return {
          user : null
      }
      default : 
        return state
  }
}

export const AuthContextProvider = ({ children }) => {
    
    //for fill the context state in case of refresh
    useEffect (()=>{
        const user = JSON.parse(localStorage.getItem('user'))

        if(user){
            dispatch({type:'SIGNIN' , payload:user})
        }

    },[])

    const [state , dispatch] = useReducer (AuthReducer , {
        user : null 
    })
    return(
        <AuthContext.Provider value={{ ...state , dispatch}}>
           { children } 
        </AuthContext.Provider>
      )
  }
