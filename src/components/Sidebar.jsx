import React from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { BiSearchAlt2 } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import OtherUsers from './OtherUsers';
import { clearAuthUser } from '../redux/userSlice';

const Sidebar = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchQuery, setSearchQuery] = React.useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchInputClassName =
    'w-full rounded-md border border-slate-600 bg-slate-900 px-4 py-2 text-slate-100 outline-none transition focus:border-blue-500';
  const searchButtonClassName =
    'inline-flex items-center justify-center rounded-md bg-zinc-700 px-3 py-2 text-white transition hover:bg-zinc-600';
  const logoutButtonClassName =
    'w-full rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600';
  
  const logoutHandler = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/user/logout', {
        withCredentials: true,
      });

      dispatch(clearAuthUser());
      toast.success(response.data.message);
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Logout failed');
    }
  };
  const searchSubmitHandler = (event) => {
    event.preventDefault();
    setSearchQuery(searchTerm.trim());
  };

  const searchChangeHandler = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (!value.trim()) {
      setSearchQuery('');
    }
  }

  return (
    <div className='border-r border-slate-500 p-4 flex flex-col'>
      <form onSubmit={searchSubmitHandler}
        action=""
        className='flex items-center gap-2'
      >
        <input
          value={searchTerm}
          onChange={searchChangeHandler}
          className={searchInputClassName}
          type="text"
          placeholder='Search users...'
        />
        
        <button type='submit' className={searchButtonClassName}>
          <BiSearchAlt2 className='w-6 h-6 outline-none' />
        </button>
      </form>

      <div className="my-4 h-px bg-slate-700"></div>

      <OtherUsers searchQuery={searchQuery} />
      <div className='mt-auto'>
        <button
          onClick={logoutHandler}
          className={logoutButtonClassName}
        >
          Logout
        </button>
      </div>
      
    </div>
  )
}

export default Sidebar
