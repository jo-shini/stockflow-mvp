import { use, useState } from "react";
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
    }

    return (
        <div className="p-6">
            <h2 className="text-xl mb-4">Login</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
                <input
                    placeholder="Email"
                    className="border p-2 w-full"
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <input
                    placeholder="Password"
                    type="password"
                    className="border p-2 w-full"
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                <button className="bg-blue-500 text-white px-4 py-2">Login</button>
            </form>
        </div>
    )
}