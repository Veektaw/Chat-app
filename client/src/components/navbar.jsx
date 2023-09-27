import {Container, Nav, Navbar, Stack} from "react-bootstrap";
import {Link} from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const NavBar = () => {
    const {user, logoutUser} = useContext(AuthContext)
    return (
    <Navbar bg="dark" className="mb-5" style={{height: "4rem"}}>
        <Container>
            <h2>
                <Link to="/" className="link-light text-decoration-none">
                    Vee chat
                </Link>
            </h2>
            {
                user && (
                    <>
                        <span className="text-warning">Logged in as {user?.name}</span>
                    </>
                )
            }
            <Nav>
                <Stack direction="horizontal" gap={4}>
                    {
                        user && (
                            <>
                               <Link onClick={() => logoutUser()} to="/login" className="link-light text-decoration-none">
                                    Logout
                                </Link> 
                            </>
                        )
                    }
                    {
                        !user && (
                            <>
                                <Link to="/login" className="link-light text-decoration-none">
                                    Login
                                </Link>
                                <Link to="/signup" className="link-light text-decoration-none">
                                    Signup
                                </Link>
                            </>
                        )
                    }
                </Stack>
            </Nav>
        </Container>
    </Navbar>
)
};
 
export default NavBar;