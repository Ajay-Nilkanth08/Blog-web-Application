import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { CardBody, CardText, Col, Container, Row,Card, Button } from "reactstrap"
import  Base from "../components/Base"
import { createComment, loadPost } from "../Services/post-service"
import {toast} from 'react-toastify';
import { BASE_URL } from "../Services/helper";
import{Input} from 'reactstrap';
import { isLoggedIn } from "../auth"
const PostPage=()=>{
    const {postId}=useParams()
    const[post,setPost]=useState(null)
    const [comment,setComment]=useState({
        content:''

    })
      

       useEffect(()=>{
        //  load post of postId
            loadPost(postId).then(data=>{
                console.log(data);
                setPost(data)
            }).catch(error=>{
                console.log(error);
                toast.error("Error in loading Post")
            })

       },[])

       const printDate=(numbers)=>{
               return new Date(numbers).toLocaleDateString()
       }

        const submitPost=()=>{

            if(!isLoggedIn()){
                toast.error("Need to login first !!")
                return
            }
            if(comment.content.trim()===''){
                return;
            }
            createComment(comment,post.postId)
            return(data=>{
                console.log(data)
                toast.success("comment added ..")
                setPost({
                    ...post,
                    comments:[...post.comments,data.data]
                })
                setComment({
                    content:''
                })
            }).catch(error=>{
                console.log(error)
            })
        }


    return(

        <Base>

         <Container className="mt-4">
            <Link to="/">Home</Link> / {post && (<Link to=""> {post.title}</Link>)}

            <Row>
                <Col md={{
                    size:12
                }}>
                <Card className="mt-3 ps-2 border-0 shadow-sm">
                    
                    {
                        (post) && (
                            <CardBody>
                        <CardText>Posted By <br>{printDate(post.addedDate)}</br> </CardText>
                           <CardText>
                            <span className="text-muted">{post.category.categoryTitle}</span>
                           </CardText>
                           <div className="divder " style={{
                                  width:'100%',
                                  height:'1px',
                                  background:'#e2e2e2'
                           }}></div>
                        <CardText className="mt-3">
                            <h1>{post.title}</h1>
                            </CardText>
                            <div className="image-container mt-4" style={{maxWidth:'50%'}}>
                                <img className ="img-fluid" src={BASE_URL+'/post/image'+post.imageName} alt=""/>
                            </div>

                            <CardText className="mt-5" dangerouslySetInnerHTML={{__html:post.content}}>

                            </CardText>
                    </CardBody>
                        )
                    }
                </Card>

                
                </Col>
            </Row>
            <Row className="my-4">
                      <Col md={
                        {
                        size:9,
                        offset:1
                        }
                      }>
                        <h3>Comments ( {post ? post.comments.length:0})</h3>
                       {
                        post && post.comments.map((c,index)=>(
                              <Card classNmae = "mt-4 border-0" key={index}>
                                <CardBody>
                                    <CardText>{c.content}</CardText>
                                </CardBody>
                              </Card>    
                            
                            ))
                       }

                       <Card classNmae = "mt-4 border-0">
                                <CardBody>
                                    <Input type="textarea" 
                                    placeholder="Enter comment here"
                                    value={comment.content}
                                    onChange={(event)=>setComment({content:event.target.value})}


                                    />
                                    <Button onClick={submitPost} className="mt-2"color="primary">Submit</Button>
                                </CardBody>
                              </Card>    
                      </Col>


            </Row>
         </Container>
        </Base>
    )
}

export default PostPage