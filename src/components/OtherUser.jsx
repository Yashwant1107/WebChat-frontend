import React from 'react'
import { getAvatarFallbackUrl, getAvatarUrl } from '../utils/avatar';
import { useSelector } from 'react-redux';

const OtherUser = ({ user }) => {
  const { onlineUsers } = useSelector((store) => store.user);
  const isOnline = onlineUsers?.includes(user?._id);
  return (
    <div> 
      <div className='flex gap-2 items-center hover:bg-slate-700 rounded-sm p-2 cursor-pointer'>
        <div className="relative">
          <div className="h-12 w-12 overflow-hidden rounded-full border border-slate-700 bg-slate-800">
            <img
              src={getAvatarUrl(user)}
              alt={user?.username}
              className="h-full w-full object-cover"
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = getAvatarFallbackUrl(user);
              }}
            />
          </div>
          {isOnline ? (
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-slate-900 bg-emerald-400" />
          ) : null}
        </div>

        <div className="flex items-center gap-4 w-full">
          <p>{user?.fullName}</p>
        </div>

      </div>

      <div className='my-1 h-px bg-slate-700'></div> 

     
    </div>
  )
}

export default OtherUser;
