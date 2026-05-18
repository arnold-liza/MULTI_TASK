import React, { useState } from 'react';

const BookLibrarySystem = () => {
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({ title: '', author: '', year: '' });
  const [editingId, setEditingId] = useState(null);
  const [filterTerm, setFilterTerm] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.author || !formData.year) return;

    if (editingId) {
      setBooks(books.map((b) => (b.id === editingId ? { ...formData, id: editingId } : b)));
      setEditingId(null);
    } else {
      setBooks([...books, { ...formData, id: Date.now() }]);
    }
    setFormData({ title: '', author: '', year: '' });
  };

  const handleEdit = (book) => {
    setEditingId(book.id);
    setFormData({ title: book.title, author: book.author, year: book.year });
  };

  const handleDelete = (id) => {
    setBooks(books.filter((b) => b.id !== id));
  };

  const filteredBooks = books.filter((book) =>
    book.author.toLowerCase().includes(filterTerm.toLowerCase()) ||
    book.year.toString().includes(filterTerm)
  );

  return (
    <div className="min-h-screen bg-stone-50 p-6 md:p-12 font-serif">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-stone-800 mb-2 underline decoration-amber-500 underline-offset-8">
            Library Catalog
          </h1>
          <p className="text-stone-600 italic">Curate and organize the collection</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Management Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-sm">
              <h2 className="text-xl font-bold text-stone-700 mb-4 flex items-center gap-2">
                <span className="w-2 h-6 bg-amber-500 rounded-full"></span>
                {editingId ? 'Edit Entry' : 'New Arrival'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">Book Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border-b-2 border-stone-100 focus:border-amber-500 outline-none transition-colors"
                    placeholder="The Great Gatsby"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">Author</label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border-b-2 border-stone-100 focus:border-amber-500 outline-none transition-colors"
                    placeholder="F. Scott Fitzgerald"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">Year</label>
                  <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border-b-2 border-stone-100 focus:border-amber-500 outline-none transition-colors"
                    placeholder="1925"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-stone-800 hover:bg-stone-900 text-amber-50 py-2 rounded font-bold transition-all transform active:scale-95"
                >
                  {editingId ? 'Update Record' : 'Catalog Book'}
                </button>
              </form>
            </div>

            <div className="bg-amber-50 p-6 rounded-lg border border-amber-100">
              <h3 className="text-sm font-bold text-amber-800 uppercase tracking-tighter mb-3">Quick Filter</h3>
              <input
                type="text"
                placeholder="Filter by author or year..."
                value={filterTerm}
                onChange={(e) => setFilterTerm(e.target.value)}
                className="w-full px-4 py-2 bg-white border border-amber-200 rounded-md focus:ring-2 focus:ring-amber-500 outline-none text-sm"
              />
            </div>
          </div>

          {/* Book Display Grid */}
          <div className="lg:col-span-3">
            {filteredBooks.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 bg-white rounded-xl border border-dashed border-stone-300 text-stone-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <p className="text-lg">The archive is empty or matches no search.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredBooks.map((book) => (
                  <div key={book.id} className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-amber-500 hover:shadow-md transition-shadow relative group">
                    <div className="mb-4">
                      <span className="text-xs font-black text-amber-600 bg-amber-50 px-2 py-1 rounded uppercase tracking-tighter">
                        Published: {book.year}
                      </span>
                      <h3 className="text-2xl font-bold text-stone-800 mt-2 leading-tight">{book.title}</h3>
                      <p className="text-stone-500 italic">by {book.author}</p>
                    </div>
                    
                    <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-stone-50 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleEdit(book)} className="text-stone-400 hover:text-amber-600 font-bold text-sm uppercase tracking-widest">Edit</button>
                      <button onClick={() => handleDelete(book.id)} className="text-stone-400 hover:text-red-600 font-bold text-sm uppercase tracking-widest">Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookLibrarySystem;