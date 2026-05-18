import React, { useState } from 'react';

const ProductInventoryApp = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ name: '', price: '', quantity: '' });
  const [editingId, setEditingId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.quantity) return;

    if (editingId) {
      setProducts(products.map((p) => (p.id === editingId ? { ...formData, id: editingId } : p)));
      setEditingId(null);
    } else {
      setProducts([...products, { ...formData, id: Date.now() }]);
    }
    setFormData({ name: '', price: '', quantity: '' });
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setFormData({ name: product.name, price: product.price, quantity: product.quantity });
  };

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">Product Inventory</h1>
          <p className="text-slate-500 mt-2">Track stock levels and manage product pricing</p>
        </header>

        {/* Add/Edit Product Form */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 mb-12">
          <h2 className="text-xl font-bold mb-6 text-slate-700">
            {editingId ? 'Update Product Details' : 'Register New Product'}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-600">Product Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                placeholder="e.g. Wireless Mouse"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-600">Price ($)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                placeholder="0.00"
                step="0.01"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-600">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                placeholder="0"
                required
              />
            </div>
            <button
              type="submit"
              className={`w-full py-2.5 rounded-xl font-bold text-white transition-all transform active:scale-95 shadow-lg ${
                editingId ? 'bg-orange-500 hover:bg-orange-600 shadow-orange-200' : 'bg-slate-800 hover:bg-slate-900 shadow-slate-200'
              }`}
            >
              {editingId ? 'Save Changes' : 'Add to Catalog'}
            </button>
          </form>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => {
            const isLowStock = parseInt(product.quantity) < 5;
            return (
              <div
                key={product.id}
                className={`p-6 rounded-2xl border-2 transition-all hover:shadow-lg bg-white relative overflow-hidden ${
                  isLowStock ? 'border-orange-200 bg-orange-50/20' : 'border-transparent shadow-sm'
                }`}
              >
                {isLowStock && (
                  <div className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] font-black px-3 py-1 rounded-bl-xl uppercase">
                    Low Stock
                  </div>
                )}
                <h3 className="text-lg font-bold text-slate-800 mb-1">{product.name}</h3>
                <p className="text-2xl font-black text-slate-900 mb-4">${parseFloat(product.price).toFixed(2)}</p>
                
                <div className={`text-sm mb-6 inline-flex items-center px-3 py-1 rounded-full font-bold ${isLowStock ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-600'}`}>
                  Stock: {product.quantity} units
                </div>

                <div className="flex gap-2">
                  <button onClick={() => handleEdit(product)} className="flex-1 text-sm font-bold py-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">Edit</button>
                  <button onClick={() => handleDelete(product.id)} className="flex-1 text-sm font-bold py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors">Delete</button>
                </div>
              </div>
            );
          })}
        </div>

        {products.length === 0 && (
          <div className="text-center py-20 bg-slate-100 rounded-3xl border-4 border-dashed border-slate-200 text-slate-400 font-medium">
            No products found. Start by adding one above.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductInventoryApp;