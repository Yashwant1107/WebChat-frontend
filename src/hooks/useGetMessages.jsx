import axios from 'axios';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setMessages } from '../redux/messageSlice';
import { BASE_URL } from '../config';
import { getAuthConfig } from '../utils/auth';

const getId = (value) => {
    if (!value) {
        return null;
    }

    return typeof value === 'object' ? value._id : value;
};

const useGetMessages = () => {
    const { selectedChatUser } = useSelector(store => store.user);
    const dispatch = useDispatch();
    const selectedUsername = selectedChatUser?.username ?? 'unknown user';

    useEffect(() => {
        if (!selectedChatUser?._id) {
            dispatch(setMessages([]));
            return;
        }

        const fetchMessages = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/v1/message/${selectedChatUser._id}`, {
                    ...getAuthConfig(),
                });
                const messages = (response.data.messages ?? []).map((message) => ({
                    ...message,
                    senderId: getId(message.sender),
                    receiverId: getId(message.receiver),
                }));

                console.log(`Fetched messages for ${selectedUsername}:`, messages);
                dispatch(setMessages(messages));
            } catch (error) {
                if (error.response?.status === 404) {
                    console.log(`Fetched messages for ${selectedUsername}:`, []);
                    dispatch(setMessages([]));
                    return;
                }

                console.error('Error fetching messages:', error.response?.data || error.message);
            }
        };

        fetchMessages();
    }, [dispatch, selectedChatUser?._id, selectedUsername]);
};

export default useGetMessages;
