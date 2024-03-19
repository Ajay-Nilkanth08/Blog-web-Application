import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Base from '../components/Base'
import { loadPost,updatePost as doUpdatePost} from '../Services/post-service'
import { Toast } from 'reactstrap'
import userContext from '../context/userContext'
import { loadAllCategories } from '../Services/category-service'
import {Button, Card, CardBody, Container, Form, Input, Label} from "reactstrap"
import JoditEditor from"jodit-react";

function UpdateBlog() {

    const editor =useRef(null)

const [categories,setCategories]= useState([])
   const{ blogId }= useParams()
   const object=useContext(userContext)
   const navigate=useNavigate()
   const [post,setPost] = useState(null)

   useEffect(()=>{

    loadAllCategories().then((data)=>{
        console.log(data);
        setCategories(data)
      }).catch (error=>{

        console.log(error);
      })

 // Load the blog from database
 loadPost(blogId).then(data=>{
    setPost({...data, categoryId:data.category.categoryId})

 }).catch(error=>{
    console.log(error);
    Toast.error("error in loading the blog")
 })


   },[])

   useEffect(()=>{
      
    if(!post){
        if(post.user.id!= object.user.data.id)
        Toast.error("this is not your post !!")
        navigate("/")
    }

   },[post])
   const handaleChange=(event,fieldName)=>{
  
       setPost({
        ...post,
        [fieldName]:event.target.value
       })


   }

   const updatePost=(event)=>{
    event.preventDefault()
    console.log(post);
    doUpdatePost({...post, category: { categoryId: post.categoryId }},post.postId)
    .then(res=>{
        console.log(res);
        Toast.success("post updated !!")
    })
    .catch(error=>{
        console.log(error);
        Toast.error("error in updating post!!")
    })
   }
   const updateHtml=()=>{
    return(
        <div className="wrapper">
            
            <Card className="shadow-sm  border-0 mt-2">

    <CardBody> 
  {/* {JSON.stringify(post)} */}
        <h3> Update Post frome here !!</h3>
        <Form onSubmit={updatePost}>

            <div className="my-3">
                <Label for="title"> Post title </Label>
                <Input 
                type="text"
                 id="title"
                 placeholder="Enter here "
                 className="rounded-0"
                //  function call
                name="title"
                value={post.title}
                onChange={(event)=>handaleChange(event,'title')}
                />
            </div>

            <div className="my-3">
                <Label for="content"> Post Content </Label>
                {/* <Input 
                type="textarea"
                 id="content"
                 placeholder="Enter here "
                 className="rounded-0"
                 style={{height:'300px'}}
                /> */}

                <JoditEditor
                 ref={editor}
                //   this is the refresh to new content
                  value={post.content}
                //  config={config}
                 onChange = {newContent=>setPost({...post,content:newContent})}
                />
             </div>

             {/* file field */}

             <div className="mt-3">
                <label for="image">Select post Banner</label>
                <Input id="image" type="file" onChange={''}/>
             </div>


            <div className="my-3">
                <Label for="category"> Post Category </Label>
                <Input 
                type="select"
                 id="category"
                 placeholder="Enter here "
                 className="rounded-0"
                 name="categoryId"
                 onChange={''}
                 
                 value={post.categoryId}
                  
                >
                    <option disabled value={0}>--Select category--</option>
                {/* this is the jsx  */}
                {

                    categories.map((category)=>(
                      
                   <option value={category.categoryId} key={category.categoryId}>
                    {/* display the categories */}
                    {category.categoryTitle}
                   </option>

                    ))
                }
                           
                     
                    </Input>
            </div>

            <Container className="text-center">
                <Button type="submit" className="rounded-0" color="primary"> Update Post</Button>
                <Button className="rounded-0 ms-2" color="danger"> Reset Content</Button>
            </Container>
        </Form>
      
    </CardBody>


            </Card>
        </div>
    )
   }

  return (
    <Base>
    
    <Container>
    { post && updateHtml()}
    </Container>
      
    </Base>
  )
}

export default UpdateBlog