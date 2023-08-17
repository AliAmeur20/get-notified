import { useContext } from "react"
import { FRContext } from "../context/followers&reviewsContext"

export const useFRContext = () => {
    const context = useContext(FRContext)

    if (!context){
        throw Error ('useContext must be used inside an FRContextProvider !')
    }

    return context
}