import React, { useState } from 'react'
import {useEffect} from 'react'
import {useParams} from  'react-router-dom'
import Base from '../components/Base'
import { Container,Row,Col } from "reactstrap";
import CategorySideMenu from '../components/CategorySideMenu';
import { loadPostCategoryWise } from '../Services/post-service';
import { deletePostService } from '../Services/post-service';
import {toast} from 'react';



function Categories() {
  const [posts,setPosts] = useState([])

  const{categoryId} = useParams()
  useEffect(()=>{
    console.log(categoryId);
    loadPostCategoryWise(categoryId).then(data=>{
       
      setPosts([...data])
    }).catch(error=>{
      console.log(error);
      toast.error("error in loading posts")
    })
  },[categoryId])

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
     
     <Container className="mt-3">
                  <Row>
                    <Col md={2} className="pt-5">
                      <CategorySideMenu/>
                    </Col>
                    <Col md={10}>
                    <h1>Blogs Count({posts.length})</h1>

                    {
                      posts && posts.map((post,index)=>{
                        return(
                          <post deletePost={deletePost} key={index}  post={post}/>
                        )
                      })
                    }
                    
                    { posts.length<=0 ?<h1>No posts in this category</h1>:''}
                    </Col>
                   </Row>
                </Container>
      
    </Base>
  )
}

export default Categories