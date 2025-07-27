const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage
let todos = [
  { id: 1, text: 'Learn React Testing', completed: false },
  { id: 2, text: 'Write API tests', completed: false },
  { id: 3, text: 'Deploy application', completed: false }
];

let nextId = 4;

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'QA Engineer Server is running!' });
});

// API routes
app.get('/api/test', (req, res) => {
  res.json({
    status: 'success',
    message: 'Server API is working!',
    timestamp: new Date().toISOString()
  });
});

// Login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Simple authentication - in real app, you'd use proper auth
  if (username === 'testuser' && password === 'testpass') {
    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: { username, id: 1 }
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }
});

// GET /items - Return all todos
app.get('/api/items', (req, res) => {
  res.json(todos);
});

// POST /items - Create new todo
app.post('/api/items', (req, res) => {
  const { text } = req.body;

  if (!text || text.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'Todo text is required'
    });
  }

  const newTodo = {
    id: nextId++,
    text: text.trim(),
    completed: false
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT /items/:id - Update todo
app.put('/api/items/:id', (req, res) => {
  const { id } = req.params;
  const { text, completed } = req.body;

  const todoIndex = todos.findIndex(todo => todo.id === parseInt(id));

  if (todoIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Todo not found'
    });
  }

  const updatedTodo = {
    ...todos[todoIndex],
    text: text !== undefined ? text : todos[todoIndex].text,
    completed: completed !== undefined ? completed : todos[todoIndex].completed
  };

  todos[todoIndex] = updatedTodo;
  res.json(updatedTodo);
});

// DELETE /items/:id - Delete todo
app.delete('/api/items/:id', (req, res) => {
  const { id } = req.params;

  const todoIndex = todos.findIndex(todo => todo.id === parseInt(id));

  if (todoIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Todo not found'
    });
  }

  const deletedTodo = todos.splice(todoIndex, 1)[0];
  res.json({
    success: true,
    message: 'Todo deleted successfully',
    deletedTodo
  });
});

// Start server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📡 API available at http://localhost:${PORT}`);
    console.log(`🔗 Test endpoint: http://localhost:${PORT}/api/test`);
    console.log(`🔐 Login endpoint: http://localhost:${PORT}/api/login`);
    console.log(`📝 Items endpoint: http://localhost:${PORT}/api/items`);
  });
}

module.exports = app;
