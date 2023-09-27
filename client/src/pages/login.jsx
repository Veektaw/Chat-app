import { useContext } from "react";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../context/authContext";

const Login = () => {

    const {loginInfo, updateLoginInfo, loginUser, loginError, isLoginLoading} = useContext(AuthContext)
    return (
    <>
        <Form onSubmit={loginUser}>
            <Row
                style={{
                height: "70vh",
                justifyContent: "center",
                paddingTop: "7%"
            }}>
                <Col xs={5}>
                    <Stack gap={3}>
                        <h2>Login</h2>

                        <Form.Control type="email" placeholder="Enter your email" onChange={(e) => updateLoginInfo({...loginInfo, email: e.target.value})}   />
                        <Form.Control type="password" placeholder="Enter your password" onChange={(e) => updateLoginInfo({...loginInfo, password: e.target.value})}  />
                        
                        <Button variant="primary" type="submit">
                            {isLoginLoading ? "Logging you in": "Login"}
                        </Button>

                        {loginError && (
                            <Alert variant="danger">
                                <p>{loginError?.message}</p>
                            </Alert>
                        )}
                        
                    </Stack>
                </Col>
            </Row>
        </Form>
    </>
);
}
 
export default Login;