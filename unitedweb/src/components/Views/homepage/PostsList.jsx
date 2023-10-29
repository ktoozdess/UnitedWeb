import { useState } from "react"
import { useEffect } from "react";

const PostsList = ({data,searchval}) =>{
    // const [data, setData] =  useState()
    useEffect(() =>{
            var cut = document.getElementsByClassName('cuttedText');
            for( var i = 0; i < cut.length; i++ ){
              cut[i].innerText = cut[i].innerText.slice(0,10) + '...';
            }

    },[])


     const postiteminfo = data.map((post, index) => {
        return(
        <div className="nn" key={index}>
            <p>{post.title}</p>
            <p className="cuttedText">{post.descr}</p>
            <p>{post.UserId}</p>
        </div>
        )

})

    return(
        <>
        {/* <p>{searchval}</p> */}
        {postiteminfo}
        </>


    )
}

export default PostsList