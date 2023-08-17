import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";
import Tippy from '@tippyjs/react';
import {  useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';

function Signin(){

    const {dispatch} = useAuthContext()

    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('') 
    const [isLoading , setIsLoading] = useState(null)
    const [err , setErr] = useState(null)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let navigate  = useNavigate()
    const navigateUser=()=>{
      let role='user'
      navigate(`/Register/${role}`)
    }

    const navigateStreamer=()=>{
      let role='streamer'
      navigate(`/Register/${role}`)
    } 

    const fetchMessages = async (token) => {
      const response = await fetch('/api/content',{ 
        headers : {
            'authorization' : `Bearer ${token}`
          }
    })
    const json = await response.json()
    if(!response.ok){
      console.log(json.err)
    }}

    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = {email, password} 
        setIsLoading(true)
        const uri= '/api/auth/signin'
        const response = await fetch(uri, { 
         method: 'POST',
         body: JSON.stringify(user),
         headers: {
           'Content-Type': 'application/json'
         }
       })
   
           const json = await response.json()
           if(!response.ok){
             setErr(json.err)
             setIsLoading(false)
           }
           if(response.ok){
             //save the user to local storage

             let tkn = {}
             tkn.email=json.user.email
             tkn.token=json.token 
             tkn.role=json.user.role            
             localStorage.setItem('user' , JSON.stringify(tkn))

             //updating the context
             dispatch({type:'SIGNIN' , payload:tkn}) ;

             if(json.user.role==='user'){fetchMessages(json.token)}
      
              setErr(null)
              setEmail('')
              setPassword('')
              setIsLoading(false) 
              navigate(`/${json.user.role}`)
           }
          
       }

    return(
<div className="bg-light-subtle"> 

 <div className="container-lg  py-5">
  <div className="row justify-content-center align-items-center">
   <div className="col-6 ">
    <img className="img-fluid d-none d-md-block" src="./assets/illustrations/login.svg" alt="..."/>
   </div>
    <div className="col-10 col-md-5 shadow rounded-5 text-primary py-5 bg-white">
      <div className=" px-3">
       <p className="h3 fw-bold text-center">Welcome back!</p>
       <form onSubmit={handleSubmit}>
       <div className="form-group mt-5">

         <input 
         type="email" 
         className="form-control mt-3 "
         onChange={(e)=>setEmail(e.target.value)}
         value={email}
         placeholder="email" ></input>

         <input 
         type="password" 
         className="form-control mt-3 "
         onChange={(e)=>setPassword(e.target.value)}
         value={password} 
         placeholder="password" ></input>
         {err && <small><small className="text-danger text-sm fw-semibold mx-2 my-1" style={{position : "absolute" }}><i className="bi bi-exclamation-circle-fill"></i> {err}</small></small>}

         <div className="text-center py-2">
         <div className="mt-4 align-items-center">
           <button type="submit" className="btn btn-secondary text-white fw-bold rounded-pill" disabled={isLoading}>{isLoading ? <div className="d-flex align-items-center justify-content-center mx-2">
            <div>Sign in</div>
            <div className="spinner-border spinner-border-sm text-white ms-2" role="status">
            <span className="visually-hidden">Loading...</span>
            </div>
           </div> : <div className="mx-4">Sign in</div>}</button>
           <Link to="/" className="text-muted text-decoration-none fw-semibold mx-2">Cancel</Link>
         </div>
         <p className="mt-4 text-primary2">you don't have an account?  <span type="button" onClick={handleShow} className="text-primary fw-bold">Register</span></p>
         </div>
         <Modal show={show} onHide={handleClose}  size="lg" centered>
        <Modal.Body>
            <div className="row justify-content-around align-items-center rounded-5 p-3">
              <div className="col-10 col-lg-5 text-center py-3 ">
              <img className="img-fluid " src="./assets/illustrations/user.svg" alt="user" style={{objectFit:"cover"}} width="200" height="200" /> 
              <p className="h6 fw-semibold text-primary2 pt-3 pb-1">Create a user account and start your journey with us, there is a lot waiting for you to discover!.</p>
              <button className="mt-2 btn btn-primary" onClick={navigateUser}><span className=" fw-semibold px-2 ">Get Started</span></button>
              </div>
              <div className="col-10 col-lg-5 text-center py-3 ">
              <img className="img-fluid " src="./assets/illustrations/channel.svg" alt="..." style={{objectFit:"cover"}}  width="200" height="200"/>
              <p className="h6 fw-semibold text-primary2 pt-3 pb-1">Register as a Streamer and manage lots of channels and deliever your content all over the world !</p>
              <button className="mt-2 btn btn-primary" onClick={navigateStreamer}><span className=" fw-semibold px-2 ">Get Started</span></button>
              </div>
      </div>
        </Modal.Body>
        </Modal>
         
</div>
</form>

     </div>
   </div>
  </div>
 </div>

 <footer className=" justify-content-between align-items-center py-4 mt-5">
 <div className="row justify-content-center mx-1 pt-2 pb-4">
  <div className="col-10 col-md-4">
    <h5 className="text-primary fw-semibold"><Link to="/" className="text-decoration-none"><img src="./assets/logo/get_notified_logo.png"  alt="Get Notified" width="30" lenght="30"/>  Get <span className="text-secondary bg-primary py-1 px-2 rounded-1 ">Notified</span></Link></h5>
    <p className="text-muted">Designed and built with all the love in the world by the Get Notified team, with the help of our contributors.</p>
    <p className="text-muted">Currently v1.0.0</p>    
  </div>
  <div className="col-8 col-md-2">
    <h6 className="fw-semibold text-primary">Platform</h6>
    <p><a className="text-muted text-decoration-none" href="#intro">Overview</a></p>
    <p><a className="text-muted text-decoration-none" href="#discover">Features</a></p>
    <p><a className="text-muted text-decoration-none" href="#intro">About</a></p>
  </div>
  <div className="col-8 col-md-3">
    <h6 className="fw-semibold text-primary">Help? <Tippy content="currently inavailable"><i className="bi bi-info-circle"></i></Tippy></h6>
    <div className="text-muted">
      <p>How does it work?</p>
      <p>Where to ask questions?</p>
      <p>What is needed for this?</p>
    </div>
  </div>
  <div className="col-8 col-md-2">
    <h6 className="fw-semibold text-primary">contact</h6>
    <div className="text-muted">
      <p>(213) 123-456-789</p>
      <p>123 city Gn </p>
      <p>bejaia, Bejaia 06001</p>
    </div>
  </div>
 </div>
 <div className="d-flex flex-wrap justify-content-between align-items-center pt-3 ps-5 ">
  <div className="col-md-4 d-flex align-items-center">
    <span className="text-muted fw-semibold">© Get Notified 2023. All rights reserved</span>
  </div>
  <ul className="nav col-md-4 justify-content-end list-unstyled d-flex pe-5 me-5">
      <li className="ms-3"><a className="text-muted" href="https://www.facebook.com"><img src="./assets/icon/Facebook.png" alt="facebook" width="35" height="35"/></a></li>
      <li className="ms-3"><a className="text-muted" href="https://www.instagram.com"><img src="./assets/icon/Instagram.png" alt="instagram" width="35" height="35"/></a></li>
      <li className="ms-3"><a className="text-muted" href="https://www.twitter.com"><img src="./assets/icon/Twitter.png" alt="twitter" width="35" height="35"/></a></li>
  </ul>
 </div>
 </footer>

</div>
    )
}
export default Signin ;