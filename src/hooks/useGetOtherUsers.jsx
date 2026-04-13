import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthUser } from '../redux/userSlice';

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
        const response = await axios.get('http://localhost:8080/api/v1/user/', {
          withCredentials: true,
        });

        setUsers(response.data.otherUsers ?? []);
      } catch (error) {
        if (error.response?.status === 401) {
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
