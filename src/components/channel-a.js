import {  useNavigate } from "react-router-dom";
import { useChannelContext } from "../hooks/useChannelContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import StarRating from "./starRating";
import Modal from 'react-bootstrap/Modal'; 



function ChannelA ({title,ch_img,_id,createdAt,rating,location}) { 
  const {dispatch}=useChannelContext()
  const {user} = useAuthContext ()
  const [isLoading , setIsloading] = useState(null)
  const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  const deleteChannel = async () => {
    setIsloading(true)
    const response = await fetch(`/api/channels/${_id}`,{
      method : "DELETE",
      headers : {
        'authorization' : `Bearer ${user.token}`
      }
    })
    const json = await response.json()
    if (response.ok){
      dispatch({type:'DELETE_CHANNEL',payload:json})
      setIsloading(false)
    }
    if(!response.ok){
      alert(json.err)
      setIsloading(false)
    }
    }
    
  let navigate = useNavigate()
    return (
        <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12  ">
          <div className="card rounded-0 my-2" >
            <div className="py-1 px-2" style={{backgroundImage : `url(${ch_img})` , backgroundSize: "cover" , height : "140px"}}>
              <div style={{float : "right"}}>
              <StarRating totalStars={5} note={rating} />
              </div>
            </div>
          
           <div className="py-1">
             <p className="card-title d-inline fw-bold text-primary mx-2">{title}</p>
             <small className="d-inline fw-semibold text-muted mx-2" style={{float : "right"}}>{formatDistanceToNow (new Date (createdAt))}</small>
             <div className="d-flex align-items-center justify-content-between">
              <div className="">
              <small className="mx-2 fw-semibold text-primary2"><i className="bi bi-geo-fill"></i> {location}</small>
              </div>
             <div className="pt-2 px-1 pb-1">
              <button className="btn btn-sm btn-primary mx-1 rounded-0" disabled={isLoading} onClick={()=>{navigate(`/admin/channel/${_id}`)}} >see more</button>
              <button className="btn btn-sm btn-outline-primary2 rounded-0" disabled={isLoading} onClick={handleShow}><i className="bi bi-trash-fill"></i></button>  
             </div>
             </div>
           </div>
          </div>
          <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size="sm" centered>
              <Modal.Body>  
                <div className="m-1">
                <p className="fw-bold text-primary text-center mt-2">do you really want to delete this channel ?</p>
                <div className="mt-4 align-items-center text-end mx-2">
                    <button className="btn btn-danger btn-sm fw-semibold" disabled={isLoading} onClick={deleteChannel}> delete {isLoading && 
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
export default ChannelA ;

