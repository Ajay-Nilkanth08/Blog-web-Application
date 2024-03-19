import{useEffect } from 'react'
import React, { useState } from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { loadAllCategories } from '../Services/category-service'
import {toast} from 'react'
import { Link } from 'react-router-dom'

function CategorySideMenu() {
  const [categories,setCategories]= useState([])
  useState(()=>{
                 loadAllCategories().then(data=>{
                  console.log("loading categories")
                  console.log(data);
                  // this is the copy of data
                  setCategories([...data])
                  
                 })
                 .catch(error=>{
                  console.log(error);
                  toast.error(" error in loading categories")
                })

  },[])
  return (
    <div>
        <ListGroup>
            <ListGroupItem  tag = {Link} to ="/" action={true} className='border-0'>
                All Blogs
            </ListGroupItem>
             {categories && categories.map((cat,index)=>{

              return (
                <ListGroupItem tag={Link} to={'/categories'+cat.categoryId} className='border-0 shadow-0 mt-1' key={index} action={true}>
                   {cat.categoryTitle}
                   </ListGroupItem>
              )
             })}
        </ListGroup>
    </div>
  )
}

export default CategorySideMenu