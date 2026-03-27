import { useEffect, useState } from "react";
import API from "../utils/api";

export default function Products() {

    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        const res = await API.get("/products");
        setProducts(res.data);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-xl mb-4">Products</h2>

            <table className="border w-full">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>SKU</th>
                        <th>Qty</th>
                    </tr>
                </thead>
                <tbody>

                    {products.map((p) => (
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
