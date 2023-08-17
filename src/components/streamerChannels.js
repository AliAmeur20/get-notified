import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext" 
import StarRating from "./starRating";
import Tippy from '@tippyjs/react';
function StreamerChannels ({title,ch_img,_id,rating,isValide}){
    const {user} = useAuthContext ()
    const [followers , setFollowers] = useState(null)
    const [isLoading , setIsLoading] = useState(false)
    useEffect(()=>{
        const fetchfollowersnum =async () => {
            setIsLoading(true)
            const response = await fetch(`/api/subscribtions/followersNum/${_id}`,{ 
                headers : {
                    'authorization' : `Bearer ${user.token}`
                  }
            })
            const json = await response.json()
            if(response.ok){
                setFollowers(json)
                setIsLoading(false)
              }else{
               alert(json.err)
               setIsLoading(false)
              }
           
        }
        if(user){
            fetchfollowersnum() 
          }
    },[user,_id])
  return(
    <div className="col-lg-4 col-md-5 col-sm-10" style={!isValide ? {pointerEvents: "none", opacity: "0.4"} : {}}>
    <div className="card rounded-0 my-2" >
      <div className="py-1 px-2" style={{backgroundImage : `url(${ch_img})` , backgroundSize: "cover" , height : "200px"}}>
        <div style={{float : "right"}}>
        <StarRating totalStars={5} note={rating} />
        </div>
      </div>
    
     <div className="py-3 px-1">

       <p className="h5 card-title d-inline fw-bold text-primary mx-2">{title}</p>
       {isLoading ? <div className="spinner-border spinner-border-sm m-2 text-primary" role="status" style={{float : "right"}}>
            <span className="visually-hidden">Loading...</span>
         </div>
        : <Tippy content="followers"><span className="h5 d-inline fw-semibold text-primary mx-2" style={{float : "right"}}><i class="bi bi-people-fill"></i> {followers}</span></Tippy>}
     </div>
    </div>
  </div>
  )
}
export default StreamerChannels;