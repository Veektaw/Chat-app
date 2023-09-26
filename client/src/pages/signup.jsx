import { useContext } from "react";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../context/authContext";

const Signup = () => {

    const {signupInfo, updateSignupInfo, signupUser, signupError, isSignupLoading} = useContext(AuthContext)
    return (
    <>
        <Form onSubmit={signupUser}>
            <Row
                style={{
                height: "70vh",
                justifyContent: "center",
                paddingTop: "7%"
            }}>
                <Col xs={5}>
                    <Stack gap={3}>
                        <h2>Signup for Vee chat</h2>

                        <Form.Control type="text" placeholder="Enter your full name" onChange={(e) => updateSignupInfo({...signupInfo, name: e.target.value})}  />
                        <Form.Control type="email" placeholder="Enter your email" onChange={(e) => updateSignupInfo({...signupInfo, email: e.target.value})}   />
                        <Form.Control type="password" placeholder="Enter your password" onChange={(e) => updateSignupInfo({...signupInfo, password: e.target.value})}  />
                        
                        <Button variant="primary" type="submit">
                            {isSignupLoading ? "Creating your account": "Signup"}
                        </Button>

                        {signupError && (
                            <Alert variant="danger">
                                <p>{signupError?.message}</p>
                            </Alert>
                        )}
                        
                    </Stack>
                </Col>
            </Row>
        </Form>
    </>
);
}
 
export default Signup;