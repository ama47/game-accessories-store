import React from "react";
import Logo from "../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

const schema = yup
  .object({
    username: yup.string().required("Username is required!"),
    firstName: yup.string().required("First Name is required!"),
    lastName: yup.string().required("Last Name is required!"),
    birthDate: yup
      .date()
      .max(new Date(), "Date must not be from the future!")
      .required("Birthday is required!"),
    phoneNumber: yup
      .string()
      .matches(
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}$/,
        "Phone Number must be in valid format!"
      )
      .required("Phone Number is required"),
    email: yup.string().email().required("Email is required"),
    password: yup
      .string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Password must satisfy the conditions!"
      )
      .required("Password is required!"),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match!"),
  })
  .required();

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    data.birthDate = data.birthDate.toISOString().substring(0, 10);
    data["cartId"] = "00000000-0000-0000-0000-000000000000";
    delete data.passwordConfirmation;
    registerUser(data);
  };

  const navigate = useNavigate();
  function registerUser(data) {
    const url = "https://game-accessories-api.onrender.com/api/v1/Users";
    axios
      .post(url, data)
      .then((response) => {
        if (response.status === 200) {
          navigate("/login");
        }
      })
      .catch((error) => {
        if (error.status === 400) {
          alert(error.response.data.message);
        }
      });
  }

  return (
    <div className="flex flex-col font-[sans-serif] sm:h-screen p-4">
      <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
        <div className="text-center mb-12">
          <a href="/#">
            <img src={Logo} alt="logo" className="w-24 inline-block" />
          </a>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Username
              </label>
              <input
                {...register("username")}
                id="username"
                name="username"
                type="text"
                required
                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-pink-500"
                placeholder="Enter Username"
              />
            </div>
            <p className="text-sm text-red-600">{errors.username?.message}</p>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                First Name
              </label>
              <input
                {...register("firstName")}
                id="firstName"
                type="text"
                required
                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-pink-500"
                placeholder="Enter First Name"
              />
            </div>
            <p className="text-sm text-red-600">{errors.firstName?.message}</p>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Last Name
              </label>
              <input
                {...register("lastName")}
                id="lastName"
                type="text"
                required
                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-pink-500"
                placeholder="Enter Last Name"
              />
            </div>
            <p className="text-sm text-red-600">{errors.lastName?.message}</p>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Birthday
              </label>
              <input
                {...register("birthDate")}
                id="birthDate"
                type="date"
                required
                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-pink-500"
                placeholder="Choose Birthday"
              />
            </div>
            <p className="text-sm text-red-600">{errors.birthDate?.message}</p>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Phone Number
              </label>
              <input
                {...register("phoneNumber")}
                id="phoneNumber"
                type="text"
                required
                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-pink-500"
                placeholder="Enter Phone Number"
              />
            </div>
            <p className="text-sm text-red-600">
              {errors.phoneNumber?.message}
            </p>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Email</label>
              <input
                {...register("email")}
                id="email"
                type="text"
                required
                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-pink-500"
                placeholder="Enter email"
              />
            </div>
            <p className="text-sm text-red-600">{errors.email?.message}</p>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Password
              </label>
              <input
                {...register("password")}
                id="password"
                type="password"
                required
                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-pink-500"
                placeholder="Enter password"
              />
            </div>
            <p className="text-sm text-red-600">{errors.password?.message}</p>
            <p className="text-sm mt-5 mb-7">
              Password should have at least 8 characters and must contains
              capital and small letters, numbers and symbols.
            </p>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Confirm Password
              </label>
              <input
                {...register("passwordConfirmation")}
                type="password"
                required
                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-pink-500"
                placeholder="Enter confirm password"
              />
            </div>
            <p className="text-sm text-red-600">
              {errors.passwordConfirmation?.message}
            </p>
          </div>

          <div className="!mt-12">
            <button
              type="submit"
              className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none"
            >
              Create an account
            </button>
          </div>
          <p className="text-gray-800 text-sm mt-6 text-center">
            Already have an account?{" "}
            <Link to="/login">
              <a
                href="/#"
                className="text-pink-600 font-semibold hover:underline ml-1"
              >
                Login here
              </a>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
