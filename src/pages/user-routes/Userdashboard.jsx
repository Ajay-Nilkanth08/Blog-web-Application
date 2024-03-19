import React, { useEffect } from 'react'
import { Container } from 'reactstrap'
import AddPost from '../../components/AddPost'
import Base from '../../components/Base'
import Newfeed from '../../components/Newfeed'
import { useState } from 'react'
import {setPosts} from 'react'

import { getCurrentUserDetail } from '../../auth'
import { deletePostService, loadPostCategoryWise } from '../../Services/post-service'
import { toast } from 'react-toastify'

//  this is the functional component
const Userdashboard=()=> {

  const [user,setUser] = useState({})
  const [posts,setPosts] = useState([])
  useEffect(()=>{
    console.log(getCurrentUserDetail());
    setUser(getCurrentUserDetail())
    loadPostData()

 
  },[])

  function loadPostData(){
    loadPostCategoryWise(getCurrentUserDetail().id).then(data=>{
      console.log(data)
      setPosts([...data])
    })
    .catch(error=>{
      console.log(error);
      toast.error("error in loading user posts")
    })
  }

  //function to delete post

  function deletePost(post){
    //  going to delete post
    deletePostService(post.postId).then(res=>{
      console.log(res)
      toast.success("post is deleted..")
      let newPosts = posts.filter(p =>p.postId!= post.postId)
      setPosts([...newPosts])
    })
    .catch(error=>{
      console.log(error);
      toast.error("error in deleting post")
    })

  }
     
  return (
    <Base>
    <div>
     <Container> 
      <AddPost />
      <h1 className>Post Count : ({posts.length})</h1>

      {posts.map((post,index)=>{
        return (
          <post post={post} key={index}  deletePost={deletePost} />
        )
      })}
      </Container>
      </div>
   </Base>
  )
}

export default Userdashboard
