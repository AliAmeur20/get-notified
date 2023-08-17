import { useContext } from "react"
import { ReportContext } from "../context/ReportsContext"

export const useReportContext = () => {
    const context = useContext(ReportContext)

    if (!context){
        throw Error ('useContext must be used inside an ReportContextProvider !')
    }

    return context
}