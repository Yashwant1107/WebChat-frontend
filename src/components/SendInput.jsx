import React from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../redux/messageSlice';
import { BASE_URL } from '../config';
import { getAuthConfig } from '../utils/auth';

const SendInput = () => {
  const [message, setMessage] = React.useState('');
  const dispatch = useDispatch();
  const { selectedChatUser } = useSelector((store) => store.user);
  const inputClassName =
    'w-full rounded-md border border-zinc-600 bg-slate-900 px-4 py-3 pr-16 text-white outline-none transition focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60';

  const submitHandler = async (event) => {
    event.preventDefault();
    const trimmedMessage = message.trim();

    if (!selectedChatUser?._id || !trimmedMessage) {
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/message/send/${selectedChatUser._id}`,
        { message: trimmedMessage },
        getAuthConfig()
      );

      const newMessage = response.data.newMessage;
      const formattedMessage = {
        ...newMessage,
        senderId: newMessage.sender?._id || newMessage.sender,
        receiverId: newMessage.receiver?._id || newMessage.receiver,
      };

      console.log(`Sent message to ${selectedChatUser.username}:`, formattedMessage);
      dispatch(addMessage(formattedMessage));
      setMessage('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send message');
      console.error('Error sending message:', error.response?.data || error.message);
    }
  };

  return (
    <form className='p-4 border-t border-slate-500 w-full' onSubmit={submitHandler}>
      <div className='relative w-full'>
        <input
          type="text"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder={selectedChatUser ? 'Type a message...' : 'Select a user to chat'}
          className={inputClassName}
          disabled={!selectedChatUser}
        />
        <button
          type="submit"
          className='absolute flex inset-y-0 end-0 items-center px-4 text-white bg-blue-500 rounded-r-md hover:bg-blue-600 disabled:bg-slate-600'
          disabled={!selectedChatUser || !message.trim()}
        >
            <IoSend />
        </button>
      </div>
    </form>
  )
}

export default SendInput
