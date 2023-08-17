import AdminNav from "../components/adminNav";
import { useEffect, useState } from "react";
import ChannelA from "../components/channel-a";
import { useChannelContext } from "../hooks/useChannelContext";
import { useAuthContext } from "../hooks/useAuthContext" 
import Pagination from "../components/pagination";

function AdminChannels () {

    const {channels , dispatch} = useChannelContext()
    const {user} = useAuthContext ()
    const [search , setSearch] = useState('')
    const [location , setLocation] = useState('')
    const [category , setCategory] = useState('')
    const [isLoading , setIsLoading] = useState(false)
    const [page,setPage]=useState(1)
    const [total , setTotal]=useState(null)
    

    useEffect(()=>{
        dispatch({type:'EMPTY'})
        setIsLoading(true)
        const fetchChannels = async ()=>{
          const response = await fetch(`/api/channels?valide=true&page=${page}&search=${search}&location=${location}&category=${category}`,{
            headers :{
              'authorization' : `Bearer ${user.token}`
            }
              
          })
          const json = await response.json()
    
          if(response.ok){
            dispatch({type:'GET_CHANNELS', payload:json.channels})
            setTotal(json.total)
            setIsLoading(false)
          }
          if(!response.ok){
            alert(json.err)
            setIsLoading(false)
          }
    
        }
        if(user){
          fetchChannels()
        }
          },[dispatch , user , search , category , location , page])

   return (
    <div>
        <AdminNav />

        <div className="container-sm my-4 ">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-4 col-sm-9 my-1">
              <div className="input-group">
                <span className="input-group-text bg-primary2 text-white fw-bold border-primary2"><i className="bi bi-search"></i></span>
                <input type="text" className="form-control" placeholder="Search a channel.." onChange={(e)=>{setSearch(e.target.value)}} />
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-9 my-1">
            <select className="form-select" aria-label="Default select example" onChange={(e)=>setCategory(e.target.value)}>
                      <option value="all" >All categories</option>
                      <option value="category-one">category-One</option>
                      <option value="category-two">category-Two</option>
                      <option value="category-three">category-Three</option>
                    </select>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-9 my-1">
            <input type="text" className="form-control" placeholder="location.." onChange={(e)=>setLocation(e.target.value)} />
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
            {channels && channels.map((channel)=>(
                <ChannelA key={channel._id} {...channel} />
            ))}

            {channels && <Pagination total={total} setPage={(page)=>setPage(page)} page={page} />}

            {((total===0) || (channels && Object.keys(channels).length===0)) && <div className="text-center">
              <img className="img-fluid" alt="no channels.." src="./assets/illustrations/nochannels.svg" style={{width :"300px" , marginLeft:"auto" , marginRight :"auto"}} />
              <h3 className="text-primary mt-3">ops! there's no results..</h3>
              </div>}

          </div>}
        </div>

    </div>
   )
}
export default AdminChannels ;