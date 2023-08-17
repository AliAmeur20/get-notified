import { useAuthContext } from "../hooks/useAuthContext";
import { useChannelContext } from "../hooks/useChannelContext";
import { useState } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow"

function ChannelReq ({_id , title , bio , createdAt , isBlocked , location , category}) {

    const {dispatch}=useChannelContext()
    const {user} = useAuthContext ()
    const [isLoading , setIsloading] = useState(false)
    const [isvLoading , setIsvloading] = useState(false)

    const handleValidate = async () => {
        const body = {isV : true , isB : isBlocked}
        setIsvloading(true)
        const response = await fetch(`/api/channels/${_id}`, {
            method: 'PATCH',
            body: JSON.stringify(body),
            headers: {
              'Content-Type': 'application/json',
              'authorization' : `Bearer ${user.token}`
            }
          })
          const json = await response.json()
          if(!response.ok){
            alert(json.err)
            setIsvloading(false)
          }
          if(response.ok){
            dispatch({type:'DELETE_CHANNEL',payload:json})
            setIsvloading(false)
           
          }
    
       }


    const deleteChannel = async () => {
        setIsloading(true)
        const response = await fetch(`/api/channels/${_id}`,{
          method : "DELETE",
          headers : {
            'authorization' : `Bearer ${user.token}`
          }
        })
        const json = await response.json()
        if (response.ok){
          dispatch({type:'DELETE_CHANNEL',payload:json})
          setIsloading(false)
        }
        if(!response.ok){
          alert(json.err)
          setIsloading(false)
        }
        }

    return(
        <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12  " >
            <div className="card rounded-0 my-2 p-1" >   
             <div className="text-center mb-2 mt-1 mx-3">
               <p className="h4 card-title fw-bold text-primary">{title}</p>
             </div>
             <small className="mx-2 fw-semibold text-primary2"><i className="bi bi-star-fill"></i> {category}</small>
             <small className="mx-2 fw-semibold text-primary2"><i className="bi bi-geo-fill"></i> {location}</small>
             <p className="m-2 fw-semibold text-primary" ><i className="bi bi-file-text-fill"></i> {bio}</p>
             <small className="fw-semibold text-end text-muted mx-1"><small>{formatDistanceToNow (new Date (createdAt))}</small></small>             
             <div className="text-center pt-2 px-1 pb-1">
              <button className="btn btn-sm btn-primary mx-1 rounded-0" disabled={isvLoading} onClick={handleValidate} >validate {isvLoading && 
                    <div className="spinner-border spinner-border-sm text-white ms-1" role="status">
                    <span className="visually-hidden">Loading...</span>
                    </div>}</button>
              <button className="btn btn-sm btn-outline-primary2 rounded-0" disabled={isLoading} onClick={()=>{deleteChannel()}} >{isLoading ? 
                <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Loading...</span>
                </div>
              :<i className="bi bi-trash-fill"></i>}</button>  
             </div>
           </div>
        </div>
    )

}
export default ChannelReq ;