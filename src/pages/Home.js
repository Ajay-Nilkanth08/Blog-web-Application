
import { useEffect } from "react";
import { Container,Row,Col } from "reactstrap";
import Base from "../components/Base";
import CategorySideMenu from "../components/CategorySideMenu";
import Newfeed from "../components/Newfeed";

const Home = () => {

   return (

            <Base>
                <Container className="mt-3">
                  <Row>
                    <Col md={2} className="pt-5">
                      <CategorySideMenu/>
                    </Col>
                    <Col md={10}>
                    <Newfeed />
                    </Col>
                   </Row>
                </Container>
            </Base>
         );
};

export default Home;