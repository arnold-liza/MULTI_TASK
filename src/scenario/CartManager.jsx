import React, { useState } from 'react';

const CartManager = () => {
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({ name: '', price: '', quantity: 1 });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addToCart = (e) => {
    e.preventDefault();
    if (!formData.name || formData.price <= 0 || formData.quantity <= 0) return;

    const newItem = {
      id: Date.now(),
      name: formData.name,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
    };

    setCartItems([...cartItems, newItem]);
    setFormData({ name: '', price: '', quantity: 1 });
  };

  const updateQuantity = (id, amount) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + amount;
        return { ...item, quantity: newQty > 0 ? newQty : 1 };
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-zinc-50 p-6 md:p-12 font-sans text-zinc-900">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-zinc-800">Shopping Cart Manager</h1>
          <p className="text-zinc-500">Prototype your online store checkout experience</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Item Form */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-200">
              <h2 className="text-lg font-semibold mb-4">Add Item</h2>
              <form onSubmit={addToCart} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-500 uppercase mb-1">Item Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="Product name"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-500 uppercase mb-1">Price ($)</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      placeholder="0.00"
                      step="0.01"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-500 uppercase mb-1">Qty</label>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      placeholder="0"
                      min="1"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-colors shadow-lg shadow-blue-100"
                >
                  Add to Cart
                </button>
              </form>
            </div>
          </div>

          {/* Cart List & Summary */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.length === 0 ? (
              <div className="bg-zinc-100 border-2 border-dashed border-zinc-200 rounded-2xl p-12 text-center text-zinc-400">
                Your cart is empty.
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="bg-white p-4 rounded-xl border border-zinc-200 flex items-center justify-between shadow-sm">
                      <div className="flex-1">
                        <h3 className="font-bold text-zinc-800">{item.name}</h3>
                        <p className="text-sm text-zinc-500">${item.price.toFixed(2)} each</p>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex items-center bg-zinc-100 rounded-lg p-1">
                          <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-md transition-colors text-zinc-600 font-bold">-</button>
                          <span className="w-10 text-center font-bold text-sm">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-md transition-colors text-zinc-600 font-bold">+</button>
                        </div>
                        <div className="w-24 text-right">
                          <p className="font-bold text-blue-600">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="text-zinc-300 hover:text-red-500 transition-colors p-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 11-2 0v6a1 1 0 112 0V8z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary Card */}
                <div className="bg-zinc-800 text-white p-6 rounded-2xl shadow-xl">
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400 font-medium">Order Total</span>
                    <span className="text-3xl font-black">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartManager;