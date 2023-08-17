import {  useNavigate } from "react-router-dom";
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import StarRating from "./starRating";

function ChannelU  ({title,ch_img,_id,createdAt,rating,location}) { 
    
    let navigate = useNavigate()
    return(
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
         <div className="d-flex align-items-center justify-content-between pt-2 px-1 pb-1">
              <div className="">
              <small className="mx-2 fw-semibold text-primary2"><i className="bi bi-geo-fill"></i> {location}</small>
              </div>
         <div>
          <button className="btn btn-sm btn-primary mx-1 rounded-0 " onClick={()=>{navigate(`/user/channel/${_id}`)}} >see more</button>
         </div>
         </div>
       </div>
      </div>
    </div>
    )
}

export default ChannelU ;