import { createContext, useReducer } from 'react'

export const FeedbackContext = createContext()

export const FeedbackReducer = (state , action) => {
    switch (action.type){
        case 'GET_FEEDBACK' :
        return {
            feedback : action.payload,  
        }
        case 'DELETE_FEEDBACK' : 
        return {
            feedback : state.feedback.filter((fb)=>fb._id !== action.payload._id)
        }
        default : 
          return state
    }
}

export const FeedbackContextProvider = ({ children }) => {
    const [state , dispatch] = useReducer (FeedbackReducer , {
        feedback : null,
    })

    return(
        <FeedbackContext.Provider value={{ ...state , dispatch}}>
           { children } 
        </FeedbackContext.Provider>
      )
  }