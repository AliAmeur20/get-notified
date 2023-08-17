import { useContext } from "react"
import { FeedbackContext } from "../context/FeedbackContext"

export const useFeedbackContext = () => {
    const context = useContext(FeedbackContext)

    if (!context){
        throw Error ('useContext must be used inside an FeedbackContextProvider !')
    }

    return context
}