import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthUser, setOtherUser } from '../redux/userSlice';
import { BASE_URL } from '../config';
import { clearAuthToken, getAuthConfig } from '../utils/auth';

const useGetOtherUsers = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (!authUser) {
      setUsers([]);
      return;
    }

    const fetchOtherUsers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/user/`, getAuthConfig());

        dispatch(setOtherUser(response.data.otherUsers));
        setUsers(response.data.otherUsers ?? []);
      } catch (error) {
        if (error.response?.status === 401) {
          clearAuthToken();
          dispatch(clearAuthUser());
          setUsers([]);
          return;
        }

        console.error('Error fetching other users:', error.response?.data || error.message);
      }
    };

    fetchOtherUsers();
  }, [authUser, dispatch]);

  return users;
};

export default useGetOtherUsers;
