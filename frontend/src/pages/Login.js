import { useState } from "react";

import API from "../utils/api";

import { useNavigate } from "react-router-dom";

export default function Login() {

    const [form, setForm] = useState({ email: "", password: "" });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();

        const res = await API.post("/auth/login", form);

        localStorage.setItem("token", res.data.token);

        navigate("/dashboard");

    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">

                    Login
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input

                        type="email"

                        placeholder="Email"

                        className="border p-3 w-full rounded"

                        onChange={(e) =>

                            setForm({ ...form, email: e.target.value })

                        }

                    />

                    <input

                        type="password"

                        placeholder="Password"

                        className="border p-3 w-full rounded"

                        onChange={(e) =>

                            setForm({ ...form, password: e.target.value })

                        }

                    />

                    <button className="bg-blue-600 text-white w-full py-3 rounded hover:bg-blue-700">

                        Login
                    </button>
                </form>

                <p className="text-center mt-4 text-sm">

                    Don’t have an account?{" "}
                    <span

                        className="text-blue-600 cursor-pointer"

                        onClick={() => navigate("/signup")}
                    >

                        Signup
                    </span>
                </p>
            </div>
        </div>

    );

}
