import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth.jsx";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);
  const { loading,error } = useSelector((state)=>state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);
    dispatch(signInStart());
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        // setLoading(false);
        // setError(true);
        dispatch(signInFailure(data.message));
        return;
      }
      // setLoading(false);
      // setError(false)
      dispatch(signInSuccess(data));
      navigate("/");

      console.log(data);
    } catch (error) {
      // setLoading(false);
      // setError(true);
      dispatch(signInFailure(error.message))
      console.log(error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-center my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Email"
          id="email"
          className=" p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Password"
          id="password"
          className="p-3 rounded-lg"
          onChange={handleChange}
        />
        <button className="bg-slate-700 rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80 text-white">
          {loading ? "Loading..." : "Sign-In"}
        </button>
       <OAuth/>
      </form>
      <div className="flex p-5 gap-2">
        <p>Dont have and account ? </p>
        <Link to="/sign-up">
          <span className="text-blue-500 ">Sign Up</span>
        </Link>
        <p className="text-red-500">{error && "Something went wrong!"}</p>
      </div>
    </div>
  );
}
