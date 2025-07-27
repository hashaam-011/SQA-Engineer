import React, { useState, useEffect } from 'react';
import './App.css';

const API_BASE_URL = 'http://localhost:5000/api';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  // Load todos when logged in
  useEffect(() => {
    if (isLoggedIn) {
      fetchTodos();
    }
  }, [isLoggedIn]);

  // Apply dark mode to body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const showMessage = (msg, isError = false) => {
    const messageWithType = isError ? `error: ${msg}` : msg;
    setMessage(messageWithType);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Add a small delay to make loading state more visible
      await new Promise(resolve => setTimeout(resolve, 500));

      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsLoggedIn(true);
        showMessage('Login successful');
      } else {
        showMessage('Invalid credentials', true);
      }
    } catch (error) {
      showMessage('Network error. Please check if server is running.', true);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setTodos([]);
    setUsername('');
    setPassword('');
    showMessage('Logout successful');
  };

  const fetchTodos = async () => {
    try {
      console.log('Fetching todos from server...');
      const response = await fetch(`${API_BASE_URL}/items`);
      const data = await response.json();
      console.log('Fetched todos from server:', data);
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
      showMessage('Failed to fetch todos', true);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodoText.trim()) return;

    try {
      const response = await fetch(`${API_BASE_URL}/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newTodoText }),
      });

      const newTodo = await response.json();
      console.log('Adding todo:', newTodo);
      setTodos(prevTodos => {
        const updatedTodos = [...prevTodos, newTodo];
        console.log('Updated todos after add:', updatedTodos);
        return updatedTodos;
      });
      setNewTodoText('');
      showMessage('Todo added successfully');
      // Small delay to ensure state update is processed
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      showMessage('Failed to add todo', true);
    }
  };

  const updateTodo = async (id, updates) => {
    try {
      const response = await fetch(`${API_BASE_URL}/items/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      const updatedTodo = await response.json();
      setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo));
      setEditingId(null);
      setEditText('');
      showMessage('Todo updated successfully');
    } catch (error) {
      showMessage('Failed to update todo', true);
    }
  };

  const deleteTodo = async (id) => {
    try {
      console.log('Starting delete for todo id:', id);
      console.log('Current todos before delete:', todos);

      const response = await fetch(`${API_BASE_URL}/items/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Delete failed with status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Delete API response:', result);

      // Update state after successful API call
      setTodos(prevTodos => {
        const updatedTodos = prevTodos.filter(todo => todo.id !== id);
        console.log('Updated todos after delete:', updatedTodos);
        return updatedTodos;
      });

      showMessage('Todo deleted successfully');
      // Add a small delay to ensure state update is processed
      await new Promise(resolve => setTimeout(resolve, 200));
    } catch (error) {
      console.error('Delete error:', error);
      showMessage('Failed to delete todo', true);
    }
  };

  const startEditing = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = () => {
    if (editText.trim()) {
      updateTodo(editingId, { text: editText.trim() });
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const toggleComplete = (todo) => {
    updateTodo(todo.id, { completed: !todo.completed });
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Calculate stats
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const pendingTodos = totalTodos - completedTodos;

  if (!isLoggedIn) {
    return (
      <div className="App">
        <div className="login-container">
          <div className="login-header">
            <div className="logo">📋</div>
            <h1>TaskMaster Pro</h1>
            <h2>Your Professional Task Management Solution</h2>
          </div>
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                data-testid="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                data-testid="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            <button type="submit" data-testid="login-button" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
          <div className="credentials">
            <p><strong>Demo Credentials:</strong></p>
            <p>Username: testuser</p>
            <p>Password: testpass</p>
          </div>
          {message && (
            <div className={`message ${message.includes('error:') ? 'error' : 'success'}`}>
              {message.includes('error:') ? '⚠️' : '✅'} {message.replace('error: ', '')}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1>📋 TaskMaster Dashboard</h1>
          <div className="header-actions">
            <button onClick={toggleDarkMode} className="theme-toggle">
              {darkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
            <button onClick={handleLogout} data-testid="logout-button" className="logout-btn">Sign Out</button>
          </div>
        </header>

        {message && (
          <div className={`message ${message.includes('error:') ? 'error' : 'success'}`}>
            {message.includes('error:') ? '⚠️' : '✅'} {message.replace('error: ', '')}
          </div>
        )}

        <div className="stats-section">
          <div className="stat-card">
            <div className="stat-number">{totalTodos}</div>
            <div className="stat-label">Total Tasks</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{completedTodos}</div>
            <div className="stat-label">Completed</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{pendingTodos}</div>
            <div className="stat-label">Pending</div>
          </div>
        </div>

        <form onSubmit={addTodo} className="add-todo-form">
          <input
            type="text"
            data-testid="todo-input"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            placeholder="What needs to be done?"
            className="todo-input"
          />
          <button type="submit" data-testid="add-button" className="add-btn">Add Task</button>
        </form>

        <div className="todos-list">
          {todos.length === 0 ? (
            <div className="no-todos">
              <p>🎉 No tasks yet! Start by adding your first task above.</p>
            </div>
          ) : (
            todos.map(todo => (
              <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                <input
                  type="checkbox"
                  data-testid="todo-checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo)}
                  className="todo-checkbox"
                />

                {editingId === todo.id ? (
                  <div className="edit-mode">
                    <input
                      type="text"
                      data-testid="edit-input"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="edit-input"
                      autoFocus
                    />
                    <button onClick={saveEdit} data-testid="save-button" className="save-btn">Save</button>
                    <button onClick={cancelEdit} className="cancel-btn">Cancel</button>
                  </div>
                ) : (
                  <div className="todo-content">
                    <span className="todo-text">{todo.text}</span>
                    <div className="todo-actions">
                      <button onClick={() => startEditing(todo)} data-testid="edit-button" className="edit-btn">Edit</button>
                      <button onClick={() => deleteTodo(todo.id)} data-testid="delete-button" className="delete-btn">Delete</button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;


