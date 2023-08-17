import { FaStar } from "react-icons/fa";

const Star = ({ selected = false }) => (
    <FaStar color={selected ? "#FDCC0D" : "grey"} />
    );

const createArray = length => [...Array(length)];



function StarRating ({totalStars,note}) {
        return(
            <>
             {createArray(totalStars).map((n, i) => 
        <Star
         key={i}
         selected={note > i}
           />
        )}
        
        </>
        )
        
        }


export default StarRating ;