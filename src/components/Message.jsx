import React from 'react';
import { useSelector } from 'react-redux';
import { getAvatarFallbackUrl, getAvatarUrl } from '../utils/avatar';

const Message = ({ message }) => {
  const { authUser, selectedChatUser } = useSelector((store) => store.user);
  const senderId = String(message?.senderId || message?.sender?._id || message?.sender);
  const isOwnMessage = String(authUser?._id) === senderId;
  const otherParticipant = !isOwnMessage ? message?.sender : message?.receiver;
  const senderLabel = isOwnMessage
    ? 'You'
    : (otherParticipant?.fullName || selectedChatUser?.fullName || 'User');
  const avatarUser = isOwnMessage
    ? (message?.sender || authUser)
    : (otherParticipant || selectedChatUser);
  const profilePhoto = getAvatarUrl(avatarUser);
  const formattedTime = message?.createdAt
    ? new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : '';

  return (
    <div className={`flex w-full items-end gap-3 py-2 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
      {!isOwnMessage ? (
        <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-slate-700 bg-slate-800">
          <img
            alt={senderLabel}
            src={profilePhoto}
            className="h-full w-full object-cover"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = getAvatarFallbackUrl(avatarUser);
            }}
          />
        </div>
      ) : null}

      <div className={`flex max-w-[75%] flex-col ${isOwnMessage ? 'items-end' : 'items-start'}`}>
        <div className="mb-1 flex items-center gap-2 text-xs text-slate-300">
          <span>{senderLabel}</span>
          {formattedTime ? <time>{formattedTime}</time> : null}
        </div>

        <div
          className={`rounded-2xl px-4 py-2 text-sm shadow-sm ${
            isOwnMessage
              ? 'rounded-br-md bg-blue-500 text-white'
              : 'rounded-bl-md bg-slate-800 text-slate-100'
          }`}
        >
          {message?.content}
        </div>
      </div>
    </div>
  );
};

export default Message;
