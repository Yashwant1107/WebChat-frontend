import React, { useEffect, useRef } from 'react'
import Message from './Message'
import useGetMessages from '../hooks/useGetMessages';
import { useSelector } from "react-redux";

const Messages = () => {
  useGetMessages();
  const { messages } = useSelector(store => store.message);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages]);

  return (
    <div className='px-4 flex-1 overflow-auto'>
      {
        messages?.map((message) => {
          return (
            <Message key={message._id} message={message} />
          )
        })
      }
      <div ref={bottomRef} />
    </div>
  )
}

export default Messages
