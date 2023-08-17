import { Link } from "react-router-dom";
import Tippy from '@tippyjs/react';
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useAccountContext } from "../hooks/useAccountContext";
import {useChannelContext} from "../hooks/useChannelContext"
import Collapse from 'react-bootstrap/Collapse';
import Modal from 'react-bootstrap/Modal';

function StreamerNav () {

    const {dispatch} = useAuthContext ()
    const {user} = useAuthContext ()
    const {channels , dispatch : addCh} = useChannelContext()
    const { account , dispatch : change } = useAccountContext() 
    const [show, setShow] = useState(false);
    const [mshow, setMshow] = useState(false);
    const handlClose = () => {setMshow(false);setErr(null);setCategory(null)}
    const handlShow = () =>  setMshow(true);
    const [open, setOpen] = useState(false);
    const [title , setTitle] = useState('')
    const [bio , setBio] = useState('')
    const [location , setLocation] = useState('')
    const [category , setCategory] = useState(null)
    const [isLoading , setIsLoading] = useState(null)
    const [err , setErr] = useState (null)
    const [sshow , setSshow] = useState(null)
    const handleeClose = () => {setSshow(false);setErr(null)}
    const handleeShow = () =>  setSshow(true);
    const [fb , setFb] = useState(null)
    
  const handleClose = () => {setShow(false);setErr(null)}
  const handleShow = () => setShow(true);

    

    const {_id,firstName,lastName,email,img} = {...account}
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        let ch_email = email 
        const channel = {title,ch_email, bio,location,category} 
        setIsLoading(true)
        const response = await fetch('/api/channels/', {
         method: 'POST',
         body: JSON.stringify(channel),
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
            setIsLoading(false)
            handlClose()
             setErr(null)
             setTitle('')
             setBio('')

             addCh({type:'ADD_CHANNEL' , payload:json})
           }
          
       }

       const handleFB = async (e) => {
        e.preventDefault() 
        const fbmsg = fb
        const feedback = {fbmsg} 
        setIsLoading(true)
        const response = await fetch('/api/feedback/', {
         method: 'POST',
         body: JSON.stringify(feedback),
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
            setIsLoading(false)
            handleeClose()
             setErr(null)
             setFb(null)
           }
          
       }

    const signout = () => {
      //remove user from localStorage
       localStorage.removeItem('user') 
      //dispatch signout action to make the context null
       dispatch ({type:'SIGNOUT'})
       change ({type:'DELETE_ACCOUNT'})
    }

    

    return(
    <div>
      <nav className="navbar px-2 py-1">
        <div className="container-fluid ">
         <Link className="fw-bold text-primary text-decoration-none" to="/streamer"><div className="mt-1"> <img src="./assets/logo/get_notified_logo.png"  alt="Get Notified" width="33" lenght="33"/>  Get <span className="text-secondary bg-primary py-1 px-2 rounded-1 ">Notified</span></div></Link>
         <Tippy content="account">
           {account ? <img className="rounded rounded-circle " type="button" src={img} style={{objectFit:"cover"}} alt="" width="45" height="45" onClick={handleShow}/> : <div className="spinner-border spinner-border-sm m-1 text-primary" role="status">
  <span className="visually-hidden">Loading...</span>
</div>}
         </Tippy>
         <Offcanvas show={show} onHide={handleClose} placement='end' style={{maxWidth : "270px"}} >
         <Offcanvas.Header className="mt-3 mx-2 py-2  " >
         <Link to={`/streamer/profile/${_id}`} className="text-decoration-none text-primary h5 fw-semibold d-flex align-items-center "><img className="mx-1 rounded-circle" src={img} alt="..." width="40" height="40" style={{objectFit : "cover"}}/><span className="ms-2">{firstName} {lastName} </span></Link>
          </Offcanvas.Header>
          <Offcanvas.Body>
          <div className="  py-2 " >  
            <span className="text-primary2 h6" type="button" onClick={() => setOpen(!open)} aria-controls="example-collapse-content" aria-expanded={open} ><img  className="mx-2" src="./assets/illustrations/admin-channel.svg" alt="..." width="25" lenght="25"/>My channels</span> 
            <Collapse in={open}>
             <div id="example-collapse-content">
             {channels && channels.map((channel)=>(  
                    <div key={channel._id} className="mt-1 pb-1 d-flex" style={!channel.isValide ? {pointerEvents: "none", opacity: "0.4"} : {}} >
                        <Link className="text-decoration-none" to={`/streamer/channel/${channel._id}`} type="button" onClick={handleClose} >
                        <img className="me-1 rounded " src={channel.ch_img} style={{objectFit:"cover"}} alt="" width="40" height="30"/>
                        <span className="text-primary fw-semibold" >{channel.title} {!channel.isValide && <small className="text-success" ><small>(not valid yet)</small></small>} {channel.isBlocked && <small className="text-danger" ><small>(blocked)</small></small>}</span>  
                        </Link>
                    </div>
             ))}
             </div>
      </Collapse>
          </div>
          <div className="pb-4 pt-1 " >  
            <span className="text-primary2 h6" type="button" onClick={handlShow}><img  className="mx-2" src="./assets/illustrations/add-channel.svg" alt="..." width="25" lenght="25"/>Add Channel</span> 
            <Modal show={mshow} onHide={handlClose} backdrop="static" keyboard={false} size="lg" centered>
            <Modal.Body><div className="row justify-content-center align-items-center rounded-5">
              <div className="col-10    text-primary py-2 ">
                <div className="border-bottom pb-3 mx-5 text-center">
                  <p className="h4 fw-semibold ">Create Channel</p>
                </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group  mt-4 px-2">
                  <div className="row justify-content-center">
                    <div className="col-12 mt-3">
                      <input type="text" className="form-control" placeholder="title" onChange={(e)=>setTitle(e.target.value)} />
                    </div>
                    <div className="col-12 mt-2">
                      <input type="text" className="form-control" placeholder="location" onChange={(e)=>setLocation(e.target.value)} />
                    </div>
                    <div className="col-12 mt-2">
                    <select className="form-select" aria-label="Default select example" onChange={(e)=>setCategory(e.target.value)}>
                      <option >category</option>
                      <option value="category-one">category-One</option>
                      <option value="category-two">category-Two</option>
                      <option value="category-three">category-Three</option>
                    </select>
                    </div>
                    <div className="col-12 mt-2">
                      <div className="form-floating">  
                      <textarea className="form-control" placeholder="Bio ..." id="floatingTextarea2" style={{height : "100px"}} onChange={(e)=>setBio(e.target.value)}></textarea>
                      <label htmlFor="floatingTextarea2">Bio...</label>
                      </div>
                    </div>
                  </div> 
                  {err && <small><small className="text-danger text-sm fw-semibold mx-2" style={{position : "absolute" }}><i className="bi bi-exclamation-circle-fill"></i> {err}</small></small>}  
                  <div className="mt-4 align-items-center text-center">
                    <button className="btn btn-primary text-white fw-bold" type="submit" disabled={isLoading}> Create {isLoading && 
                    <div className="spinner-border spinner-border-sm text-white ms-1" role="status">
                    <span className="visually-hidden">Loading...</span>
                    </div>}</button>
                    <span className="text-muted text-decoration-none fw-semibold mx-4" type="button" onClick={handlClose} >Cancel</span>
                  </div>
                </div>
            </form>
        </div>
      </div></Modal.Body>
            </Modal>
          </div>
            
            <div className="  px-2  pb-4 pt-3 " >
             <Tippy content="currently disabled">
              <a className="text-decoration-none text-primary2 h6 " href="#s"  ><img  className="mx-2" src="./assets/illustrations/setting.svg" alt="..." width="25" lenght="25"/>Settings</a> 
             </Tippy>
            </div> 
            <div className=" px-2  pb-4 pt-1  " >
             <Tippy content="currently disabled">
              <a className="text-decoration-none text-primary2 h6 " href="#s" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="currently disabled" ><img  className="mx-2" src="./assets/illustrations/help&support.svg" alt="..." width="25" lenght="25"/>Hels & support</a>
             </Tippy>
            </div>
          <div className=" px-2 pb-4 pt-1 " >
          <span className="text-decoration-none text-primary2 h6 " type="button" onClick={handleeShow}><img  className="mx-2" src="./assets/illustrations/feedback.svg" alt="..." width="25" lenght="25"/> Send Feedback</span>
          </div>
          <div className=" px-3 pt-3">
            <p className="text-decoration-none text-primary2 h6 fw-semibold" type="button" onClick={signout} ><img  className="mx-1" src="./assets/illustrations/logout.svg" alt="..." width="25" lenght="25"/> Log Out</p>
          </div>
          </Offcanvas.Body>
          </Offcanvas>
          <Modal show={sshow} onHide={handleeClose} backdrop="static" keyboard={false} size="lg" centered>
            <Modal.Body><div className="row justify-content-center align-items-center rounded-5">
              <div className="col-10    text-primary py-2 ">
                <div className="border-bottom pb-3 mx-5 text-center">
                  <p className="h4 fw-semibold ">Send FeedBack</p>
                </div>
            <form onSubmit={handleFB}>
                <div className="form-group  mt-4 px-2">
                  <div className="row justify-content-center">
                    <div className="col-12 mt-2">
                      <div className="form-floating">  
                      <textarea className="form-control" placeholder="write feedback.." id="floatingTextarea2" style={{height : "120px"}} onChange={(e)=>setFb(e.target.value)}></textarea>
                      <label htmlFor="floatingTextarea2">write feedback..</label>
                      </div>
                    </div>
                  </div> 
                  {err && <small><small className="text-danger text-sm fw-semibold mx-2" style={{position : "absolute" }}><i className="bi bi-exclamation-circle-fill"></i> {err}</small></small>}  
                  <div className="mt-4 align-items-center text-center">
                    <button className="btn btn-primary text-white fw-bold" type="submit" disabled={isLoading}> send {isLoading && 
                    <div className="spinner-border spinner-border-sm text-white ms-1" role="status">
                    <span className="visually-hidden">Loading...</span>
                    </div>}</button>
                    <span className="text-muted text-decoration-none fw-semibold mx-4" type="button" onClick={handleeClose} >Cancel</span>
                  </div>
                </div>
            </form>
        </div>
      </div></Modal.Body>
            </Modal>
        </div>
      </nav>
    </div>
    )
}

export default StreamerNav ;