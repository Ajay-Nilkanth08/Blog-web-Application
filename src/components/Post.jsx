import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardText,Button } from 'reactstrap'
import { isLoggedIn, getCurrentUserDetail} from '../auth/index';
import userContext from "../context/userContext";




function Post({post={ id:-1 ,title:" this is default post title ",content:"this is default post content"},deletePost}) {

 const userContextData = useContext(userContext)

  const [user,setUser] = useState(null)
  const [login,setLogin] = useState(null)
  useEffect(() => {
    setUser(getCurrentUserDetail())
    setLogin(isLoggedIn())
  },[])
  return (
    
    <Card className='border-0 shadow-sm mb-3'>
        <CardBody>
            <h1>{post.title}</h1>
            <CardText dangerouslySetInnerHTML={{__html:post.content.substring(0,70)+"..."}}>
        
            </CardText>
            <div>
                <Link className ='btn btn-secondary border-0' to={'/posts/'+post.postId}outline color='success'>Read More</Link>

              {userContextData.user.login && (user && user.id === post.user.id ? <Button onClick={()=>deletePost(post)} color='danger' className='ms-2'>Delete</Button>:'')}
              {userContextData.user.login && (user && user.id === post.user.id ? <Button tag={Link}  to={'/user/update-blog/${post.postId}'} color='warning' className='ms-2'>Update</Button>:'')}

            </div>
        </CardBody>
    </Card>
  )
}

export default Post;
