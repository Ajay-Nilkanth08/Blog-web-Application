 import React, { useEffect, useState } from 'react'
 import { useContext } from 'react'
import { useParams } from 'react-router-dom'
 import Base from '../../components/Base'
 import userContext from '../../context/userContext'
import { getUser } from '../../Services/user-service'
import { Card,CardBody,Row,Col } from 'reactstrap'
import{Container,Table} from 'react'
import ViewUserProfile from '../../components/ViewUserProfile'
 function ProfileInfo() {
  const object=useContext(userContext)
 const[user,setUser]=useState(null)
const{userId}=useParams()
// console.log(userId);
useEffect(()=>{
 getUser(userId).then(data=>{
  console.log(data);
  setUser({...data})
 })
},[])

const userView=()=>{
return(
  <Row>
    <Col md={{size:6,offset:3}}>
       
       <ViewUserProfile user={user}/>

    </Col>
  </Row>
)

}


   return (
     <Base>
      {user ? userView():'Loading user Data...'}
     </Base>
   )
 }
 
 export default ProfileInfo;