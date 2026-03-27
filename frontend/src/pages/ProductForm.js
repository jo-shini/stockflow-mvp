import { useState, useEffect } from "react";

import API from "../utils/api";

import { useParams, useNavigate } from "react-router-dom";

export default function ProductForm() {

    const [form, setForm] = useState({

        name: "",

        sku: "",

        quantity: "",

        sellingPrice: "",

        lowStockThreshold: "",

    });

    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {

        if (id) fetchProduct();

    }, [id]);

    const fetchProduct = async () => {

        const res = await API.get("/products");

        const product = res.data.find((p) => p._id === id);

        if (product) setForm(product);

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const payload = {

            ...form,

            quantity: Number(form.quantity),

            sellingPrice: Number(form.sellingPrice),

            lowStockThreshold: Number(form.lowStockThreshold) || 5,

        };

        if (id) {

            await API.put(`/products/${id}`, payload);

        } else {

            await API.post("/products", payload);

        }

        navigate("/products");

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">

                    {id ? "Edit Product" : "Add Product"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium mb-1">

                            Product Name
                        </label>
                        <input

                            type="text"

                            value={form.name}

                            placeholder="Enter product name"

                            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"

                            onChange={(e) =>

                                setForm({ ...form, name: e.target.value })

                            }

                            required

                        />
                    </div>

                    {/* SKU */}
                    <div>
                        <label className="block text-sm font-medium mb-1">

                            SKU
                        </label>
                        <input

                            type="text"

                            value={form.sku}

                            placeholder="Enter SKU"

                            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"

                            onChange={(e) =>

                                setForm({ ...form, sku: e.target.value })

                            }

                            required

                        />
                    </div>

                    {/* Quantity */}
                    <div>
                        <label className="block text-sm font-medium mb-1">

                            Quantity
                        </label>
                        <input

                            type="number"

                            value={form.quantity}

                            placeholder="Enter quantity"

                            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"

                            onChange={(e) =>

                                setForm({ ...form, quantity: e.target.value })

                            }

                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-sm font-medium mb-1">

                            Selling Price
                        </label>
                        <input

                            type="number"

                            value={form.sellingPrice}

                            placeholder="Enter price"

                            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"

                            onChange={(e) =>

                                setForm({ ...form, sellingPrice: e.target.value })

                            }

                        />
                    </div>

                    {/* Low Stock Threshold */}
                    <div>
                        <label className="block text-sm font-medium mb-1">

                            Low Stock Threshold
                        </label>
                        <input

                            type="number"

                            value={form.lowStockThreshold}

                            placeholder="Default = 5"

                            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"

                            onChange={(e) =>

                                setForm({

                                    ...form,

                                    lowStockThreshold: e.target.value,

                                })

                            }

                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between items-center pt-4">
                        <button

                            type="button"

                            onClick={() => navigate("/products")}

                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        >

                            Cancel
                        </button>

                        <button

                            type="submit"

                            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >

                            {id ? "Update Product" : "Create Product"}
                        </button>
                    </div>

                </form>
            </div>
        </div>

    );

}
