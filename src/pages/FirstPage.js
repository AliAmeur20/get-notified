import { Link,useNavigate } from "react-router-dom";
//import Tooltip from "../components/tooltipp";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Modal from 'react-bootstrap/Modal'; 
import { useState } from "react";

function FirstPage() {

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
    

    return (
<div >
 <nav className="navbar mx-2 py-2">
  <div className="container-fluid">
  <a className="fw-bold text-primary text-decoration-none" href="#intro">  <img src="./assets/logo/get_notified_logo.png"  alt="Get Notified" width="30" lenght="30"/> Get <span className="text-secondary bg-primary py-1 px-2 rounded-1 ">Notified</span></a>
    <Link className="btn btn-outline-primary2 navbar-btn" to="/Signin" ><span className="fw-semibold ">Signin</span></Link>
  </div>
 </nav>

<section id="intro">
 <div className="container-fluid" >
  <div className=" mb-1 " >
   <div className="row justify-content-center align-items-center">
    <div className="col-10 col-md-5 text-primary ">
      <div className="py-1  text-center text-md-start">
        <p className=" h1 fw-bold">Get <span className="text-secondary">What</span> you want, wherever <span className="text-secondary">you Want!</span></p>
        <h4 className="fw-semibold">here, you will find the best channels that suit what you're looking for ...</h4>
      </div>
      <div className=" py-2 my-2 text-center text-md-start">
        <button className="btn btn-primary" onClick={handleShow}><span className=" fw-semibold px-2 ">Get Started</span></button>
        <a className="text-decoration-none" href="#discover"> <button className="btn btn-outline-primary" ><span className="fw-semibold"> Discover </span></button> </a>
      </div>
    </div>
    <div className="col-6 d-none d-md-block px-2">
      <img src="./assets/illustrations/cuate.svg" alt="get notified" className="img-fluid m-5 "/>
    </div>
    </div>
  </div>
 </div>
</section>

<section id="discover">
 <div className="container  my-5 py-2 text-center ">
  <div className="row justify-content-center align-items-center  my-5 pt-2 pb-5  ">
   <div className="col-10 col-sm-5 text-center text-sm-start">
    <p className=" h3 fw-bold text-primary "> Sign up as a User and take advantage of our huge combination of channels. </p>
    <p className="h6 fw-semibold text-primary2">have an account and begin your journey with Get Notified, and be able to reach lots and lots of good quality and useful channels.</p>
    <button className="mt-2 btn btn-primary" onClick={navigateUser}><span className=" fw-semibold px-2 ">Get Started</span></button>           
   </div>
   <div className="col-10 col-sm-7 my-1">
     <img className="img-fluid " src="./assets/illustrations/user.svg" alt="user"/>
    </div>
  </div>
  <div className="row justify-content-center align-items-center  my-5 py-5 ">
    <div className="col-10 col-sm-7">
      <img className="img-fluid " src="./assets/illustrations/channel.svg" alt="..."/>
    </div>
    <div className="col-10 col-sm-5 text-center text-sm-start ">
      <p className=" h3 fw-bold text-primary "> Be a channel owner with us and be able to send your content to lots of your future followers. </p>
      <p className="h6 fw-semibold text-primary2">have a channel account with us and be able send your content to thousends and more from our users.</p>
      <button className="mt-2 btn btn-primary" onClick={navigateStreamer}><span className=" fw-semibold px-2 ">Get Started</span></button>           
    </div>
  </div>
  <div className="row justify-content-center align-items-center  my-5 pt-2 pb-5  ">
    <div className="col-10 col-sm-5 text-center text-sm-start ">
      <p className=" h3 fw-bold text-primary "> We have been improving our product for a really long time, so you can have the best experience. </p>
      <p className="h6 fw-semibold text-primary2">we offer you a high quality,easy to use,secured product that you cans manage your stuff with your eyes almost close.</p>
      <button className="mt-2 btn btn-primary" onClick={handleShow}><span className=" fw-semibold px-2 ">Get Started</span></button>           
    </div>
    <div className="col-10 col-sm-7 my-2">
      <img className="img-fluid" src="./assets/illustrations/improving_product.svg" alt="..."/>
    </div>      
  </div>
  <div className="row justify-content-center align-items-center  my-5 py-5 ">
    <div className="col-10 col-sm-7">
      <img className="img-fluid " src="./assets/illustrations/practice_anywhere.svg" alt="..."/>
    </div>
    <div className="col-10 col-sm-5 text-center text-sm-start ">
      <p className=" h3 fw-bold text-primary "> You can practice at any time, anywhere that's convenient for you.  </p>
      <p className="h6 fw-semibold text-primary2">go wherever you want and get notified will assure that you will really, get notified.</p>
      <button className="mt-2 btn btn-primary" onClick={handleShow}><span className=" fw-semibold px-2 ">Get Started</span></button>           
    </div>
  </div>
 </div>
</section>

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

<footer className=" justify-content-between align-items-center py-4 mt-5">
 <div className="row justify-content-center mx-1 pt-2 pb-4">
  <div className="col-10 col-md-4">
    <h5 className="text-primary fw-semibold"><a href="#intro" className="text-decoration-none"><img src="./assets/logo/get_notified_logo.png"  alt="Get Notified" width="30" lenght="30"/>  Get <span className="text-secondary bg-primary py-1 px-2 rounded-1 ">Notified</span></a></h5>
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
 <div className="d-flex flex-wrap justify-content-between align-items-center pt-3 px-5 ">
  <div className="col-md-4 d-flex align-items-center">
    <span className="text-muted fw-semibold">© Get Notified 2023. All rights reserved</span>
  </div>
  <ul className="nav col-md-4 justify-content-end list-unstyled d-flex me-5">
      <li className="ms-3"><a className="text-muted" href="https://www.facebook.com"><img src="./assets/icon/Facebook.png" alt="facebook" width="35" height="35"/></a></li>
      <li className="ms-3"><a className="text-muted" href="https://www.instagram.com"><img src="./assets/icon/Instagram.png" alt="instagram" width="35" height="35"/></a></li>
      <li className="ms-3"><a className="text-muted" href="https://www.twitter.com"><img src="./assets/icon/Twitter.png" alt="twitter" width="35" height="35"/></a></li>
  </ul>
 </div>
</footer>
</div>
      );
  }
  
  export default FirstPage;