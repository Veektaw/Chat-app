import { useEffect, useState } from "react";
import { baseUrl, getRequest } from "../utils/services";

export const useFetchRecipientUser = (chat, user) => {
    const [recipientUser, setRecipientUser] = useState(null);
    const [error, setError] = useState(null);

    const recipientId = chat?.members?.find((id) => id !== user?._id);

    console.log(recipientId) 
    console.log(chat)

    useEffect(() => {
      const getUser = async () => {
        if (!recipientId) {
       
          return;
        }

        try {
          const response = await getRequest(`${baseUrl}/chat/${recipientId}`);

          if (response.error) {
            setError(response.error);
          } else {
            setRecipientUser(response);
          }
        } catch (err) {
          setError(err);
        }
      };

      getUser();
    }, []); 
    return { recipientUser, error };
}