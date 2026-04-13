import React from 'react'
import { Link , useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/userSlice';
import { BASE_URL } from '../config';
import { setAuthToken } from '../utils/auth';

const Login = () => {
  const navigate = useNavigate();
  const inputClassName =
    'w-full rounded-md border border-slate-600 bg-slate-900 px-4 py-2 text-slate-100 outline-none transition focus:border-blue-500';
  const labelClassName = 'block p-2 text-base text-slate-100';
  const submitButtonClassName =
    'mt-4 w-full rounded-md bg-blue-500 px-4 py-2 font-medium text-white transition hover:bg-blue-600';
  const [user, setUser] = React.useState({
      username: '',
      password: '',
    })
    const dispatch = useDispatch();
    const onSubmitHandler = async (e) => {
      e.preventDefault()
      try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/login`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      setAuthToken(res.data.token);
      dispatch(setAuthUser(res.data.user));
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed')
      console.error("Login failed:", error.response?.data || error.message)
    }
    }
  return (
    <div className="min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
        <h1 className="text-3xl font-bold text-center">Login</h1>
        <form onSubmit={onSubmitHandler} action="">
          <div>
            <label className={labelClassName}>
              <span>Username</span>
            </label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className={inputClassName}
              type="text"
              placeholder="Username"
              autoComplete="username"
            />
          </div>
          <div>
            <label className={labelClassName}>
              <span>Password</span>
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className={inputClassName}
              type="password"
              placeholder="Password"
              autoComplete="current-password"
            />
          </div>
          <div>
            <button type="submit" className={submitButtonClassName}>Login</button>
          </div>
          <Link to="/signup" className="text-blue-500 hover:underline flex items-center justify-center mt-4">
            <p>Don't have an account? Signup here.</p>
          </Link>
         
        </form>
      </div>
    </div>
  )
}

export default Login
