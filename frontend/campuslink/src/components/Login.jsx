import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { setUser } from '../userSlice';  // import the new action
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from 'axios';
import image from '../images/loginimg.png'

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const schema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password should be at least 6 characters").required("Password is required"),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setServerError('');

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email: data.email,
        password: data.password,
      });

      const { token, username, email } = response.data;

      localStorage.setItem('token', token); 

      dispatch(setUser({ email, username, token }));

      navigate('/');
    } catch (error) {
      if (error.response?.data?.message) {
        setServerError(error.response.data.message);
      } else {
        setServerError('Login failed. Please try again.');
      }
    }

    setLoading(false);
  };

  return (
    <div className=" grid grid-cols-2 gap-x-2 justify-center items-center min-h-screen bg-cover bg-center bg-gray-100">
  <div className="flex justify-center">
    <img src={image} alt="side" className="max-w-full h-[380px] m-3" />
  </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-6 w-full max-w-md p-10 bg-violet-500 rounded shadow"
      >
        <label className="text-white text-4xl font-bold">Login</label>

        <input
          type="text"
          {...register("email")}
          placeholder="Enter email"
          className="w-[90%] rounded p-2"
          disabled={loading}
        />
        {errors.email && (
          <p className="text-red-200 text-sm mr-auto px-4 -mt-4">{errors.email.message}</p>
        )}

        <input
          type="password"
          {...register("password")}
          placeholder="Enter password"
          className="w-[90%] rounded p-2"
          disabled={loading}
        />
        {errors.password && (
          <p className="text-red-200 text-sm mr-auto px-4 -mt-4">{errors.password.message}</p>
        )}

        {serverError && (
          <p className="text-red-200 text-sm text-center">{serverError}</p>
        )}
         <Link
          to="/signup"
          className="text-white font-bold mr-auto underline pl-6"
        >
          Do&apos;t have an account? Signup
        </Link>

        <button
          type="submit"
          className="w-[90%] border-2 rounded border-blue-50 p-2 text-white font-bold hover:bg-white hover:text-violet-500"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
