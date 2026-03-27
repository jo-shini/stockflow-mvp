import { useState } from "react";
import API from "../utils/api";

export default function ProductForm() {
    const [form, setForm] = useState({ name: "", sku: "", quantity: 0 });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await API.post("/products", form);
        alert("Product added");
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 space-y-3">
            <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input placeholder="SKU" onChange={(e) => setForm({ ...form, sku: e.target.value })} />
            <input placeholder="Qty" type="number" onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
            <button className="bg-green-500 text-white px-3 py-1">Add</button>
        </form>
    );
}