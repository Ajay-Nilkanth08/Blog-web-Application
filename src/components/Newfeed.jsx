import React, { useState } from 'react';
import { useEffect} from 'react';
import { loadAllPosts } from '../Services/post-service';
import{Row,Col,Pagination,PaginationItem,PaginationLink, Container} from 'reactstrap';
import Post from './Post';
import{toast} from 'react-toastify';
import { deletePostService } from '../Services/post-service';
import{loadPostData} from 'react'
import{infiniteScroll} from 'react-infinite-scroll-component';


function Newfeed() {

    const [postContent,setPostContent]=useState({
        content:[],
        totalPages:'',
        totalElements:'',
        pageSize:'',
        lastPage:false,
        pageNumber:''

    
    })

    const [currentPage,setCurrentPage]= useState(0)

    useEffect(()=>{
          
        // load all the posts from Server
        console.log("loading posts")
        console.log(currentPage)
         changePage(currentPage)
    },[currentPage])



    const changePage=(pageNumber=0,pageSize=5)=>{
        
        if(pageNumber>postContent.pageNumber && postContent.lastPage){
            
            return;
        }
        if(pageNumber<postContent.pageNumber && postContent.pageNumber==0) {
            
            return;
        }
        loadAllPosts(pageNumber,pageSize).then(data=>{
            setPostContent({
                content:[...postContent.content,...data.content],
                totalPages:data.totalPages,
                totalElements:data.totalElements,
                pageSize:data.pageSize,
                lastPage:data.lastPage,
                pageNumber:data.pageNumber
            })
            console.log(data);
            window.scroll(0,0)
        }).catch(error=>{
            toast.error("Error in loading post");
        })
    };
    
    function deletePost(post){
        //  going to delete post
        deletePostService(post.postId).then(res=>{
          console.log(res)
          toast.success("post is deleted..")
           
        let newPostContents = postContent.content.filter(P=>P.postId!= post.postId)
        setPostContent({...postContent,content:newPostContents})
        })
        .catch(error=>{
          console.log(error);
          toast.error("error in deleting post")
        })
    
      }




    const changePageInfinite=()=>{
        console.log("page changed");
        setCurrentPage(currentPage+1)
    
    }

  return (
     <div className="container-fluid">
        <Row>
            <Col md={
                {
                 size:12
                  
                }
            }>

                <h1>Blogs Count ({postContent?.totalElements})</h1>

              <infiniteScroll
               dataLength={postContent.content.length}
               next={changePageInfinite}
               hasMore={!postContent.lastPage}
               loader={<h4>Loading...</h4>}
               endMessage={
                 <p style={{textAlign: 'center'}}>
                   <b>Yay! You have seen it all</b>
                 </p>
               }
              > 
              
              {
               postContent.content.map((post)=>(
                <Post deletePost={deletePost} post={post} key={post.postId}/>
               ))

               }
</infiniteScroll>
          {/* <Container className='mt-3'>

          <Pagination size='lg'>
                <PaginationItem onClick={()=>changePage(postContent.pageNumber-1)} disabled={postContent.pageNumber==0}>
                    <PaginationLink previous>

                           Previous
                    </PaginationLink>
                </PaginationItem>
               
               
                 {
                    [...Array(postContent.totalPages)].map((item,index)=>(
                        
                        
                        
                          <PaginationItem onClick={()=> changePage(index)} active={index ==postContent.pageNumber} key={index}>
                           <PaginationLink>
                                {index+1}
                            </PaginationLink>
                        </PaginationItem>
                        ))
                 }
                 
              
                <PaginationItem onClick ={()=>changePage(postContent.pageNumber+1)} disabled={postContent.lastPage}>
                    <PaginationLink next>
                       Next

                    </PaginationLink>
                </PaginationItem>
               </Pagination>
          </Container> */}
            
            </Col>
        </Row>
     </div>
  )
}

export default Newfeed