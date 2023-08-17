function Follower ({firstName , lastName , img}){

    return(
        <div className="col-sm-12 col-md-10 col-lg-6 py-2">
                <div className="d-flex m-2 shadow-sm align-items-center border-start border-5 border-primary2 py-2 bg-white"  >
                    <div className="mx-4 ">
                        <img className="rounded rounded-circle" src={img} style={{objectFit: "cover"}} alt="" width="60" height="60" />
                    </div>
                    <div className=" ">
                        <p className="h3 fw-semibold text-primary">{firstName} {lastName}</p>
                    </div>
                </div>
            </div>
    )

}
export default Follower ;