import { useEffect } from "react";

import { useState } from "react";
import{signUp} from "../Services/user-service";
import { toast } from "react-toastify";
import { Button, Card,Row, CardBody, CardHeader, Col, Container,Form,FormGroup, Input, Label, FormFeedback } from "reactstrap";
import Base from "../components/Base";

const Signup = () => {
  

  

  const [data,setData] = useState({

    name:'',
    email:'',
    password:'',
    about:'',
    

  }) 

  const [error,setError] = useState({

    errors:{},
isError: false
  })
   
   

  // handlechange 
   const  handleChange=(event,property)=>{
     //dynamic setting the values
     setData({...data,[property]:event.target.value})
      
    
   }
  // reseting the form
   const resetData=()=>{
    setData({

      name:'',
      email:'',
      password:'',
      about:'',
    })
   }

   //submit  the form

   const submitForm=(event)=>{
  event.preventDefault();

  if(error.isError){
    toast.error("Form data is invalid , correct all details  details then submit.");
    setError({...error,isError:false})
    return;
  }
 console.log(data);
  //data validate

  //call server API for sending  data 
     signUp(data).than((resp)=>{
 console.log(resp);
 console.log("success log");
 toast.success("User is registerd Successfully !! user id"+resp.id)
 setData({
      
  name:'',
  email:'',
  password:'',
  about:'',

 })
     }).catch((error)=>{

      console.log(error);
      console.log("Error log");
      // handle errors in proper way
      setError({
        errors:error,
        isError:true
      })

     });
     
     

   };

    return (

        <Base>
<Container>

  <Row className="mt-4">
  
  {/* {JSON.stringify(data)} */}
    
   <Col  sm={{size: 6, offset: 3}}>
   <Card  color="secondary" inverse>

<CardHeader>

<h3> Fill  Information to Register !!</h3>
</CardHeader>
<CardBody>
{/* creating form */}

      <Form onSubmit={submitForm}>


{/* Name field*/}
  <FormGroup>
  <Label for="name"> Enter Name </Label>
   <Input 
   type="text" 
   placeholder="Enter here" 
    id="name"
    // this is the listionar onchange
    onChange={(e)=>handleChange(e,'name')}
    value={data.name}
    //  here is used null sef here is data? = name so true other wise false this is not a break a code is undefiend the data 
    invalid={ error.errors?.response?.data?.name ? true: false  
    
    }
     
    />

    <FormFeedback>

     { error.errors?.response?.data?.name }
     
    </FormFeedback>
  </FormGroup>

{/* Email field*/}
<FormGroup>


   <Label for="email"> Enter Email</Label>

   <Input type="email" 
   placeholder="Enter here" 
   id="email"
   onChange={(e)=>handleChange(e,'email')}
   value={data.email}

   invalid={ error.errors?.response?.data?.email ? true: false 
  
    }
    />

<FormFeedback>

{ error.errors?.response?.data?.email }

</FormFeedback>

</FormGroup>



{/* Password field*/}
<FormGroup>

   <Label for="password">Enter Password </Label>

   <Input type="password"
   placeholder="Enter here"
   id="password"
   onChange={(e)=>handleChange(e,'password')}
    value={data.password}

    invalid={ error.errors?.response?.data?.password ? true: false  
    }
   
    />
<FormFeedback>

{ error.errors?.response?.data?.password }

</FormFeedback>

</FormGroup>



{/* Textarea field*/}
  <FormGroup>

   <Label for="about">Textarea</Label>

   <Input type="textarea"
   placeholder="Enter here"
   id="about"
   style= {{ height:"220px"}}
   onChange={(e)=>handleChange(e,'about')}
    value={data.about}
    invalid={ error.errors?.response?.data?.about ? true: false 
    
    }
   
    />

<FormFeedback>

{ error.errors?.response?.data?.about }

</FormFeedback>

</FormGroup>
 

 <Container className="text-center">

<Button outline color="info">Register</Button>
<Button onClick={resetData} outline color="success" type = "reset" className="ms-2">Reset</Button>
       </Container>
      </Form>
      </CardBody>
     </Card>
    </Col>
  </Row>
</Container>


        </Base>
    );
};

export default Signup;