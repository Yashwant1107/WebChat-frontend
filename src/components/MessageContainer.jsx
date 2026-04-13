import React from 'react';
import { useSelector } from 'react-redux';
import SendInput from './SendInput';
import Messages from './Messages';
import { getAvatarFallbackUrl, getSidebarAvatarUrl } from '../utils/avatar';

const MessageContainer = () => {

  const { authUser, selectedChatUser, onlineUsers } = useSelector((store) => store.user);
  const chatName = selectedChatUser?.fullName || 'Choose a user';
  const chatPhoto = getSidebarAvatarUrl(selectedChatUser);
  const authName = authUser?.fullName || authUser?.username || 'there';
  const authPhoto = getSidebarAvatarUrl(authUser);
  const isOnline = onlineUsers?.includes(selectedChatUser?._id);

  return selectedChatUser ? (
    <div className='md:min-w-[450px] flex h-full w-full flex-col'>
      <div className='flex items-center gap-3 bg-slate-900 p-3'>
        <div className="relative">
          <div className="h-12 w-12 overflow-hidden rounded-full border border-slate-700 bg-slate-800">
            <img
              src={chatPhoto}
              alt={chatName}
              className="h-full w-full object-cover"
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = getAvatarFallbackUrl(selectedChatUser);
              }}
            />
          </div>
          {isOnline ? (
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-slate-900 bg-emerald-400" />
          ) : null}
        </div>

        <div className="flex items-center gap-4 w-full">
          <p className="font-medium text-slate-100">{chatName}</p>
        </div>

      </div>

      <div className='h-px bg-slate-700'></div>
      <Messages />
      <SendInput />
    </div>
  ) : (
    <div className='flex h-full w-full items-center justify-center px-6 text-center'>
      <div className='flex flex-col items-center gap-4'>
        <div className="h-20 w-20 overflow-hidden rounded-full border border-slate-600 bg-slate-800">
          <img
            src={authPhoto}
            alt={authName}
            className="h-full w-full object-cover"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = getAvatarFallbackUrl(authUser);
            }}
          />
        </div>
        <div>
          <h1 className='text-2xl font-semibold text-white'>Hi, {authName}</h1>
          <p className='mt-2 text-slate-200'>Let's start conversation</p>
          <p className='mt-1 text-sm text-slate-300'>Select a user from the sidebar to view messages.</p>
        </div>
      </div>
    </div>
  );
}
export default MessageContainer
