import React from 'react';
import useGetOtherUsers from '../hooks/useGetOtherUsers';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedChatUser } from '../redux/userSlice';
import { getAvatarFallbackUrl, getSidebarAvatarUrl } from '../utils/avatar';

const OtherUsers = ({ searchQuery = '' }) => {
  const users = useGetOtherUsers();
  const dispatch = useDispatch();
  const { selectedChatUser, onlineUsers } = useSelector((store) => store.user);
  const normalizedSearchQuery = searchQuery.trim().toLowerCase();
  const filteredUsers = users.filter((user) => {
    if (!normalizedSearchQuery) {
      return true;
    }

    const searchableText = `${user?.username ?? ''} ${user?.fullName ?? ''}`.toLowerCase();
    return searchableText.includes(normalizedSearchQuery);
  });

  const selectedUserHandler = (user) => {
    console.log('Selected user:', user);
    dispatch(setSelectedChatUser(user));
  };

  return (
    <div className='overflow-auto'>
      {filteredUsers.length === 0 ? (
        <p className='px-2 py-3 text-sm text-slate-300'>
          {normalizedSearchQuery ? `No users found for "${searchQuery}".` : 'No users available.'}
        </p>
      ) : null}

      {filteredUsers.map((user) => (
        <div
          key={user._id}
          onClick={() => selectedUserHandler(user)}
          className={`flex cursor-pointer items-center gap-3 rounded-md p-2 transition-colors ${
            selectedChatUser?._id === user._id ? 'bg-zinc-700' : 'hover:bg-zinc-800'
          }`}
        >
          <div className="relative">
            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border border-slate-700 bg-slate-800">
              <img
                src={getSidebarAvatarUrl(user)}
                alt={user?.username}
                className="h-full w-full object-cover"
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = getAvatarFallbackUrl(user);
                }}
              />
            </div>
            {onlineUsers?.includes(user._id) ? (
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-slate-900 bg-emerald-400" />
            ) : null}
          </div>
          <div className="min-w-0">
            <p className="truncate font-medium text-slate-100">{user.username}</p>
            <p className="truncate text-sm text-slate-300">{user.fullName}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OtherUsers;
