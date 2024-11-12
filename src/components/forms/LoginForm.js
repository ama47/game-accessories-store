import React from "react";
import Logo from "../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    loginUser(data);
  };

  const navigate = useNavigate();
  function loginUser(data) {
    const url = "https://game-accessories-api.onrender.com/api/v1/Users/signIn";
    axios
      .post(url, data)
      .then((response) => {
        localStorage.setItem("token", response.data);
        navigate("/profile");
        navigate(0);
      })
      .catch((error) => {
        if (error.status === 401 || error.status === 500) {
          alert(error.response.data.message);
        }
      });
  }

  return (
    <div className="bg-gray-50 font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
          <a href="/#">
            <img src={Logo} alt="logo" className="w-24 mb-10 mx-auto block" />
          </a>

          <div className="p-8 rounded-2xl bg-white shadow">
            <h2 className="text-gray-800 text-center text-2xl font-bold">
              Login
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Email
                </label>
                <div className="relative flex items-center">
                  <input
                    {...register("email")}
                    id="email"
                    name="email"
                    type="text"
                    required
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-pink-600"
                    placeholder="Enter email"
                  />
                </div>
                <p className="text-sm text-red-600">{errors.email?.message}</p>
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    {...register("password")}
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-pink-600"
                    placeholder="Enter password"
                  />
                </div>
                <p className="text-sm text-red-600">
                  {errors.password?.message}
                </p>
              </div>
              <div className="!mt-8">
                <button
                  type="submit"
                  className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-pink-600 hover:bg-pink-700 focus:outline-none"
                >
                  Sign in
                </button>
              </div>
              <p className="text-gray-800 text-sm !mt-8 text-center">
                Don't have an account?{" "}
                <Link
                  to="/signUp"
                  className="text-pink-600 hover:underline ml-1 whitespace-nowrap font-semibold"
                >
                  Register here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
