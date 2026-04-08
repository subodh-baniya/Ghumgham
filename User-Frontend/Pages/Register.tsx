import React from "react";
import { useState } from "react";
import axios from "axios"


const Register = () => {

  const [form,setform]=useState({
    username:"",
    name:"",
    email:"",
    password:"",
    confirmPassword:""

  })

  const handlechange=(e:React.ChangeEvent<HTMLInputElement>)=>{

    setform({
      ...form,
      [e.target.name]:e.target.value
    })

  }

  const registerUser=(e:React.FormEvent<HTMLFormElement>)=>{
   try {
      e.preventDefault();
      const {confirmPassword,...rest}=form;
 
     if(confirmPassword==""||rest.username==""||rest.name==""||rest.email==""||rest.password==""){
       console.log("all fields are required");
     }
 
     if(confirmPassword!=rest.password){
       console.log("passwords should be same")
     }
 
      
      const res=axios.post(`${import.meta.env.VITE_AUTH_API_BASE_URL}/register`,rest);
      console.log(res);
   } catch (error) {
    console.log(error);
   }

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

        <form className="space-y-4" onSubmit={registerUser}>
          <div>
            <label className="block text-sm font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={form.username}
              placeholder="Enter username"
              onChange={handlechange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

            <div>
            <label className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              name="name"
              type="text"
              value={form.name}
              placeholder="Enter full name"
              onChange={handlechange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              placeholder="Enter email"
              onChange={handlechange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              placeholder="Enter password"
              onChange={handlechange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              placeholder="Enter password"
              onChange={handlechange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition cursor-pointer"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;