import React, { useEffect, useState } from 'react'
import { Card,CardBody,Button,CardFooter } from 'reactstrap'
import{Container,Table} from 'react'
import { getCurrentUserDetail, isLoggedIn } from '../auth'

const ViewUserProfile = ({ user })=>{

    const[currentUser,setCurrentUser]=useState(null)
    const[login,setLogin]=useState(false)
    useEffect(()=>{
        setCurrentUser(getCurrentUserDetail())
        setLogin(isLoggedIn())
    },[])
  return (
    <Card className='mt-2 border-0 rounded-0 shadow-sm'>
    <CardBody>
      <h3 className='text-uppercase' >user Information</h3>

      <Container className='text-center'>
        <img style={{maxWidth:'250px',maxHeight:'250px'}} src={user.image ? user.image :'images.jpg'} alt="user profile picture" className='img-fluid rounded-circle' />
      </Container>
      <Table  responsive striped hover bordered={true} className='mt-5'>
         <tbody>
          <tr>
            <td>
              LCWDBLLOGS ID
            </td>
            <td>
              LCWD{user.id}
            </td>
           </tr>
           <tr>
            <td>
              USER NAME
            </td>
            <td>
              {user.name}
            </td>
           </tr>
           <tr>
            <td>
              USER EMAIL
            </td>
            <td>
              {user.email}
            </td>
           </tr>
           <tr>
            <td>
              ABOUT
            </td>
            <td>
              {user.about}
            </td>
            <tr>
              <td>
                ROLE
              </td>
              <td>
                {user.roles.map((role)=>{
                  return(
                    <div key={role.id}>{role.name}</div>
                  )
                })}
              </td>
            </tr>
           </tr>
         </tbody>
      </Table>
      {currentUser ? (currentUser.id == user.id) ? (
        <CardFooter className='text-center'>
        <Button color='warning'>Update Profile</Button>
      </CardFooter>
      ):'':''}
    </CardBody>
   </Card>
  )
}

export default ViewUserProfile