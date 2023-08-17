import StarRating from "./starRating"
function Review ({note , comment,user_id}){

    return(
        <div className="col-sm-12 col-md-10 col-lg-6 py-2">
                <div className="rounded-1 shadow-sm py-3 bg-white "  >
                    <div className="d-flex align-items-center">
                    <div className="mx-4">
                        <img className="rounded rounded-circle" src={user_id.img} style={{objectFit: "cover"}} alt="" width="55" height="55" />
                    </div>
                    <div>
                    <div>
                        <p className="h5 fw-bold text-primary">{user_id.firstName} {user_id.lastName}</p>
                    </div>
                    <div>
                        <StarRating totalStars={5} note={note} />
                    </div>
                    </div>
                    </div>
                    <div className="p-2">
                    <p className="my-3 mx-5 text-primary2 fw-semibold">{comment}</p>
                    </div>
                    
                </div>
                
            </div>
    )

}
export default Review ;