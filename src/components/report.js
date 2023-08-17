import formatDistanceToNow from "date-fns/formatDistanceToNow"
import { useAuthContext } from "../hooks/useAuthContext";
import { useReportContext } from "../hooks/useReportContext"
import { useState } from "react";

function Report ({_id , channel , userr , rprtmsg , createdAt}) {

    const {user} = useAuthContext ()
    const { dispatch } = useReportContext()
    const [isLoading , setIsloading] = useState(null)

    const deleteReport = async () => {
        setIsloading(true)
        const response = await fetch(`/api/reports/${_id}`,{
          method : "DELETE",
          headers : {
            'authorization' : `Bearer ${user.token}`
          }
        })
        const json = await response.json()
        if (response.ok){
          dispatch({type:'DELETE_REPORT',payload:json})
          setIsloading(false)
        }
        if(!response.ok){
          alert(json.err)
          setIsloading(false)
        }
        }

    return(
        <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12  " >
            <div className="card rounded-0 border-primary2 my-2 p-1" >   
             <div className="border-bottom text-center mb-2 mx-3">
               <p className="h5 card-title fw-bold text-primary">{channel}</p>
             </div>
             <small className=" fw-semibold text-primary">Reporter : {userr}</small>
             <p className="mx-2 fw-semibold text-primary2" >{rprtmsg}</p>
             <small className="fw-semibold text-end text-muted"><small>{formatDistanceToNow (new Date (createdAt))}</small></small>             
             <div className="text-center pt-2 px-1 pb-1">
              <button className="btn btn-sm btn-outline-primary2 rounded-0" disabled={isLoading} onClick={()=>{deleteReport()}} ><span className="fw-bold">OK</span></button>  
             </div>
           </div>
        </div>
    )

}
export default Report;