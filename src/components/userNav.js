import { Link } from "react-router-dom";
import Tippy from '@tippyjs/react';
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useAccountContext } from "../hooks/useAccountContext";
import Modal from 'react-bootstrap/Modal';

function UserNav () {
  const {user} = useAuthContext()
    const {dispatch} = useAuthContext ()
    const { account , dispatch : change } = useAccountContext() 
    const [show, setShow] = useState(false);
    const handleClose = () => {setShow(false);setErr(null)}
    const handleShow = () => setShow(true);
    const [mshow, setMshow] = useState(false);
    const [fb , setFb] = useState(null)
    const [err , setErr] = useState (null);
    const [isLoading , setIsLoading] = useState(null);
    const [islLoading , setIslLoading] = useState(null)
    const handlClose = () => {setMshow(false);setErr(null)}
    const handlShow = () =>  setMshow(true);
 
    

    const {_id,firstName,lastName,img} = {...account}

    const signout =async () => {
      setIslLoading(true)
      const response = await fetch( `/api/content/signout`,{
        headers : {
          'authorization' : `Bearer ${user.token}`
        }
      })
      const json = await response.json()
    
          if(response.ok){
            //remove user from localStorage
       localStorage.removeItem('user') 
       //dispatch signout action to make the context null
        dispatch ({type:'SIGNOUT'})
        change ({type:'DELETE_ACCOUNT'})
        setIslLoading(false)
           
          }
          if(!response.ok){
            alert(json.err)
            setIslLoading(false)
          }
      
    }

    const handleSubmit = async (e) => {
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
          handlClose()
           setErr(null)
           setFb(null)
         }
        
     }

    

    return(
    <div>
      <nav className="navbar px-2  py-1 ">
        <div className="container-fluid ">
        <Link className="fw-bold text-primary text-decoration-none" to="/user"><div className="mt-1"> <img src="./assets/logo/get_notified_logo.png"  alt="Get Notified" width="33" lenght="33"/>  Get <span className="text-secondary bg-primary py-1 px-2 rounded-1 ">Notified</span></div></Link>
         <Tippy content="account">
           {account ? <img className="rounded rounded-circle" type="button" src={img} style={{objectFit:"cover"}} alt="" width="45" height="45" onClick={handleShow}/> : <div className="spinner-border spinner-border-sm m-1 text-primary" role="status">
  <span className="visually-hidden">Loading...</span>
</div>}
         </Tippy>
         <Offcanvas show={show} onHide={handleClose} placement='end' style={{maxWidth : "260px"}} >
         <Offcanvas.Header className="mt-3">
           <Link to={`/user/profile/${_id}`} className="text-decoration-none text-primary h5 fw-semibold d-flex align-items-center "><img className="mx-1 rounded-circle" src={img} alt="..." width="40" height="40" style={{objectFit : "cover"}}/><span className="ms-2">{firstName} {lastName} </span></Link>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="px-3 pb-4 pt-1" >
             <Tippy content="currently disabled">
              <Link className="text-decoration-none text-primary2 h6 " to="/"  ><img  className="mx-2" src="./assets/illustrations/setting.svg" alt="..." width="25" lenght="25"/>Settings</Link> 
             </Tippy>
            </div>
            <div className="px-3 pb-4 pt-1">
             <Tippy content="currently disabled">
              <Link className="text-decoration-none text-primary2 h6 " to="/" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="currently disabled" ><img  className="mx-2" src="./assets/illustrations/help&support.svg" alt="..." width="25" lenght="25"/>Help & support</Link>
             </Tippy>
            </div>
          <div className="px-3 pb-4 pt-1">
            <span className="text-decoration-none text-primary2 h6 " type="button" onClick={handlShow}><img  className="mx-2" src="./assets/illustrations/feedback.svg" alt="..." width="25" lenght="25"/> Send Feedback</span>
          </div>
          <div className="px-3 pt-3">
            <p className="text-decoration-none text-primary2 h6 fw-semibold" type="button" onClick={signout}><img  className="mx-1" src="./assets/illustrations/logout.svg" alt="..." width="25" lenght="25"/> Log Out {islLoading && <div className="spinner-border spinner-border-sm ms-2" role="status">
            <span className="visually-hidden">Loading...</span>
            </div>}</p>
          </div>
          </Offcanvas.Body>
          </Offcanvas>
          <Modal show={mshow} onHide={handlClose} backdrop="static" keyboard={false} size="lg" centered>
            <Modal.Body><div className="row justify-content-center align-items-center rounded-5">
              <div className="col-10    text-primary py-2 ">
                <div className="border-bottom pb-3 mx-5 text-center">
                  <p className="h4 fw-semibold ">Send FeedBack</p>
                </div>
            <form onSubmit={handleSubmit}>
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
                    </div>} </button>
                    <span className="text-muted text-decoration-none fw-semibold mx-4" type="button" onClick={handlClose} >Cancel</span>
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

export default UserNav ;