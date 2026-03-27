import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="bg-gray-800 text-white p-4 flex justify-between">
            <h1 className="font-bold">StockFlow</h1>

            <div className="space-x-4">
                <button onClick={() => navigate("/dashboard")}>Dashboard</button>
                <button onClick={() => navigate("/products")}>Products</button>
                <button onClick={() => navigate("/add")}>Add Product</button>
                <button onClick={logout} className="text-red-400">Logout</button>
            </div>
        </div>
    );
}