import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";

const Login = () => {
    return (
    <>
        <Form>
            <Row
                style={{
                height: "70vh",
                justifyContent: "center",
                paddingTop: "7%"
            }}>
                <Col xs={5}>
                    <Stack gap={3}>
                        <h2>Login to your account</h2>

                        <Form.Control type="email" placeholder="Enter your email"/>
                        <Form.Control type="password" placeholder="Enter your password"/>
                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                        <Alert variant="danger">
                            <p>An error occurred</p>
                        </Alert>
                    </Stack>
                </Col>
            </Row>
        </Form>
    </>
);
}
 
export default Login;