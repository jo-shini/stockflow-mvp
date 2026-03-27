import { useEffect, useState } from "react";

import API from "../utils/api";

export default function Dashboard() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const res = await API.get("/products");
        setProducts(res.data);
    };

    // calculations
    const totalProducts = products.length;
    const totalQuantity = products.reduce(
        (sum, p) => sum + (p.quantity || 0),
        0
    );

    const lowStockItems = products.filter(
        (p) => (p.quantity || 0) <= (p.lowStockThreshold || 5)
    );

    return (
        <div className="p-6">
            <h2 className="text-2xl mb-4">Dashboard</h2>

            {/* Summary */}
            <div className="flex gap-4 mb-6">
                <div className="border p-4">
                    <p>Total Products</p>
                    <h3 className="text-xl">{totalProducts}</h3>
                </div>

                <div className="border p-4">
                    <p>Total Quantity</p>
                    <h3 className="text-xl">{totalQuantity}</h3>
                </div>
            </div>

            {/* Low Stock */}
            <h3 className="text-xl mb-2">Low Stock Items</h3>

            <table className="border w-full">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>SKU</th>
                        <th>Qty</th>
                    </tr>
                </thead>
                <tbody>

                    {lowStockItems.map((p) => (
                        <tr key={p._id}>
                            <td>{p.name}</td>
                            <td>{p.sku}</td>
                            <td>{p.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );

}
