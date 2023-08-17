import { Link } from "react-router-dom";
import Tippy from '@tippyjs/react';
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useAccountContext } from "../hooks/useAccountContext";

function AdminNav () {
    const {dispatch} = useAuthContext ()
    const { account , dispatch : change } = useAccountContext() 
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    

    const {_id,firstName,lastName,img} = {...account}

    const signout = () => {
      //remove user from localStorage
       localStorage.removeItem('user') 
      //dispatch signout action to make the context null
       dispatch ({type:'SIGNOUT'})
       change ({type:'DELETE_ACCOUNT'})
    }
return(<div>
    <nav className="navbar px-2 py-1">
        <div className="container-fluid ">
         <Link className="fw-bold text-primary text-decoration-none" to="/admin"> <img src="./assets/logo/get_notified_logo.png"  alt="Get Notified" width="30" lenght="30"/>  Get <span className="text-secondary bg-primary py-1 px-2 rounded-1 ">Notified</span></Link>
         <Tippy content="account">
           {account ? <img className="rounded rounded-circle" type="button" src={img} style={{objectFit:"cover"}} alt="" width="45" height="45" onClick={handleShow}/> : <div className="spinner-border spinner-border-sm m-1 text-primary" role="status">
  <span className="visually-hidden">Loading...</span>
</div>}
         </Tippy>
         <Offcanvas show={show} onHide={handleClose} placement='end' style={{maxWidth : "260px"}} >
         <Offcanvas.Header className="mx-2 mt-3 mb-1 py-2" >
           <Link to={`/admin/profile/${_id}`} className="text-decoration-none text-primary h5 fw-semibold d-flex align-items-center "><img className="mx-1 rounded-circle" src={img} alt="..." width="40" height="40" style={{objectFit : "cover"}}/><span className="ms-2">{firstName} {lastName} </span></Link>
          </Offcanvas.Header>
          <Offcanvas.Body>

          <div className="  px-1 pb-4 pt-1 " >
              <Link className="text-decoration-none text-primary h6 " to="/admin/users"  ><img  className="mx-2" src="./assets/illustrations/person-circle.svg" alt="..." width="25" lenght="25"/>Users</Link> 
            </div>

            <div className="  px-1 pb-4 pt-1 " >
              <Link className="text-decoration-none text-primary h6" to="/admin/channels"  ><img  className="mx-2" src="./assets/illustrations/admin-channel.svg" alt="..." width="25" lenght="25"/>Channels</Link> 
            </div>

            <div className="  px-1 pb-4 pt-1 " >
              <Link className="text-decoration-none text-primary h6" to="/admin/channelRequests"  ><img  className="mx-2" src="./assets/illustrations/add-channel.svg" alt="..." width="26" lenght="26"/>Channel Requests</Link> 
            </div>

            <div className="  px-1 pb-4 pt-1 " >
              <Link className="text-decoration-none text-primary h6" to="/admin/feedback"  ><img  className="mx-2" src="./assets/illustrations/admin-feedback.svg" alt="..." width="26" lenght="26"/>Feedback</Link> 
            </div>

            <div className="  px-1 pb-4 pt-1 " >
              <Link className="text-decoration-none text-primary h6" to="/admin/reports"  ><img  className="mx-2" src="./assets/illustrations/person-exclamation.svg" alt="..." width="26" lenght="26"/>Reports</Link> 
            </div>

            <div className="px-1 pb-4 pt-1">
             <Tippy content="currently disabled">
              <Link className="text-decoration-none text-primary h6" to=""><img  className="mx-2" src="./assets/illustrations/setting.svg" alt="..." width="25" lenght="25"/>Settings</Link> 
             </Tippy>
            </div>
          <div className=" px-3 pt-3">
            <p className="text-primary2 h6 fw-semibold" type="button" onClick={signout} ><img  className="mx-1" src="./assets/illustrations/logout.svg" alt="..." width="25" lenght="25"/> Log Out</p>
          </div>
          </Offcanvas.Body>
          </Offcanvas>
        </div>
      </nav>
</div>)
}
export default AdminNav ;