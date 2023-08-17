import {  useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext"; 
import { useChannelContext } from "../hooks/useChannelContext";
import StreamerNav from "../components/streamerNav";
import Modal from 'react-bootstrap/Modal';
import Tippy from '@tippyjs/react';
import Follower from "../components/follower";
import Review from "../components/Review";
import StarRating from "../components/starRating";

function ChannelDetStreamer () {
    const {channel , dispatch} = useChannelContext()
    const [iscLoading , setIscLoading] = useState(null)
    const [isLoading , setIsLoading] = useState(null)
    const [isfLoading , setIsfLoading] = useState(null)
    const [followers , setFollowers] = useState(null)
    const [folNum , setFolNum] = useState(0)
    const { user } = useAuthContext ()
    let {id} = useParams()
    const [err , setErr] = useState (null)
    const [show, setShow] = useState(false);
    const handleClose = () => {setShow(false);setErr(null);setCategory(null)}
    const handleShow = () => setShow(true);
    const [sshow, setSshow] = useState(false);
    const handlClose = () =>{ setSshow(false);setErr(null)}
    const handlShow = () => setSshow(true);
    const [chtitle,setChtitle] = useState ()
    const [chbio,setChbio] = useState ()
    const [image , setImage] = useState (null)
    const [content , setContent] = useState('')
    const [subject , setSubject] = useState('')
    const [isRLoading , setIsRLoading] = useState(null)
    const [revNum , setRevNum] = useState(0)
    const [reviews , setReviews] = useState(null)
    const [clocation , setLocation] = useState('')
    const [ccategory , setCategory] = useState(null)

    useEffect(()=>{
        const fetchChannel = async ()=>{
          setIscLoading(true)
          const response = await fetch( `/api/channels/${id}`,{
            headers : {
              'authorization' : `Bearer ${user.token}`
            }
          })
          const json = await response.json()
          if(response.ok){
            dispatch({type:'PUT_CHANNEL' , payload:json.channel})
            setFolNum(json.folNum)
            setIscLoading(false)
          }else{
           console.log(json.err)
           setIscLoading(false)
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
            setFollowers(json)
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
            setReviews(json)
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
       },[id,user,dispatch])

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

    const handleSubmit = async (e) => {
        e.preventDefault()
        const channel = {chtitle , chbio , image , isB : isBlocked,location:clocation , category : ccategory } 
        setIsLoading(true)
          
        const response = await fetch(`/api/channels/${_id}`, {
         method: 'PATCH',
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
  
            //updating the context
            dispatch({type:'PUT_CHANNEL' , payload:json})
            setErr(null)
             setIsLoading(false)  
             handleClose() 
           }
          
       }

       const sendToQueue = async (e) => {
        e.preventDefault()
        const body = {title,subject,content}
        setIsLoading(true)
        const response = await fetch(`/api/content/${_id}`, {
          method: 'POST',
          body: JSON.stringify(body),
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
          setIsLoading(false)
          setContent('')
          setSubject('')  
          handlClose() 
          setErr(null)
        }
        
       }

       const {_id , title , ch_email , ch_img , bio , isBlocked, rating , location , category} = {...channel}



       return(
        <div>
            <StreamerNav />
           <div style={isBlocked ? {pointerEvents: "none", opacity: "0.4"} : {}}>
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

              <div className="col-sm-12 col-md-12 col-lg-6 rounded-1 my-2" style={{backgroundImage : `url(${ch_img})` , backgroundSize: "cover" , height : "320px"}}>
              <div className="p-3" style={{float : "right"}}> 
              <span className="h4"><StarRating totalStars={5} note={rating} /></span>
              </div>
            </div>

              <div className="col-sm-12 col-md-12 col-lg-6 px-5 pb-4 pt-2 my-2">
                <p className="h2 fw-bold text-primary ms-2"> {title} </p>
                <p className="fw-semibold text-muted ms-2 mb-4"> {ch_email} </p>
                <p className="text-primary2 fw-semibold"><i className="bi bi-geo-fill"></i> {location}</p>
                <p className="text-primary2 fw-semibold"><i className="bi bi-star-fill"></i> {category}</p>
                <p className="text-primary2 fw-bold"><i className="bi bi-people-fill"></i> {folNum}</p>
                <div className="text-end"><button className="btn btn-primary2 px-3" onClick={handleShow} ><i className="bi bi-pencil-fill"></i>  Edit channel</button></div>
              </div>
              
             </div>
            </div>

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size="lg" centered>
        <Modal.Body>
            <div className="row justify-content-center align-items-center rounded-5">
              <div className="col-10    text-primary py-2 ">
                <div className=" mx-5 text-center">
                  <p className="h4 fw-bold ">Edit Channel</p>
                </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group  mt-4 px-2">
                  <div className="row justify-content-center">
                    <div className="col-12">
                      <input type="text" className="form-control my-2" placeholder={title} onChange={(e)=>setChtitle(e.target.value)} />
                    </div>
                    <div className="col-12 input-group my-2">
                      <input type="file" className="form-control " accept="image/*" onChange={imgConverrt} />
                      <span className="input-group-text bg-light "  ><i className="bi bi-image-fill"></i></span>
                    </div>
                    <div className="col-12 my-2">
                      <input type="text" className="form-control" placeholder={location} onChange={(e)=>setLocation(e.target.value)} />
                    </div>
                    <div className="col-12 my-2">
                    <select className="form-select" aria-label="Default select example" onChange={(e)=>setCategory(e.target.value)}>
                      <option >category</option>
                      <option value="category-One">category-One</option>
                      <option value="category-two">category-Two</option>
                      <option value="category-three">category-Three</option>
                    </select>
                    </div>
                    <div className="col-12 my-2">
                    <div className="form-floating">  
                      <textarea className="form-control" placeholder="Bio ..." id="floatingTextarea2" style={{height : "150px"}} onChange={(e)=>setChbio(e.target.value)}></textarea>
                      <label htmlFor="floatingTextarea2">new bio...</label>
                      </div>
                    </div>
                  </div> 
                  {err && <small><small className="text-danger text-sm fw-semibold mx-2" style={{position : "absolute" }}><i className="bi bi-exclamation-circle-fill"></i> {err}</small></small>}  
                  <div className="mt-4 align-items-center text-center">
                    <button className="btn btn-primary text-white fw-bold" type="submit" disabled={isLoading}>save changes {isLoading && 
                    <div className="spinner-border spinner-border-sm text-white ms-1" role="status">
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
            

            <div className="container my-4 py-4 px-5 rounded-2 bg-light">
              <p className="h3 text-primary fw-semibold">Bio</p>
              <p className="h6  text-primary2 fw-semibold"> {bio} </p>
            </div>
           </div>}
           </div>
            <Tippy content="Add Content.." >
            <div id="add-content" type="button" onClick={handlShow} className="p-3 my-3 mx-4 bg-primary rounded-circle text-white text-center" style={iscLoading ? {pointerEvents: "none", opacity: "0.4" , width : "60px"} : {width : "60px"}} >
            <i className="h4 bi bi-pencil-square"></i>
            </div>
            </Tippy>
            <Modal show={sshow} onHide={handlClose} backdrop="static" keyboard={false} size="lg" centered>
        <Modal.Body>
            <div className="row justify-content-center align-items-center rounded-5">
              <div className="col-10 text-primary ">
                <div className="pb-3 border-bottom text-center">
                  <p className="h4 fw-semibold ">Send Content</p>
                </div>
            <form onSubmit={sendToQueue}>
                <div className="form-group  mt-4 px-2">
                  <div className="row justify-content-center">
                  <div className="col-12">
                      <input type="text" className="form-control my-2" placeholder="subject" onChange={(e)=>setSubject(e.target.value)} />
                    </div>
                    <div className="col-12 my-2">
                    <div className="form-floating">  
                      <textarea className="form-control" placeholder="content" id="floatingTextarea2" style={{height : "150px"}} onChange={(e)=>setContent(e.target.value)}></textarea>
                      <label htmlFor="floatingTextarea2">content</label>
                      </div>
                    </div> 
                  </div> 
                  {err && <small><small className="text-danger text-sm fw-semibold mx-2" style={{position : "absolute" }}><i className="bi bi-exclamation-circle-fill"></i> {err}</small></small>}  
                  <div className="mt-4 align-items-center text-center">
                    <button className="btn btn-primary text-white fw-bold" type="submit" disabled={isLoading}>Send {isLoading && 
                    <div className="spinner-border spinner-border-sm text-white ms-1" role="status">
                    <span className="visually-hidden">Loading...</span>
                    </div>}</button>
                    <span className="text-muted text-decoration-none fw-semibold mx-4" type="button" onClick={handlClose} >Cancel</span>
                  </div>
                </div>
            </form>
        </div>
      </div>
        </Modal.Body>
        </Modal>

        {!isfLoading && folNum>0 && <div className="container my-4 rounded-2 py-4 px-5 bg-light">
          <div className="col-12 text-center text-md-start text-lg-start text-xl-start text-xxl-start pb-2 px-3">
            <p className=" h3 text-primary  fw-bold">followers</p>
          </div>
          <div className="row">
          {followers && followers.map((follower)=>(
            <Follower key={follower.user_id._id} {...follower.user_id} /> 
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


        </div>
       )

}
export default ChannelDetStreamer ;