import { useContext } from "react"
import { AccountContext } from "../context/AccountContext"

export const useAccountContext = () => {
    const context = useContext(AccountContext)

    if (!context){
        throw Error ('useContext must be used inside an AccountContextProvider !')
    }

    return context
}