import React from 'react'
import { Link ,useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/userSlice';





  
  const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputClassName =
    'w-full rounded-md border border-slate-600 bg-slate-900 px-4 py-2 text-slate-100 outline-none transition focus:border-blue-500';
  const labelClassName = 'block p-2 text-base text-slate-100';
  const submitButtonClassName =
    'mt-4 w-full rounded-md bg-blue-500 px-4 py-2 font-medium text-white transition hover:bg-blue-600';
  const [user, setUser] = React.useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: ''
  })
  const handleCheckbox = (e) => {
    setUser({ ...user, gender: e.target.value })
  }
  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:8080/api/v1/user/register', user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      if(res.data.success){
        dispatch(setAuthUser(res.data.user));
        navigate('/');
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed')
      console.error("Signup failed:", error.response?.data || error.message)
    }
  }

  return (
    <div className="min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
        <h1 className="text-3xl font-bold text-center">Signup</h1>
        <form onSubmit={onSubmitHandler} action="">
          <div>
            <label className={labelClassName}>
              <span>Full Name</span>
            </label>
            <input
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              className={inputClassName}
              type="text"
              placeholder="Full Name"
              autoComplete="name"
            />
          </div>
          <div>
            <label className={labelClassName}>
              <span>Username</span>
            </label>
            <input value={user.username}
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
            <input value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className={inputClassName}
              type="password"
              placeholder="Password"
              autoComplete="new-password"
            />
          </div>
          <div>
            <label className={labelClassName}>
              <span>Confirm Password</span>
            </label>
            <input value={user.confirmPassword}
              onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
              className={inputClassName}
              type="password"
              placeholder="Confirm Password"
              autoComplete="new-password"
            />
          </div>
          <div className='flex items-center gap-6 my-4 text-white'>

            {/* Male */}
            <label className='flex items-center gap-2'>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={user.gender === "male"}
                onChange={handleCheckbox}
              />
              Male
            </label>

            {/* Female */}
            <label className='flex items-center gap-2'>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={user.gender === "female"}
                onChange={handleCheckbox}
              />
              Female
            </label>

          </div>
          <div>
            <button type="submit" className={submitButtonClassName}>Signup</button>
          </div>
          <Link to="/login" className="text-blue-500 hover:underline flex items-center justify-center mt-4">
            <p>Already have an account? Login here.</p>
          </Link>

        </form>
      </div>
    </div>
  )
}

export default Signup
