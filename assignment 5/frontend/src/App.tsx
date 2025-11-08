import { useState } from "react";
import Login from "./components/Login";
import AdminPanel from "./components/AdminPanel";
import ProductCatalog from "./components/ProductCatalog";

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [view, setView] = useState<"catalog" | "admin">("catalog");

  // ✅ Add this function (required by AdminPanel)
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();
      console.log("Fetched products:", data);
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };

  if (!isAdmin) {
    return <Login onLogin={() => setIsAdmin(true)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
      <div className="flex justify-between items-center p-4">
        <h1 className="text-3xl font-bold text-indigo-700">🛍️ Product Catalog</h1>

        <div className="space-x-3">
          <button
            onClick={() => setView("catalog")}
            className={`px-4 py-2 rounded-lg ${
              view === "catalog"
                ? "bg-indigo-600 text-white"
                : "bg-white text-indigo-600 border border-indigo-600"
            }`}
          >
            View Catalog
          </button>
          <button
            onClick={() => setView("admin")}
            className={`px-4 py-2 rounded-lg ${
              view === "admin"
                ? "bg-indigo-600 text-white"
                : "bg-white text-indigo-600 border border-indigo-600"
            }`}
          >
            Admin Panel
          </button>
        </div>
      </div>

      {/* ✅ Pass fetchProducts prop here */}
      {view === "catalog" ? (
        <ProductCatalog />
      ) : (
        <AdminPanel fetchProducts={fetchProducts} />
      )}
    </div>
  );
}
