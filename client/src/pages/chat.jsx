import { useContext } from "react";
import { Container, Stack } from "react-bootstrap";
import UserChat from "../components/chat/userchat";
import { AuthContext } from "../context/authContext";
import { ChatContext } from "../context/chatContext";



const Chat = () => {

    const {user} = useContext(AuthContext)
    const {userChats, isUserChatsLoading, userChatError} = useContext(ChatContext)
    console.log(userChats)

    return  <Container>
                {userChats?.length < 1 ? null: (<Stack direction="horizontal" gap={3} className="align-items-start">
                        <Stack className="messages-box flex-grow-0 pe-4" gap={4}>
                            {isUserChatsLoading && <p>Loading chats...</p>}
                            {userChats?.map((chat, index) => {
                                return (
                                <div key={index}>

                                    <UserChat chat={chat} user={user}/>
                                </div>
                                )
                            })}


                        </Stack>
                        <p>Chatbox</p>
                    </Stack>
                )}

            </Container>;
}
 
export default Chat;