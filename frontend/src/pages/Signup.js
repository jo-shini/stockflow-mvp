import { useState } from "react";

import API from "../utils/api";

import { useNavigate } from "react-router-dom";

export default function Signup() {

    const [form, setForm] = useState({

        email: "",

        password: "",

        organizationName: "",

    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();

        await API.post("/auth/signup", form);

        alert("Signup successful! Please login.");

        navigate("/");

    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">

                    Signup
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input

                        placeholder="Organization Name"

                        className="border p-3 w-full rounded"

                        onChange={(e) =>

                            setForm({

                                ...form,

                                organizationName: e.target.value,

                            })

                        }

                    />

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

                    <button className="bg-green-600 text-white w-full py-3 rounded hover:bg-green-700">

                        Signup
                    </button>
                </form>

                <p className="text-center mt-4 text-sm">

                    Already have an account?{" "}
                    <span

                        className="text-blue-600 cursor-pointer"

                        onClick={() => navigate("/")}
                    >

                        Login
                    </span>
                </p>
            </div>
        </div>

    );

}
