import { createContext, useReducer } from 'react'
 
export const ChannelContext = createContext() 

export const ChannelReducer = (state , action) => {
      switch (action.type){
        case 'GET_CHANNELS' :
        return {
            channels : action.payload,
            channel : state.channel
        }
        case 'ADD_CHANNEL' : 
        return {
            channels : [action.payload , ...state.channels],
            channel : state.channel
        }
        case 'DELETE_CHANNEL' : 
        return {
            channels : state.channels.filter((ch)=>ch._id !== action.payload._id),
            channel : state.channel
        }
        case 'PUT_CHANNEL' : 
        return {
            channel : action.payload ,
            channels : [action.payload , ...state.channels.filter((ch)=>ch._id !== action.payload._id)]
        }
        case 'PUT_CHANNELL' : 
        return {
            channel : action.payload ,
            channels : state.channels
        }
        case 'EMPTY' : 
        return {
            channel : action.payload ,
            channels : null
        }
        default : 
          return state
    }
}

export const ChannelContextProvider = ({ children }) => {
    const [state , dispatch] = useReducer (ChannelReducer , {
        channels : null,
        channel : null

    })

    
    
    return(
      <ChannelContext.Provider value={{ ...state , dispatch}}>
         { children } 
      </ChannelContext.Provider>
    )
}