import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            let res=await axios.post("http://localhost:5000/api/auth/login", formData, {
                withCredentials: true,
            });
            localStorage.setItem('user',res.data.user.name)
            localStorage.setItem("userId", res.data.user.id);
            navigate("/");


            // console.log(res.data.user.id)
        } catch (err) {
            setError(err.response?.data?.message || "Invalid credentials");
        } 
    };

    return (
        <div className="min-h-screen flex items-center justify-center ">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl shadow-2xl w-96"
            >
                <h2 className="text-2xl font-bold  mb-6 text-center">
                    Welcome Back
                </h2>

                {error && (
                    <p className=" text-red-600 p-2 rounded mb-4 text-sm">
                        {error}
                    </p>
                )}

                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="w-full mb-4 p-3 border rounded "
                    onChange={handleChange}
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="w-full mb-6 p-3 border rounded "
                    onChange={handleChange}
                />

                <button
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded"
                >
                    Login
                </button>

                <p className="text-sm text-center mt-4">
                    Don’t have an account?{" "}
                    <span
                        onClick={() => navigate("/signup")}
                        className="cursor-pointer fd"
                    >
                        Sign up
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Login;
