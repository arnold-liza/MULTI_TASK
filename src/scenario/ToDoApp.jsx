import React, { useState } from 'react';

const ToDoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskTitle, setEditingTaskTitle] = useState('');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTaskTitle.trim() === '') return;

    const newTask = {
      id: Date.now(),
      title: newTaskTitle.trim(),
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
  };

  const handleToggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleEditClick = (task) => {
    setEditingTaskId(task.id);
    setEditingTaskTitle(task.title);
  };

  const handleUpdateTask = (e, id) => {
    e.preventDefault();
    if (editingTaskTitle.trim() === '') return;

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, title: editingTaskTitle.trim() } : task
      )
    );
    setEditingTaskId(null);
    setEditingTaskTitle('');
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-6 flex items-center justify-center font-sans">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">My To-Do List</h1>

        {/* Add New Task Form */}
        <form onSubmit={handleAddTask} className="flex gap-3 mb-8">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Add a new task..."
            className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-200 ease-in-out transform active:scale-95"
          >
            Add Task
          </button>
        </form>

        {/* Task List */}
        {tasks.length === 0 ? (
          <p className="text-center text-gray-500 text-lg py-10">No tasks yet! Start by adding one above.</p>
        ) : (
          <ul className="space-y-4">
            {tasks.map((task) => (
              <li
                key={task.id}
                className={`flex items-center justify-between p-4 rounded-lg shadow-sm transition-all duration-200 ease-in-out ${
                  task.completed ? 'bg-gray-100 text-gray-500 line-through' : 'bg-white text-gray-800 border border-gray-200'
                }`}
              >
                <div className="flex items-center flex-grow">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleComplete(task.id)}
                    className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                  />
                  {editingTaskId === task.id ? (
                    <form onSubmit={(e) => handleUpdateTask(e, task.id)} className="flex-grow ml-3">
                      <input
                        type="text"
                        value={editingTaskTitle}
                        onChange={(e) => setEditingTaskTitle(e.target.value)}
                        onBlur={(e) => handleUpdateTask(e, task.id)} // Save on blur
                        className="w-full px-2 py-1 border border-blue-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
                        autoFocus
                      />
                    </form>
                  ) : (
                    <span className={`ml-3 text-lg ${task.completed ? 'text-gray-500' : 'text-gray-800'}`}>
                      {task.title}
                    </span>
                  )}
                </div>

                <div className="flex space-x-2 ml-4">
                  {editingTaskId !== task.id && (
                    <button
                      onClick={() => handleEditClick(task)}
                      className="p-2 rounded-full text-blue-500 hover:bg-blue-100 transition-colors duration-200"
                      title="Edit Task"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zm-6.707 6.707L10.293 13.5a1 1 0 00.316.316l3.5 1.5a1 1 0 001.302-1.302l-1.5-3.5a1 1 0 00-.316-.316l-3.5-3.5-2.828 2.828z" />
                      </svg>
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="p-2 rounded-full text-red-500 hover:bg-red-100 transition-colors duration-200"
                    title="Delete Task"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 11-2 0v6a1 1 0 112 0V8z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ToDoApp;