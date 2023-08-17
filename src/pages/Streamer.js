import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext" 
import { useAccountContext } from "../hooks/useAccountContext";
import {useChannelContext} from "../hooks/useChannelContext"
import StreamerNav from "../components/streamerNav";
import StreamerChannels from "../components/streamerChannels";

function Streamer () {
    const { channels , dispatch } = useChannelContext()
    const { dispatch : change } = useAccountContext()
    const {user} = useAuthContext ()
    const [isLoading , setIsLoading] = useState(false)

    useEffect(()=>{
        const fetchProfile =async () => {
            setIsLoading(true)
            const response = await fetch('/api/accounts/myprofile',{ 
                headers : {
                    'authorization' : `Bearer ${user.token}`
                  }
            })
            const json = await response.json()
            if(response.ok){
                change({type:'GET_ACCOUNT' , payload:json})
                dispatch({type:'GET_CHANNELS' , payload:json.channels})
                setIsLoading(false)
              }else{
               console.log(json.err)
               setIsLoading(false)
              }
           
        }
        if(user){
            fetchProfile() 
          }
    },[user,change,dispatch])

    return (
        <div>
            <StreamerNav />

            <div className="container-fluid my-5 px-4">
            {isLoading ?
           <div style={{marginTop : "200px" }} className="text-center">
             <div className="spinner-border text-primary" role="status" >
                <span className="visually-hidden">Loading...</span>
             </div>
           </div> :
           <div>
            {((channels && Object.keys(channels).length>0)) && <h3 className="text-center text-primary fw-bold">My Channels</h3>}
            <div className="row">
            {channels && channels.map((channel)=>(
                <StreamerChannels key={channel._id} {...channel} />
            ))}
            </div>
           </div>
          }
          {((channels && Object.keys(channels).length===0)) && <div className="text-center">
              <img className="img-fluid" alt="no channels.." src="./assets/illustrations/nochannels.svg" style={{width :"300px" , marginLeft:"auto" , marginRight :"auto" , marginTop :"70px"}} />
              <h3 className="text-primary mt-3">you have no channels yet !</h3>
              </div>}
          </div>
        </div>
    )
}
export default Streamer ;