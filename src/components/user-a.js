import { useAuthContext } from "../hooks/useAuthContext";
import { useAccountContext } from "../hooks/useAccountContext";
import { useState } from "react";
import Modal from 'react-bootstrap/Modal';

function UserA ({_id,firstName,lastName,img,email,isBlocked}){
  const {dispatch}=useAccountContext()
  const {user} = useAuthContext ()
  const [isB , setIsB] = useState(isBlocked)
  const [isbLoading , setIsbLoading] = useState(null)
  const [isLoading , setIsloading] = useState(null)
  const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  const handleBlock = async () => {
    var st = !isB
    const body = {isB : st}
    setIsbLoading(true)
    const response = await fetch(`/api/accounts/${_id}`, {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          'authorization' : `Bearer ${user.token}`
        }
      })
      const json = await response.json()
      if(!response.ok){
        alert(json.err)
        setIsbLoading(false)
      }
      if(response.ok){
        setIsbLoading(false)
        setIsB(st)
      }

   }

  const deleteAccount = async () => {
    setIsloading(true)
  const response = await fetch(`/api/accounts/${_id}`,{
    method : "DELETE",
    headers : {
      'authorization' : `Bearer ${user.token}`
    }
  })
  const json = await response.json()
  if (response.ok){
    dispatch({type:'DELETE_ACCOUNTS',payload:json})
    setIsloading(false)
  }
  if(!response.ok){
    alert(json.err)
    setIsloading(false)
  }
  }

  return(
<div className="col-lg-3 col-md-4 col-sm-6 col-xs-12" >
    <div className="bg-light shadow-sm rounded-1 py-2 my-1">
        <div className=" text-center">
            <img className="rounded rounded-circle" src={img} style={{objectFit: "cover"}} alt="" width="70" height="70" />
        </div>
        <div className=" text-center"><p className="h5 fw-bold text-primary">{firstName} {lastName}</p></div>
        <div className=" text-center"><small className="fw-semibold text-primary2">{email}</small></div>
        <div className=" text-center">
            <button className="btn btn-sm fw-semibold btn-primary m-1 rounded-0" disabled={isbLoading} onClick={handleBlock} >{isB ? "unbloc" : "bloc"} {isbLoading && 
                    <div className="spinner-border spinner-border-sm text-white ms-1" role="status">
                    <span className="visually-hidden">Loading...</span>
                    </div>}</button> 
            <button className="btn btn-sm btn-outline-primary2 rounded-0" disabled={isLoading} onClick={handleShow} >
             <i className="bi bi-trash-fill"></i></button>
        </div>
    </div>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size="sm" centered>
              <Modal.Body>  
                <div className="m-1">
                <p className="fw-bold text-primary text-center mt-2">do you really want to delete this user ?</p>
                <div className="mt-4 align-items-center text-end mx-2">
                    <button className="btn btn-danger btn-sm fw-semibold" disabled={isLoading} onClick={deleteAccount}> delete {isLoading && 
                    <div className="spinner-border spinner-border-sm text-white ms-1" role="status">
                    <span className="visually-hidden">Loading...</span>
                    </div>} </button>
                    <small className="text-muted text-decoration-none fw-semibold ms-3" type="button" onClick={handleClose} >Cancel</small>
                  </div> 
                </div>
              </Modal.Body>
            </Modal>
</div>
  )
}
export default UserA;