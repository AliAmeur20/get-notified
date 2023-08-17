import UserNav from "../components/userNav"
import { useEffect, useState  } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import ChannelU from "../components/channel-u"
import Modal from 'react-bootstrap/Modal';
import { useAccountContext } from "../hooks/useAccountContext";
import Pagination from "../components/pagination";


function UserProfile () {

    
    const [mychannels , setMychannels] = useState()
    const [total , setTotal] = useState(null)
    const [isLoading , setIsLoading] = useState(false)
    const [isfLoading , setIsfLoading] = useState(false)
    const [err , setErr] = useState (null)
    const {user} = useAuthContext ()
    const {account , dispatch} = useAccountContext ()
    const [show, setShow] = useState(false);
    const [page , setPage] = useState(1)
    const handleClose = () => {setShow(false);setErr(null)}
    const handleShow = () => setShow(true);
    
    useEffect(()=>{
        const getMyChannels = async () => {
            setIsfLoading(true)
            const response = await fetch (`/api/subscribtions/mychannels?page=${page}`,{
              headers : {
                'authorization' : `Bearer ${user.token}`
              }
            })
            const json = await response.json()
            if(response.ok){
              setMychannels(json.mychannels)
              setTotal(json.total)
              setIsfLoading(false)
            }else{
              alert(json.err)
              setIsfLoading(false)
            }
          }
        if(user){
            getMyChannels()
        }
        
    },[user,page])

    const handleSubmit = async (e) => {
      e.preventDefault()
      const prof = {fname , lname ,uemail, password , image} 
      setIsLoading(true)
        
      const response = await fetch('/api/accounts/', {
       method: 'PATCH',
       body: JSON.stringify(prof),
       headers: {
         'Content-Type': 'application/json',
         'authorization' : `Bearer ${user.token}`
       }
     })
 
        const json = await response.json()
         if(!response.ok){
           setErr(json.err)
           setIsLoading(false)
         }
         if(response.ok){

          //updating the context
          dispatch({type:'GET_ACCOUNT' , payload:json})
           setErr(null)
           setPassword('')
           setIsLoading(false)  
           handleClose() 
         }
        
     }

    const {firstName,lastName,img,email} = {...account}
    const [fname , setFname] = useState('')
    const [lname , setLname] = useState('') 
    const [uemail , setUemail] = useState('')
    const [password , setPassword] = useState('')
    const [image , setImage] = useState (null)

    function imgConverrt (e) {
        const reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
          setImage(reader.result)
        }
        reader.onerror = error => {
          console.log(error)
        }
    }

    return(
        <div>
            <UserNav  /> 
            <div className="container my-5 py-5 px-4 bg-light ">
        <div className="row align-items-center mx-2  ">
            <div className="col-lg-3 col-md-4 text-center text-lg-start text-md-start my-2 ">
                <img className="shadow rounded-circle" src={img} alt="..." width="200" height="200"  style={{objectFit: "cover"}}/>
            </div>
            <div className="col-lg-7 col-md-8  text-center text-lg-start text-md-start ">
                <p className="h2 text-primary fw-bold">{firstName} {lastName}</p>
                <p className=" text-muted fw-semibold">{email}</p>
            </div>
            <div className="col-12  text-end"><button onClick={handleShow} className="btn btn-primary2 px-3"><i className="bi bi-pencil-fill"></i> Edit profile</button></div>
        </div>
        </div>
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size="lg" centered>
        <Modal.Body>
            <div className="row justify-content-center align-items-center rounded-5">
              <div className="col-10    text-primary py-2 ">
                <div className="border-bottom pb-3 mx-5 text-center">
                  <p className="h4 fw-semibold ">Edit Profile</p>
                </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group  mt-4 px-2">
                  <div className="row justify-content-center">
                    <div className="col-12 col-md-6">
                      <input type="text" className="form-control my-2" placeholder={firstName} onChange={(e)=>setFname(e.target.value)} />
                    </div>
                    <div className="col-12 col-md-6">
                      <input type="text" className="form-control my-2" placeholder={lastName} onChange={(e)=>setLname(e.target.value)} />
                    </div>
                    <div className="col-12">
                      <input type="email" className="form-control my-2" placeholder={email} onChange={(e)=>setUemail(e.target.value)} />
                    </div>
                    <div className="col-12 input-group my-2">
                      <input type="file" className="form-control " accept="image/*" onChange={imgConverrt} />
                      <span className="input-group-text bg-light "  ><i className="bi bi-image-fill"></i></span>
                    </div>
                    <div className="col-12">
                      <input type="password" className="form-control mt-2" placeholder="new password ..." onChange={(e)=>setPassword(e.target.value)} /> 
                    </div>
                  </div> 
                  {err && <small><small className="text-danger text-sm fw-semibold mx-2" style={{position : "absolute" }}><i className="bi bi-exclamation-circle-fill"></i> {err}</small></small>}  
                  <div className="mt-4 align-items-center text-center">
                    <button className="btn btn-primary text-white fw-bold" type="submit" disabled={isLoading}> save changes {isLoading && <div className="spinner-border spinner-border-sm ms-1" role="status">
        <span className="visually-hidden">Loading...</span>
        </div>}</button>
                    <span className="text-muted text-decoration-none fw-semibold mx-4" type="button" onClick={handleClose} >Cancel</span>
                  </div>
                </div>
            </form>
        </div>
      </div>
        </Modal.Body>
        </Modal>
        <div><div className="container my-4 rounded-2 py-4 px-5 bg-light">
          <div className="col-12 text-center text-md-start text-lg-start text-xl-start text-xxl-start pb-2 px-3 d-flex align-items-center">
            <div className="item"><p className=" h3 text-primary  fw-bold">Following</p></div>
            <div className="item pt-1"><p className="h5 mx-5 text-primary2 fw-semibold">{total}</p></div> 
          </div>
          {isfLoading ?
        <div style={{margin: "150px" }} className="text-center">
        <div className="spinner-border text-primary" role="status" >
           <span className="visually-hidden">Loading...</span>
        </div>
      </div>  
        :<div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 ">
          {mychannels && mychannels.map((mc)=>(
            <ChannelU key={mc.channel_id._id} {...mc.channel_id} />
          ))}   
          </div>}
          {mychannels && <Pagination total={total} setPage={(page)=>setPage(page)} page={page} />}


          {total === 0 && <h4 className="text-muted fw-semibold text-center m-5"> you're not following any channels at the moment!</h4>}
        </div>

        

        </div>
        
        </div>
    )

}
export default UserProfile ;