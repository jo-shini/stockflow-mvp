import { useEffect, useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Products() {

    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const fetchProducts = async () => {
        const res = await API.get("/products");
        setProducts(res.data);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const deleteProduct = async (id) => {
        if (!window.confirm("Delete this product?")) return;
        await API.delete(`/products/${id}`);
        fetchProducts();
    };

    return (
        <>
            <div className="p-6">
                <div className="flex justify-between mb-4">
                    <h2 className="text-2xl">Products</h2>

                    <button
                        onClick={() => navigate("/add")}
                        className="bg-green-500 text-white px-4 py-2"
                    >
                        + Add Product
                    </button>
                </div>

                <table className="border w-full text-left">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-2">Name</th>
                            <th>SKU</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((p) => (
                            <tr key={p._id} className="border-t">
                                <td className="p-2">{p.name}</td>
                                <td>{p.sku}</td>
                                <td>{p.quantity}</td>
                                <td>{p.sellingPrice}</td>

                                <td className="space-x-2">
                                    <button
                                        onClick={() => navigate(`/edit/${p._id}`)}
                                        className="bg-blue-500 text-white px-2 py-1"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteProduct(p._id)}
                                        className="bg-red-500 text-white px-2 py-1"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>

    );

}
