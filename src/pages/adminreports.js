import AdminNav from "../components/adminNav";
import { useAuthContext } from "../hooks/useAuthContext";
import { useReportContext } from "../hooks/useReportContext"
import { useEffect,useState } from "react";
import Report from "../components/report";


function AdminReports () {

    const {user} = useAuthContext ()
    const {reports , dispatch } = useReportContext()
    const [isLoading , setIsLoading] = useState(false) 
    const [total , setTotal]=useState(null)

    useEffect(()=>{

        const fetchReports = async ()=>{
          setIsLoading(true)
          const response = await fetch('/api/reports/',{
            headers :{
              'authorization' : `Bearer ${user.token}`
            }
              
          })
          const json = await response.json()
    
          if(response.ok){
            dispatch({type:'GET_REPORTS', payload:json.reports})
            setTotal(json.total)
            setIsLoading(false)
          }
          if(!response.ok){
            alert(json.err)
            setIsLoading(false)
          }
    
        }
        if(user){
            fetchReports()
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
            {reports && reports.map((rprt)=>(
        <Report key={rprt._id} {...rprt} />
        ))}

            {((total===0) || (reports && Object.keys(reports).length===0)) && <div className="text-center">
              <img className="img-fluid" alt="no channels.." src="./assets/illustrations/nochannels.svg" style={{width :"300px" , marginLeft:"auto" , marginRight :"auto" , marginTop :"80px"}} />
              <h3 className="text-primary mt-3">there's no reports..</h3>
              </div>}

          </div>}
          </div>



        </div>
    )

}

export default AdminReports ;