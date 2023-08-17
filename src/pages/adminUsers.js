import AdminNav from "../components/adminNav";
import UserA from "../components/user-a";
import { useEffect, useState } from "react";
import { useAccountContext } from "../hooks/useAccountContext";
import { useAuthContext } from "../hooks/useAuthContext" 
import Pagination from "../components/pagination";

function AdminUsers(){
    const {accounts , dispatch} = useAccountContext()
    const {user} = useAuthContext ()
    const [search , setSearch] = useState('')
    const [email , setEmail] = useState('')
    const [type , setType] = useState('user')
    const [isLoading , setIsLoading] = useState(false)
    const [page,setPage]=useState(1)
    const [total , setTotal]=useState(null)
    useEffect(()=>{
        const fetchAccounts = async ()=>{
          setIsLoading(true)
          const response = await fetch(`/api/accounts?search=${search}&email=${email}&page=${page}&type=${type}`,{
            headers :{
              'authorization' : `Bearer ${user.token}`
            }
            
          })
          const json = await response.json()
    
          if(response.ok){
            dispatch({type:'GET_ACCOUNTS', payload:json.accounts})
            setTotal(json.total)
            setIsLoading(false)
          }
    
        }
        if(user){
          fetchAccounts()
        }
          },[dispatch , user , search , email , page , type])

    return(
        <div>
            <AdminNav />


            <div className="container-sm my-4 ">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-4 col-sm-9 my-1">
              <div className="input-group">
                <span className="input-group-text bg-primary2 text-white fw-bold border-primary2"><i className="bi bi-search"></i></span>
                <input type="text" className="form-control" placeholder="Search an account.." onChange={(e)=>{setSearch(e.target.value)}} />
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-9 my-1">
            <select className="form-select" aria-label="Default select example" onChange={(e)=>setType(e.target.value)}>
                      <option value="user">user</option>
                      <option value="streamer">streamer</option>
                      <option value="admin">admin</option>
                    </select>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-9 my-1">
            <input type="text" className="form-control" placeholder="email.." onChange={(e)=>setEmail(e.target.value)} />
            </div>
          </div>
        </div>

            <div className="container-fluid my-5 px-4">
            
          {isLoading ?
           <div style={{marginTop : "200px" }} className="text-center">
             <div className="spinner-border text-primary" role="status" >
                <span className="visually-hidden">Loading...</span>
             </div>
           </div> :
          <div className="row">
            {accounts && accounts.map((account)=>(
                <UserA key={account._id} {...account} />
            ))}

            {accounts && <Pagination total={total} setPage={(page)=>setPage(page)} page={page} />}

            {((total===0) || (accounts && Object.keys(accounts).length===0)) && <div className="text-center">
              <img className="img-fluid" alt="no accounts.." src="./assets/illustrations/nochannels.svg" style={{width :"300px" , marginLeft:"auto" , marginRight :"auto"}} />
              <h3 className="text-primary mt-3">ops! there's no results..</h3>
              </div>}

          </div>}
        </div>
        </div>
    )

}
export default AdminUsers;