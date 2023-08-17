function Pagination ({total , setPage , page}) {
    const pageNumber = Math.ceil(total/8)

    const onClick = (newPage) => {
        setPage(newPage)
    }
    return(
        <div className="d-flex justify-content-center align-items-center" style={{marginTop:"50px"}}>
            {(pageNumber>1) && [...Array(pageNumber)].map((val,index)=>(
        <div className={(page===index+1)? "text-white bg-secondary rounded-1 py-1 px-2 fw-bold mx-3" : "text-primary fw-bold mx-3"} type="button" key={index} onClick={()=>onClick(index+1)}>{index+1}</div>
      ))}

        </div>
    )
   
}

export default Pagination ;

