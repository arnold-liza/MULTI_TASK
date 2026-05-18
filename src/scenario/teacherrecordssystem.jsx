import React, { useState } from 'react';

const TeacherRecordsSystem = () => {
  const [teachers, setTeachers] = useState([]);
  const [formData, setFormData] = useState({ name: '', subject: '', phone: '' });
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.subject || !formData.phone) return;

    if (editingId) {
      setTeachers(teachers.map((t) => (t.id === editingId ? { ...formData, id: editingId } : t)));
      setEditingId(null);
    } else {
      setTeachers([...teachers, { ...formData, id: Date.now() }]);
    }
    setFormData({ name: '', subject: '', phone: '' });
  };

  const handleEdit = (teacher) => {
    setEditingId(teacher.id);
    setFormData({ name: teacher.name, subject: teacher.subject, phone: teacher.phone });
  };

  const handleDelete = (id) => {
    setTeachers(teachers.filter((t) => t.id !== id));
  };

  const filteredTeachers = teachers.filter((t) =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10 font-sans">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Teacher Records</h1>
            <p className="text-gray-500 text-sm">Manage faculty information and assignments</p>
          </div>
          
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search name or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-2.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-10">
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                {editingId ? 'Update Record' : 'Add New Teacher'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600 uppercase">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600 uppercase">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600 uppercase">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className={`w-full py-2.5 rounded-lg font-bold text-white transition-all ${
                    editingId ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-gray-800 hover:bg-gray-900'
                  }`}
                >
                  {editingId ? 'Save Changes' : 'Register Teacher'}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={() => { setEditingId(null); setFormData({ name: '', subject: '', phone: '' }); }}
                    className="w-full text-sm font-medium text-gray-500 hover:text-gray-700"
                  >
                    Cancel Editing
                  </button>
                )}
              </form>
            </div>
          </div>

          {/* Table Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Teacher</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Subject</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Contact</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredTeachers.map((teacher) => (
                    <tr key={teacher.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-gray-800">{teacher.name}</td>
                      <td className="px-6 py-4 text-gray-600"><span className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs font-bold">{teacher.subject}</span></td>
                      <td className="px-6 py-4 text-gray-500 text-sm">{teacher.phone}</td>
                      <td className="px-6 py-4 text-right flex justify-end gap-3">
                        <button onClick={() => handleEdit(teacher)} className="text-emerald-600 hover:text-emerald-800 font-bold text-sm">Edit</button>
                        <button onClick={() => handleDelete(teacher.id)} className="text-red-600 hover:text-red-800 font-bold text-sm">Delete</button>
                      </td>
                    </tr>
                  ))}
                  {filteredTeachers.length === 0 && (
                    <tr>
                      <td colSpan="4" className="px-6 py-10 text-center text-gray-400 italic">
                        No matching records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherRecordsSystem;