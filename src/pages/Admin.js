import AdminNav from "../components/adminNav";
import {useEffect, useState} from "react";
import { useAuthContext } from "../hooks/useAuthContext" 
import { useAccountContext } from "../hooks/useAccountContext";
function Admin () {

    const { dispatch } = useAccountContext()
    const {user} = useAuthContext ()
    const [channels , setChannels] = useState(null)
    const [nvchannels , setNvchannels] = useState(null)
    const [users , setUsers] = useState(null)
    const [streamers , setStreamers] = useState(null)
    const [reports , setReports] = useState(null)
    const [feedback , setFeedback] = useState(null)
    const [isLoading , setIsLoading] = useState(false)

    useEffect(()=>{
        const admininfo = async () => {
          setIsLoading(true)
          const response = await fetch('/api/accounts/admininfo',{ 
            headers : {
                'authorization' : `Bearer ${user.token}`
              }
        })
        const json = await response.json()
        if(response.ok){
            setChannels(json.channels)
            setUsers(json.users)
            setStreamers(json.streamers)
            setNvchannels(json.nvchannels)
            setReports(json.reports)
            setFeedback(json.feedback)
            setIsLoading(false)
          }else{
           alert(json.err)
           setIsLoading(false)
          } 
        }
        const fetchProfile =async () => {
          const response = await fetch('/api/accounts/myprofile',{ 
              headers : {
                  'authorization' : `Bearer ${user.token}`
                }
          })
          const json = await response.json()
          if(response.ok){
              dispatch({type:'GET_ACCOUNT' , payload:json})
            }else{
             console.log(json.err)
            }
         
      }
          if(user){
            fetchProfile() 
            admininfo()
          }
            },[user , dispatch])

  return(<div>
    <AdminNav />
    <div className="container px-2">
    {isLoading ? <div style={{marginTop : "250px" }} className="text-center">
             <div className="spinner-border text-primary" role="status" >
                <span className="visually-hidden">Loading...</span>
             </div>
           </div> : <div>
 <div className="container  my-5 py-2 text-center ">
  <div className="row justify-content-center align-items-center  my-5 pt-2 pb-5  ">
   <div className="col-10 col-sm-5 text-center text-sm-start">
    <p className=" h3 fw-bold text-primary "> Currently there is a {channels} valide channels that are available to all the of the different users. </p>
    <p className="h6 fw-semibold text-primary2">All of these channels need to be managed, as an admin you can manage their content and there apperence.</p>
   </div>
   <div className="col-10 col-sm-7 my-1">
     <img className="img-fluid " src="./assets/illustrations/channels.svg" alt="user"/>
    </div>
  </div>
  <div className="row justify-content-center align-items-center  my-5 py-5 ">
    <div className="col-10 col-sm-7">
      <img className="img-fluid " src="./assets/illustrations/nonvalidechannels.svg" alt="..."/>
    </div>
    <div className="col-10 col-sm-5 text-center text-sm-start ">
      <p className=" h3 fw-bold text-primary "> There is a {nvchannels} channel that are non valide at the moment. </p>
      <p className="h6 fw-semibold text-primary2">A non valide channel is a channel that need to be examined and looked at befor it can appears to the users.</p>
    </div>
  </div>
  <div className="row justify-content-center align-items-center  my-5 pt-2 pb-5  ">
    <div className="col-10 col-sm-5 text-center text-sm-start ">
      <p className=" h3 fw-bold text-primary "> There is a {users+streamers} active users, {users} as a clients and {streamers} as a streamers.  </p>
      <p className="h6 fw-semibold text-primary2">As an admin you can manage all their content and the appearence and limit the acces of different kinds of users.</p>
    </div>
    <div className="col-10 col-sm-7 my-2">
      <img className="img-fluid" src="./assets/illustrations/users.svg" alt="..."/>
    </div>      
  </div>
  <div className="row justify-content-center align-items-center  my-5 py-5 ">
    <div className="col-10 col-sm-7">
      <img className="img-fluid " src="./assets/illustrations/reports&feedback.svg" alt="..."/>
    </div>
    <div className="col-10 col-sm-5 text-center text-sm-start ">
      <p className=" h3 fw-bold text-primary "> Currently there is {reports} reports and {feedback} feedbacks need to be looked at.  </p>
      <p className="h6 fw-semibold text-primary2">To keep the platform clean and suitable and fully updated actions need to be taken!</p>
    </div>
  </div>
 </div>
</div>}
    </div>
  </div>)
}
export default Admin ;