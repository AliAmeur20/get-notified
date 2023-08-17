import { useContext } from "react"
import { ChannelContext } from "../context/ChannelContext"

export const useChannelContext = () => {
    const context = useContext(ChannelContext)

    if (!context){
        throw Error ('useContext must be used inside an ChannelContextProvider !')
    }

    return context
}