import { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import LoginForm from "./LoginForm";

class Login extends Component {
    componentDidMount(): void {
        console.log('Inside login compoint did mount--');
    }
    render() {

        return <Container className="p-5">
            <Row>
                <Col className="bg-info clearfix" md={{ span: 8, offset: 2 }}>

                    <LoginForm />

                </Col>
            </Row>
            <div className="">

            </div>
        </Container>;
    }
}

export default Login;
