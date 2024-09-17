import React from 'react'
import Edit from '../img/edit.png'
import Delete from '../img/delete.png'
import { Link } from 'react-router-dom'
import Menu from '../components/Menu'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { useLocation,useNavigate } from 'react-router-dom'
import moment from 'moment'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext'

const Single = () => {

  const [post,setPost]=useState({});

  //react router dom property
  const location=useLocation();
  

  const postId=location.pathname.split("/")[2];

  useEffect(()=>{
const fetchData= async ()=>{
  try{
    const res=await axios.get(`/posts/${postId}`);
    setPost(res.data);

  }catch(err){
  console.log(err);
  }
}

fetchData();
  },[postId])

  const {currentUser}=useContext(AuthContext);

  const navigate=useNavigate();
  const handleDelete=async ()=>{
    try{
      await axios.delete(`/posts/${postId}`);
     navigate("/"); //navigate to homepage after delete the post
    }catch(err){
    console.log(err);
    }


  }

  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }


  return (
    <div className="single">
      <div className="content">

    {/* image of the post */}

    <img src={`/upload/${post.img}`} alt=''/>
    
    <div className="user">
      {/* user image */}

     {post.userImg &&  <img src={post.userImg} alt=''/>}

      <div className="info">
        <span>
          {post?.username}
        </span>
        <p> Posted {moment(post.date).fromNow()}</p>
      </div>

    {  currentUser &&  currentUser.username === post.username &&(
      <div className="edit">
        <Link to={'/write?edit=2'} state={post}>
        <img src={Edit} alt="" />
        </Link>
        
        <img onClick={handleDelete} src={Delete} alt='' />
      </div>
    )}

   
    </div>
    

    {/* heading of the post */}
    <h1>{post.title} </h1>

    {/* description of the post */}
    {getText(post.desc)};

      </div>
      {/* <div className="menu"> */}
        <Menu cat={post.cat} />
      {/* </div> */}
    </div>
  )
}

export default Single
