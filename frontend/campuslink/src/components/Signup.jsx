import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../userSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import image from '../images/signup.png'

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);

  const schema = Yup.object().shape({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setApiError(null);
    setLoading(true);

    try {
      const response = await fetch("https://campus-link-jd0k.onrender.com/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to signup");
      }

      const result = await response.json();

      localStorage.setItem("token", result.token);
      dispatch(setUser({
        username: result.username,
        email: result.email,
        token: result.token,
      }));

      navigate("/"); // Redirect to homepage or dashboard
    } catch (error) {
      setApiError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sm:justify-center bg-gray-100 grid lg:grid-cols-2 justify-center items-center min-h-screen">
    <div className="hidden lg:flex h-[550px] flex justify-center">
          <img src={image} alt="side" className="max-w-full h-auto m-3" />
    </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col p-[60px] items-center gap-6 w-full lg:max-w-md lg:p-10 bg-violet-500 rounded shadow"
      >
        <label className="text-white text-4xl font-bold">Signup</label>

        <input
          type="text"
          {...register("username")}
          placeholder="Enter username"
          className="w-full lg:w-[90%] rounded p-2"
          disabled={loading}
        />
        {errors.username && (
          <p className="text-red-200 text-m mr-auto p-4 pt-0 pb-0 -mt-4">
            {errors.username.message}
          </p>
        )}

        <input
          type="email"
          {...register("email")}
          placeholder="Enter email"
          className="w-full lg:w-[90%] rounded p-2"
          disabled={loading}
        />
        {errors.email && (
          <p className="text-red-200 text-m mr-auto p-4 pt-0 pb-0 -mt-4">
            {errors.email.message}
          </p>
        )}

        <input
          type="password"
          {...register("password")}
          placeholder="Enter password"
          className="w-full lg:w-[90%] rounded p-2"
          disabled={loading}
        />
        {errors.password && (
          <p className="text-red-200 text-m mr-auto p-4 pt-0 pb-0 -mt-4">
            {errors.password.message}
          </p>
        )}

        {apiError && <p className="text-red-300 font-semibold">{apiError}</p>}

        <Link
          to="/login"
          className="text-white font-bold mr-auto underline pl-6"
        >
          Have an account? Login
        </Link>

        <button
          type="submit"
          disabled={loading}
          className={`w-[90%] border-2 rounded border-blue-50 p-2 text-white font-bold hover:bg-white hover:text-violet-500 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Signing up..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
