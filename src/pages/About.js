 import userContext from "../context/userContext";

import Base from "../components/Base";

const About = () => {
    return  (
       <userContext.Consumer>
        {(object)=>(

               <Base>
               <h1> This is about page</h1>
               <p> we are building block website</p>
               
               {console.log(object)}
               <h1> Welcome user:{object.user.login && object.user.data.user.name}</h1>
               </Base>

        )}
       </userContext.Consumer>
    );
    
};

export default About;