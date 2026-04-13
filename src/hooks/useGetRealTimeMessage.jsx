import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../redux/messageSlice";

const useGetRealTimeMessage = () => {
    const { io } = useSelector((store) => store.socket);
    const { selectedChatUser } = useSelector((store) => store.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!io) return;

        const handleNewMessage = (newMessage) => {
            // Only add the message to the store if it belongs to the currently selected chat
            if (selectedChatUser && (newMessage.sender === selectedChatUser._id || newMessage.sender?._id === selectedChatUser._id)) {
                dispatch(addMessage(newMessage));
            }
        };

        io.on("newMessage", handleNewMessage);

        return () => {
            io.off("newMessage", handleNewMessage);
        };
    }, [io, dispatch, selectedChatUser]);
};

export default useGetRealTimeMessage;
