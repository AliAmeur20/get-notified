import {  useParams } from "react-router-dom";
import UserNav from "../components/userNav";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFRContext } from "../hooks/useFRContext"; 
import Follower from "../components/follower";
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import { FaStar } from "react-icons/fa";
import Review from "../components/Review";
import StarRating from "../components/starRating";
import { useAccountContext } from "../hooks/useAccountContext";
import { useChannelContext } from "../hooks/useChannelContext";

const Star = ({ selected = false , onSelect = f => f }) => (
  <FaStar size={25} color={selected ? "#FDCC0D" : "grey"} onClick={onSelect} />
  );

const createArray = length => [...Array(length)];

function ChannelDetUser () {
  const {channel , dispatch : gChannel} = useChannelContext()
    const [issubs , setIssubs] = useState(null)
    const [iscLoading , setIscLoading] = useState(null)
    const [issLoading , setIssLoading] = useState(null)
    const [isfLoading , setIsfLoading] = useState(null)
    const [isRLoading , setIsRLoading] = useState(null)
    const [isLoading , setIsLoading] = useState(null)
    const [isuLoading , setIsuLoading] = useState(null)
    const {followers,reviews,dispatch} = useFRContext()
    const [folNum , setFolNum] = useState(0)
    const [revNum , setRevNum] = useState(0)
    const { user } = useAuthContext ()
    const [mshow, setMshow] = useState(false);
    const handlClose = () => {setMshow(false);setErr(null)}
    const handlShow = () =>  setMshow(true);
    const [show, setShow] = useState(false);
    const handleClose = () => {setShow(false) ; setSelectedStars(0);setErr(null)};
    const handleShow = () =>  setShow(true);
    const [err , setErr] = useState (null);
    const [msg , setMsg] = useState(null)
    const [selectedStars , setSelectedStars] = useState(0);
    const [comment , setComment] = useState(null)
    const {account} = useAccountContext()
    let {id} = useParams()

    useEffect(()=>{
        const fetchChannel = async ()=>{
          setIscLoading(true)
          setIssLoading(true)
          const response = await fetch( `/api/channels/${id}`,{
            headers : {
              'authorization' : `Bearer ${user.token}`
            }
          })
          const json = await response.json()
          if(response.ok){
            gChannel({type:'PUT_CHANNEL', payload:json.channel})
            setFolNum(json.folNum)
            setIscLoading(false)
          }else{
           console.log(json.err)
           setIscLoading(false)
          }
          const subresp = await fetch( `/api/subscribtions/${id}`,{
            headers : {
              'authorization' : `Bearer ${user.token}`
            }
          })
          const sjson = await subresp.json()
          if(subresp.ok){
            if(sjson){ 
              setIssubs(true)   
            }else{
              setIssubs(false)
            } 
            setIssLoading(false)
          }else{
           console.log(sjson.err)
          }
            
        }
        const getFollowers = async () => {
          setIsfLoading(true)
          const response = await fetch (`/api/subscribtions/myfollowers/${id}`,{
            headers : {
              'authorization' : `Bearer ${user.token}`
            }
          })
          const json = await response.json()
          if(response.ok){
            dispatch({type:'GET_FOLLOWERS' , payload:json})
            setIsfLoading(false)
          }else{
            console.log(json.err)
          }
        }
        const getReviews = async () => {
          setIsRLoading(true)
          const response = await fetch (`/api/ratings/${id}`,{
            headers : {
              'authorization' : `Bearer ${user.token}`
            }
          })
          const json = await response.json()
          if(response.ok){
            dispatch({type:'GET_REVIEWS' , payload:json})
            setRevNum(Object.keys(json).length)
            setIsRLoading(false)
          }else{
            console.log(json.err)
          }
        }
        if(user){
          fetchChannel()
          getFollowers()
          getReviews()
        }
       },[id,user,dispatch,gChannel])


    const {title,ch_img,ch_email,bio,rating,location,category} = {...channel}


    const subscribe =async ( ) => {
      setIsuLoading(true)
      const response = await fetch( `/api/subscribtions/${id}`,{
        method : 'POST',
        headers : {
          'authorization' : `Bearer ${user.token}`
        }
      })
      const json = await response.json()
      if(response.ok){
        if (json) {setIssubs(true)}
        setIsuLoading(false)
        setFolNum(folNum+1)
        var fol = {}
        fol._id = json.si
        fol.user_id = json.ru
        dispatch({type:'ADD_FOLLOWER' , payload:fol})

      }
      
      if(!response.ok){
       console.log(json.err)
       setIsuLoading(false)
      }

    }
    const unsubscribe =async ( ) => {
      setIsuLoading(true)
      const response = await fetch( `/api/subscribtions/${id}`,{
        method : 'DELETE',
        headers : {
          'authorization' : `Bearer ${user.token}`
        }
      })
      const json = await response.json()
      if(response.ok){
        if (json) {setIssubs(false)}
        setIsuLoading(false)
        setFolNum(folNum-1)
        dispatch({type:'DELETE_FOLLOWER' , payload:json})
      }
      
      if(!response.ok){
       console.log(json.err)
       setIsuLoading(false)
      }

    }

    const handleSubmit = async (e) => {
      e.preventDefault() 
      const rprtmsg = msg
      const report = {rprtmsg} 
      setIsLoading(true)
      const response = await fetch(`/api/reports/${title}`, {
       method: 'POST',
       body: JSON.stringify(report),
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
         }
        
     }

     const handleRate = async (e) => {
      e.preventDefault() 
      const rate = {note : selectedStars , comment : comment} 
      setIsLoading(true)
      const response = await fetch(`/api/ratings/${id}`, {
       method: 'POST',
       body: JSON.stringify(rate),
       headers: {
         'Content-Type': 'application/json',
         'authorization' : `Bearer ${user.token}`
       }
     })
 
         const json = await response.json()
         if(!response.ok){
           setErr(json)
           setIsLoading(false)
         }
         if(response.ok){
          setRevNum(revNum+1)
          json.rating.user_id = account
          dispatch({type:'ADD_REVIEW' , payload:json.rating})
          gChannel({type:'PUT_CHANNEL', payload:json.channel})
          setComment(null)
          setIsLoading(false)
          handleClose()
           setErr(null)
         }
        
     }

    let sub ;
      if(issLoading){
        sub=<button className="btn btn-primary px-3" ><span className="fw-semibold">Loading</span> <div className="spinner-border spinner-border-sm ms-1" role="status">
        <span className="visually-hidden">Loading...</span>
        </div></button>
      }else{
     if(issubs){
        sub=<div>
          <Dropdown>
          <Dropdown.Toggle className="btn btn-primary2 px-3"  id="dropdown-basic">
          <i className="h5 bi bi-bag-check"></i> <span className="fw-semibold">Following</span>
         </Dropdown.Toggle>
         <Dropdown.Menu>
          <div className="px-3 py-2">
          <p className=" text-primary " type="button" onClick={handleShow} ><i className="h5 bi bi-star-fill"></i> <span className="fw-semibold">Rate</span></p>  
          <p className=" text-primary " type="button" onClick={handlShow} ><i className="h5 bi bi-exclamation-octagon-fill"></i> <span className="fw-semibold">report</span></p>
          <p className=" text-primary2 " type="button" onClick={unsubscribe} ><i className="h5 bi bi-bag-dash-fill"></i> <span className="fw-semibold">Unfollow</span>{isuLoading && <div className="spinner-border spinner-border-sm ms-2" role="status">
            <span className="visually-hidden">Loading...</span>
            </div>}</p>
          </div>
         
      </Dropdown.Menu>
         </Dropdown>
         <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size="lg" centered>
            <Modal.Body><div className="row justify-content-center align-items-center rounded-5">
              <div className="col-10    text-primary py-2 ">
                <div className="border-bottom pb-3 mx-5 text-center">
                  <p className="h4 fw-semibold ">Rate Channel</p>
                </div>
            <form onSubmit={handleRate} >
                <div className="form-group  mt-4 px-2">
                  <div className="row justify-content-center">
                    <div >
                    {createArray(5).map((n, i) => 
        <Star key={i} selected={selectedStars > i} onSelect={() => setSelectedStars(i + 1)}/>
                  )}
                    </div>
                  
                    <div className="col-12 mt-2">
                      <div className="form-floating">  
                      <textarea className="form-control" placeholder="write a comment.." id="floatingTextarea2" style={{height : "90px"}} onChange={(e)=>setComment(e.target.value)}></textarea>
                      <label htmlFor="floatingTextarea2">write a comment..</label>
                      </div>
                    </div>
                  </div> 
                  {err && <small><small className="text-danger text-sm fw-semibold mx-2" style={{position : "absolute" }}><i className="bi bi-exclamation-circle-fill"></i> {err}</small></small>}  
                  <div className="mt-4 align-items-center text-center">
                    <button className="btn btn-primary text-white fw-bold" type="submit" disabled={isLoading}> send {isLoading && <div className="spinner-border spinner-border-sm ms-1" role="status">
        <span className="visually-hidden">Loading...</span>
        </div>}</button>
                    <span className="text-muted text-decoration-none fw-semibold mx-4" type="button" onClick={handleClose} >Cancel</span>
                  </div>
                </div>
            </form>
        </div>
      </div></Modal.Body>
            </Modal>

          <Modal show={mshow} onHide={handlClose} backdrop="static" keyboard={false} size="lg" centered>
            <Modal.Body><div className="row justify-content-center align-items-center rounded-5">
              <div className="col-10    text-primary py-2 ">
                <div className="border-bottom pb-3 mx-5 text-center">
                  <p className="h4 fw-semibold ">report Channel</p>
                </div>
            <form onSubmit={handleSubmit} >
                <div className="form-group  mt-4 px-2">
                  <div className="row justify-content-center">
                    <div className="col-12 mt-2">
                      <div className="form-floating">  
                      <textarea className="form-control" placeholder="write why.." id="floatingTextarea2" style={{height : "140px"}} onChange={(e)=>setMsg(e.target.value)}></textarea>
                      <label htmlFor="floatingTextarea2">write why..</label>
                      </div>
                    </div>
                  </div> 
                  {err && <small><small className="text-danger text-sm fw-semibold mx-2" style={{position : "absolute" }}><i className="bi bi-exclamation-circle-fill"></i> {err}</small></small>}  
                  <div className="mt-4 align-items-center text-center">
                    <button className="btn btn-primary text-white fw-bold" type="submit" disabled={isLoading}> send {isLoading && <div className="spinner-border spinner-border-sm ms-1" role="status">
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
     }
     else{
        sub=<button className="btn btn-primary px-3" onClick={subscribe} disabled={isLoading} ><i className="h5 bi bi-bag-plus"></i> <span className="fw-semibold">Follow</span>{isuLoading && <div className="spinner-border spinner-border-sm ms-2" role="status">
        <span className="visually-hidden">Loading...</span>
        </div>}</button>
     }
    }

    return(
        <div>
            <UserNav />
            <div className="container">
            {iscLoading ?
             <div className="text-center" style={{marginTop : "230px"}}>
             <div class="spinner-grow text-muted spinner-grow-sm mx-1" role="status">
               <span class="visually-hidden">Loading...</span>
             </div>
             <div class="spinner-grow text-muted spinner-grow-sm mx-1" role="status">
               <span class="visually-hidden">Loading...</span>
             </div>
             <div class="spinner-grow text-muted spinner-grow-sm mx-1" role="status">
               <span class="visually-hidden">Loading...</span>
             </div>
             </div>
            :<div>
            <div className="container mt-5">
             <div className="row justify-content-center ">

              <div className="col-sm-12 col-md-12 col-lg-6 rounded-1" style={{backgroundImage : `url(${ch_img})` , backgroundSize: "cover" , height : "320px"}}>
              <div className="p-3" style={{float : "right"}}> 
              <span className="h4"><StarRating totalStars={5} note={rating} /></span>
              </div>
            </div>

              <div className="col-sm-12 col-md-12 col-lg-6 px-5 pb-4 pt-2">
                <p className="h2 fw-bold text-primary ms-2"> {title} </p>
                <p className="fw-semibold text-muted ms-2 mb-4"> {ch_email} </p>
                <p className="text-primary2 fw-semibold"><i className="bi bi-geo-fill"></i> {location}</p>
                <p className="text-primary2 fw-semibold"><i className="bi bi-star-fill"></i> {category}</p>
                <p className="text-primary2 fw-bold"><i className="bi bi-people-fill"></i> {folNum}</p>
                <div className="text-end">{sub}</div>
              </div>
              
             </div>
            </div>

            <div className="container my-4 rounded-2 py-4 px-5 bg-light">
              <p className="h3 text-primary fw-semibold">Bio</p>
              <p className="h6  text-primary2 fw-semibold"> {bio} </p>
            </div>
            </div>}
            </div>
            
            

            {!isfLoading && folNum>0 && <div className="container my-4 rounded-2 py-4 px-5 bg-light">
          <div className="col-12 text-center text-md-start text-lg-start text-xl-start text-xxl-start pb-2 px-3">
            <p className=" h3 text-primary  fw-bold">followers</p>
          </div>
          <div className="row">
          {followers && followers.map((follower)=>(
            <Follower key={follower._id} {...follower.user_id} />
          ))}   
          </div>
        </div>}

        {!isRLoading && revNum>0 && <div className="container my-4 rounded-2 py-4 px-5 bg-light">
          <div className="col-12 text-center text-md-start text-lg-start text-xl-start text-xxl-start pb-2 px-3 d-flex align-items-center">
            <div className="item"><p className=" h3 text-primary  fw-bold">Reviews</p></div>
            <div className="item pt-1"><p className="h5 mx-2 text-primary2 fw-semibold">{revNum}</p></div> 
          </div>
          <div className="row">
          {reviews && reviews.map((review)=>(
            <Review key={review._id} {...review} />
          ))}   
          </div>
        </div>}

        </div>
    )

}
export default ChannelDetUser ;