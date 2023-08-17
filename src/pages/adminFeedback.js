import { useEffect,useState } from "react";
import AdminNav from "../components/adminNav";
import { useAuthContext } from "../hooks/useAuthContext"
import { useFeedbackContext } from "../hooks/useFeedbackContext"
import Feedback from "../components/feedback";

function AdminFeedback () {

    const {user} = useAuthContext ()
    const {feedback , dispatch } = useFeedbackContext()
    const [isLoading , setIsLoading] = useState(false) 
    const [total , setTotal]=useState(null)
    
    useEffect(()=>{

        const fetchFeedback = async ()=>{
          setIsLoading(true)
          const response = await fetch('/api/feedback/',{
            headers :{
              'authorization' : `Bearer ${user.token}`
            }
              
          })
          const json = await response.json()
    
          if(response.ok){
            dispatch({type:'GET_FEEDBACK', payload:json.feedback})
            setTotal(json.total)
            setIsLoading(false)
          }
          if(!response.ok){
            alert(json.err)
            setIsLoading(false)
          }
    
        }
        if(user){
          fetchFeedback()
        }
          },[dispatch , user])

    return (
        <div>
            <AdminNav />
            <div className="container-fluid my-5 px-4">
      {isLoading ?
           <div style={{marginTop : "250px" }} className="text-center">
             <div className="spinner-border text-primary" role="status" >
                <span className="visually-hidden">Loading...</span>
             </div>
           </div> :
          <div className="row">
            {feedback && feedback.map((fb)=>(
        <Feedback key={fb._id} {...fb} />
        ))}

            {((total===0) || (feedback && Object.keys(feedback).length===0)) && <div className="text-center">
              <img className="img-fluid" alt="no channels.." src="./assets/illustrations/nochannels.svg" style={{width :"300px" , marginLeft:"auto" , marginRight :"auto" , marginTop :"80px"}} />
              <h3 className="text-primary mt-3">there's no feedback..</h3>
              </div>}

          </div>}
          </div>

        </div> 
    )

}

export default AdminFeedback ;