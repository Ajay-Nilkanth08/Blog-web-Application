import { useEffect, useRef, useState } from "react"
import {Button, Card, CardBody, Container, Form, Input, Label, Toast} from "reactstrap"
import { loadAllCategories } from "../Services/category-service"
import JoditEditor from"jodit-react";
import { createPost as doCreatePost, uploadPostImage } from "../Services/post-service";
import { getCurrentUserDetail } from "../auth";
 const AddPost=()=>{

    const editor=useRef(null)
    // const[content,setContent]=useState ('')


 const [categories,setCategories]= useState([])
 const[user,setUser]=useState(undefined)
//  here is call to API'S
 const [post,setPost]= useState({
    title:'',
    content:'',
    categoryId:''
 })

 const [image,setImage]=useState(null)

//  const config={
//     placeholder:"Start Typing..."
//  }

    useEffect(

        ()=>{
            

       setUser(getCurrentUserDetail())     
      loadAllCategories().then((data)=>{
        console.log(data);
        setCategories(data)
      }).catch (error=>{

        console.log(error);
      })

        },[]
    )
    // fieldChanged function here is pass the event
    const fieldChanged=(event)=>{
        // console.log(event);
                          //  dynamic to the key
        setPost({...post,[event.target.name]:event.target.value})
    }
    // new function for content 
    const contentFieldChanged=(data)=>{
        setPost({...post,'content':data})
    }

    //  Create post function
    const createPost=(event)=>{
        
        event.preventDefault();
        // console.log("form sumbitted");
        // console.log(post);
       
        if(post.title.trim()===''){
            Toast.success(" post title is required !!")
            return;
        }

        if(post.content.trim()===''){
            Toast.success(" post  content is required !!")
            return;
        }

        if(post.categoryId ===''){
            Toast.success(" select some category? !!")
            return;
        }
        
//  submit the form one the server 
post['userId'] = user.id
doCreatePost(post).then(data=>{

    uploadPostImage(image,data.postId).then(data=>{
        Toast.success("Image Uploaded !!")
    }).catch(error=>{
        Toast.error("Error in uploading Image!!")
        console.log(error);
    })


    Toast.success("Post Created !!")
    // console.log(post);
    setPost({
        title:'',
        content:'',
        categoryId:''
    })
}).catch((error)=>{
    Toast.success("Post not created due to some error")
    // console.log(error);
})


    }


    // handling file change event

    const handleFileChange=(event)=>{
        console.log(event.target.files[0]);
        setImage(event.target.files[0])

    }

    return(

        <div className="wrapper">

            <Card className="shadow-sm  border-0 mt-2">

    <CardBody> 
  {/* {JSON.stringify(post)} */}
        <h3> What going in your mind ?</h3>
        <Form onSubmit={createPost}>

            <div className="my-3">
                <Label for="title"> Post title </Label>
                <Input 
                type="text"
                 id="title"
                 placeholder="Enter here "
                 className="rounded-0"
                //  function call
                name="title"
                onChange={fieldChanged}
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
                 onChange ={(newContent) => contentFieldChanged(newContent)}
                />
             </div>

             {/* file field */}

             <div className="mt-3">
                <label for="image">Select post Banner</label>
                <Input id="image" type="file" onChange={handleFileChange}/>
             </div>


            <div className="my-3">
                <Label for="category"> Post Category </Label>
                <Input 
                type="select"
                 id="category"
                 placeholder="Enter here "
                 className="rounded-0"
                 name="categoryId"
                 onChange={fieldChanged}
                 defaultValue={0}
                  
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
                <Button type="submit" className="rounded-0" color="primary"> Create Post</Button>
                <Button className="rounded-0 ms-2" color="danger"> Reset Content</Button>
            </Container>
        </Form>
      
    </CardBody>


            </Card>
        </div>
        
    )
 }

 export default AddPost