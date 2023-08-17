import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link, useParams } from "react-router-dom";
import Tippy from '@tippyjs/react';
import {  useNavigate } from "react-router-dom";


function Register(){

    const {dispatch} = useAuthContext()

    const [fname , setFname] = useState('')
    const [lname , setLname] = useState('') 
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [isLoading , setIsLoading] = useState(null)
    const [err , setErr] = useState(null)
    const navigate = useNavigate() 
    const {role} = useParams()

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
        
        const user = {fname , lname ,email, password ,role} 
        setIsLoading(true)
          
        const response = await fetch('/api/auth/register', {
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
            dispatch({type:'SIGNIN' , payload:tkn})

            if(json.user.role==='user'){fetchMessages(json.token)}

             setErr(null)
             setFname('')
             setLname('')
             setEmail('')
             setPassword('')
             setIsLoading(false)  
             navigate(`/${json.user.role}`) 
           }
          
       }

    return(
<div className="bg-light-subtle">
  <div className="container-lg  py-4">
    <div className="row justify-content-center align-items-center">
      <div className="col-6 ">
        <img className="img-fluid d-none d-md-block" src="./assets/illustrations/signup.svg" alt="signup"/>
      </div>
      <div className="col-10 col-md-5 bg-white shadow rounded-5 px-3 text-primary py-4 ">
      
        <div className="text-center">
          <p className="h3 fw-bold">Welcome!</p>
          <p className="text-primary2"  >{role==='user' ? "Create a user account and start your journey with us, there is a lot waiting for you to discover!" : "Register as a Streamer and manage lots of channels and deliever your content all over the world !"} </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group  px-2">
            <div className="row justify-content-center">

              <div className="col-12 col-md-6">
                <input 
                type="text" 
                className= "form-control "
                onChange={(e)=>setFname(e.target.value)}
                value={fname}
                placeholder="first name" ></input>
              </div>

              <div className="col-12 col-md-6">
                <input 
                type="text" 
                className= "form-control "
                onChange={(e)=>setLname(e.target.value)}
                value={lname}
                placeholder="last name" ></input>
              </div>

              <div className="col-12">
                 <input 
                 type="email" 
                 className= "form-control mt-3"
                 onChange={(e)=>setEmail(e.target.value)}
                 value={email}
                 placeholder="e-mail" ></input>
              </div>

              <div className="col-12">
                 <input 
                 type="password" 
                 className="form-control mt-3"
                 onChange={(e)=>setPassword(e.target.value)}
                 value={password}
                 placeholder="password" ></input>
              </div> 

     </div>
     {err && <small><small className="text-danger text-sm fw-semibold mx-2 my-1" style={{position : "absolute" }}><i className="bi bi-exclamation-circle-fill"></i> {err}</small></small>}
     <div className="text-center py-2">
      <div className="mt-4 align-items-center">
        <button type="submit" className="btn btn-secondary text-white fw-bold rounded-pill" disabled={isLoading} >{isLoading ? <div className="d-flex align-items-center justify-content-center mx-3">
            <div>Register</div>
            <div className="spinner-border spinner-border-sm text-white ms-2" role="status">
            <span className="visually-hidden">Loading...</span>
            </div>
           </div> : <div className="mx-4">Register</div>}</button>
        <Link to="/" className="text-muted text-decoration-none fw-semibold mx-3">Cancel</Link>
      </div>
      <p className="mt-4 text-primary2">you already have an account?  <Link to="/Signin" className="text-decoration-none text-primary fw-bold">Login</Link></p>
     </div>
</div>
</form>
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
export default Register ;