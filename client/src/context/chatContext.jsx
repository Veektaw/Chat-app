import { createContext, useEffect, useState } from "react";
import { baseUrl, getRequest } from "../utils/services";

export const ChatContext = createContext();
export const ChatContextProvider = ({ children, user }) => {
    const [userChats, setUserChats] = useState(null); 
    const [isUserChatsLoading, SetIsUserChatsLoading] = useState(false);
    const [userChatError, setUserChatError] = useState(null);

    useEffect(() => {
        const getUserChats = async () => {
            if (user?._id) {
                SetIsUserChatsLoading(true);
                setUserChatError(null);

                const response = await getRequest(`${baseUrl}/find/${user?._id}`);

                SetIsUserChatsLoading(false);

                if (response.error) {
                    return setUserChatError(response);
                }

                setUserChats(response);
            }
        };
        getUserChats();
    }, [user]);

    return (
        <ChatContext.Provider value={{ userChats, isUserChatsLoading, userChatError }}>
            {children}
        </ChatContext.Provider>
    );
};
