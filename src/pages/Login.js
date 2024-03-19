import { CardBody, CardHeader, Container, Form, FormGroup, Label ,Input, Card, Button, Row, Col} from "reactstrap";
import { useState ,toast} from "react";
import { doLogin } from "../auth";
import { useContext } from "react";

import Base from "../components/Base";
import { loginUser } from "../Services/user-service";
import { useNavigate } from "react-router-dom";

import userContext from "../context/userContext"

const Login =()=>{

  const userContextData = useContext(userContext)

  const navigate=useNavigate()

  const [loginDetail,setLoginDetail] = useState({

    username:'',
    password:''
  })

  const handleChange =(event,field)=>{
    let  actualValue=event.target.value
    setLoginDetail({
      ...loginDetail,
      [field]:actualValue
    })
  }

  const handleReset = ()=>
  {
    setLoginDetail({
      username:"",
      password:""
    })
  }


  const handleForSubmit = (event)=>{
    event.preventDefault();
    console.log(loginDetail);
    // validation 
    if(loginDetail.username.trim()=='' || 
       loginDetail.password.trim()=='')
    {
      toast.error("Username or password  is required !!")
      return;
    }

    //  submit the data to server to generate token
loginUser(loginDetail).then((data)=>{
  console.log(data)

  //  save  the data to localstorage
  doLogin(data,()=>{
    console.log("login detail is saved to localstorage");
    // redirect to user dashboard page

    userContextData.setUser({
      data: data.user,
      login: true,
    });
navigate("/user/dashboard")

  });
  toast.success("Login Success")
}).catch(error=>{

  console.log(error)
  if(error.response.status==400|| error.response.status==404){
    toast.error(error.rsponse.data.message)
  }
  else{
    toast.error("Something went wrong server !!")

  }
})

  };

    return (

        <Base>
         
         <Container>

          <Row className="mt-5">

            <Col sm={{size:6,offset:3}}>
            
            
      <Card color="dark" inverse>

        <CardHeader>
         <h3> Login Here !! </h3>  
         </CardHeader>                
         <CardBody>

          <Form onSubmit={handleForSubmit}>
     {/*Email field */}
      <FormGroup>
     <Label for="email"> Enter Email </Label>
     <Input type="text"
     placeholder="Enter here"
     id="email" 
     value = {loginDetail.username}
     onChange = {(e)=> handleChange(e,'username') }
     
     />

      </FormGroup>

   {/*password field */}
      <FormGroup>
     <Label for="password">Password</Label>
     <Input type="password"
     placeholder="Enter here"
     id="password" 
     value = {loginDetail.password}
     onChange ={(e)=> handleChange(e,'password')}
     />

      </FormGroup>

      <Container className="text-center">

        <Button outline color="success">Login</Button>
        <Button onClick = {handleReset} outline color="light" className="ms-2">Reset</Button>

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

export default Login;