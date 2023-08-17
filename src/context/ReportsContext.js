import { createContext, useReducer } from 'react'

export const ReportContext = createContext()

export const ReportReducer = (state , action) => {
    switch (action.type){
        case 'GET_REPORTS' :
        return {
            reports : action.payload,
        }
        case 'DELETE_REPORT' : 
        return {
            reports : state.reports.filter((rprt)=>rprt._id !== action.payload._id)
        }
        default : 
          return state
    }
}

export const ReportContextProvider = ({ children }) => {
    const [state , dispatch] = useReducer (ReportReducer , {
        reports : null,
    })

    return(
        <ReportContext.Provider value={{ ...state , dispatch}}>
           { children } 
        </ReportContext.Provider>
      )
  }