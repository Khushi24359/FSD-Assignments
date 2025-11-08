import { useState } from "react";

interface Product {
  _id?: string;
  name: string;
  price: number;
  image: string;
}

export default function AdminPanel({ fetchProducts }: { fetchProducts: () => void }) {
  const API_URL = "http://localhost:5000/api/products";
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Product>({ name: "", price: 0, image: "" });
  const [editId, setEditId] = useState<string | null>(null);

  const getAll = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setProducts(data);
  };

  const saveProduct = async () => {
    if (!form.name || !form.image || !form.price) return alert("All fields required!");
    const method = editId ? "PUT" : "POST";
    const url = editId ? `${API_URL}/${editId}` : API_URL;
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ name: "", price: 0, image: "" });
    setEditId(null);
    fetchProducts();
    getAll();
  };

  const deleteProduct = async (id: string) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    getAll();
    fetchProducts();
  };

  const editProduct = (p: Product) => {
    setForm(p);
    setEditId(p._id!);
  };

  // Load products once when admin opens the panel
  useState(() => {
    getAll();
  });

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-700">Admin Panel</h2>

      {/* Add / Edit Form */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border rounded-md p-2"
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
          className="border rounded-md p-2"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          className="border rounded-md p-2"
        />
      </div>
      <button
        onClick={saveProduct}
        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 mb-6 transition"
      >
        {editId ? "Update Product" : "Add Product"}
      </button>

      {/* Product List Table */}
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Image</th>
            <th className="p-2">Name</th>
            <th className="p-2">Price</th>
            <th className="p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id} className="border-b hover:bg-gray-50">
              <td className="p-2">
                <img src={p.image} alt={p.name} className="h-12 w-12 object-cover rounded-md" />
              </td>
              <td className="p-2">{p.name}</td>
              <td className="p-2">₹{p.price}</td>
              <td className="p-2 text-center">
                <button onClick={() => editProduct(p)} className="text-blue-600 mr-3">
                  ✏️
                </button>
                <button onClick={() => deleteProduct(p._id!)} className="text-red-600">
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
