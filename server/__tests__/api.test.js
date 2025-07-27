const request = require('supertest');
const app = require('../server');

describe('TaskMaster Pro API Tests', () => {
  let server;

  beforeAll((done) => {
    // Start the server for testing
    server = app.listen(5001, () => {
      console.log('🚀 Test server running on port 5001');
      done();
    });
  });

  afterAll((done) => {
    // Close the server after tests
    server.close(() => {
      console.log('✅ Test server closed');
      done();
    });
  });

  describe('Health Check Endpoints', () => {
    test('GET / - Should return server status', async () => {
      const response = await request(app)
        .get('/')
        .expect(200);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('QA Engineer Server is running!');
    });

    test('GET /api/test - Should return API test status', async () => {
      const response = await request(app)
        .get('/api/test')
        .expect(200);

      expect(response.body).toHaveProperty('status', 'success');
      expect(response.body).toHaveProperty('message', 'Server API is working!');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('Authentication Endpoints', () => {
    describe('POST /api/login', () => {
      test('Should login successfully with valid credentials (Positive)', async () => {
        const validCredentials = {
          username: 'testuser',
          password: 'testpass'
        };

        const response = await request(app)
          .post('/api/login')
          .send(validCredentials)
          .expect(200);

        expect(response.body).toHaveProperty('success', true);
        expect(response.body).toHaveProperty('message', 'Login successful');
        expect(response.body).toHaveProperty('user');
        expect(response.body.user).toHaveProperty('username', 'testuser');
        expect(response.body.user).toHaveProperty('id', 1);
      });

      test('Should fail login with invalid username (Negative)', async () => {
        const invalidCredentials = {
          username: 'invaliduser',
          password: 'testpass'
        };

        const response = await request(app)
          .post('/api/login')
          .send(invalidCredentials)
          .expect(401);

        expect(response.body).toHaveProperty('success', false);
        expect(response.body).toHaveProperty('message', 'Invalid credentials');
      });

      test('Should fail login with invalid password (Negative)', async () => {
        const invalidCredentials = {
          username: 'testuser',
          password: 'invalidpass'
        };

        const response = await request(app)
          .post('/api/login')
          .send(invalidCredentials)
          .expect(401);

        expect(response.body).toHaveProperty('success', false);
        expect(response.body).toHaveProperty('message', 'Invalid credentials');
      });

      test('Should fail login with missing username (Negative)', async () => {
        const invalidCredentials = {
          password: 'testpass'
        };

        const response = await request(app)
          .post('/api/login')
          .send(invalidCredentials)
          .expect(401);

        expect(response.body).toHaveProperty('success', false);
        expect(response.body).toHaveProperty('message', 'Invalid credentials');
      });

      test('Should fail login with missing password (Negative)', async () => {
        const invalidCredentials = {
          username: 'testuser'
        };

        const response = await request(app)
          .post('/api/login')
          .send(invalidCredentials)
          .expect(401);

        expect(response.body).toHaveProperty('success', false);
        expect(response.body).toHaveProperty('message', 'Invalid credentials');
      });

      test('Should fail login with empty credentials (Negative)', async () => {
        const invalidCredentials = {
          username: '',
          password: ''
        };

        const response = await request(app)
          .post('/api/login')
          .send(invalidCredentials)
          .expect(401);

        expect(response.body).toHaveProperty('success', false);
        expect(response.body).toHaveProperty('message', 'Invalid credentials');
      });
    });
  });

  describe('Todo Items Endpoints', () => {
    describe('GET /api/items', () => {
      test('Should return all todos (Positive)', async () => {
        const response = await request(app)
          .get('/api/items')
          .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThanOrEqual(0);

        // Check if todos have required properties
        if (response.body.length > 0) {
          const todo = response.body[0];
          expect(todo).toHaveProperty('id');
          expect(todo).toHaveProperty('text');
          expect(todo).toHaveProperty('completed');
          expect(typeof todo.id).toBe('number');
          expect(typeof todo.text).toBe('string');
          expect(typeof todo.completed).toBe('boolean');
        }
      });
    });

    describe('POST /api/items', () => {
      test('Should create a new todo with valid text (Positive)', async () => {
        const newTodo = {
          text: 'Test todo item ' + Date.now()
        };

        const response = await request(app)
          .post('/api/items')
          .send(newTodo)
          .expect(201);

        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('text', newTodo.text);
        expect(response.body).toHaveProperty('completed', false);
        expect(typeof response.body.id).toBe('number');
      });

      test('Should fail to create todo with empty text (Negative)', async () => {
        const invalidTodo = {
          text: ''
        };

        const response = await request(app)
          .post('/api/items')
          .send(invalidTodo)
          .expect(400);

        expect(response.body).toHaveProperty('success', false);
        expect(response.body).toHaveProperty('message', 'Todo text is required');
      });

      test('Should fail to create todo with whitespace only text (Negative)', async () => {
        const invalidTodo = {
          text: '   '
        };

        const response = await request(app)
          .post('/api/items')
          .send(invalidTodo)
          .expect(400);

        expect(response.body).toHaveProperty('success', false);
        expect(response.body).toHaveProperty('message', 'Todo text is required');
      });

      test('Should fail to create todo with missing text property (Negative)', async () => {
        const invalidTodo = {};

        const response = await request(app)
          .post('/api/items')
          .send(invalidTodo)
          .expect(400);

        expect(response.body).toHaveProperty('success', false);
        expect(response.body).toHaveProperty('message', 'Todo text is required');
      });
    });

    describe('PUT /api/items/:id', () => {
      test('Should update todo text successfully (Positive)', async () => {
        // First create a todo to update
        const newTodo = {
          text: 'Original todo ' + Date.now()
        };

        const createResponse = await request(app)
          .post('/api/items')
          .send(newTodo)
          .expect(201);

        const todoId = createResponse.body.id;
        const updatedText = 'Updated todo ' + Date.now();

        const response = await request(app)
          .put(`/api/items/${todoId}`)
          .send({ text: updatedText })
          .expect(200);

        expect(response.body).toHaveProperty('id', todoId);
        expect(response.body).toHaveProperty('text', updatedText);
        expect(response.body).toHaveProperty('completed', false);
      });

      test('Should update todo completion status successfully (Positive)', async () => {
        // First create a todo to update
        const newTodo = {
          text: 'Todo to complete ' + Date.now()
        };

        const createResponse = await request(app)
          .post('/api/items')
          .send(newTodo)
          .expect(201);

        const todoId = createResponse.body.id;

        // Update completion status
        const response = await request(app)
          .put(`/api/items/${todoId}`)
          .send({ completed: true })
          .expect(200);

        expect(response.body).toHaveProperty('id', todoId);
        expect(response.body).toHaveProperty('text', newTodo.text);
        expect(response.body).toHaveProperty('completed', true);
      });

      test('Should fail to update non-existent todo (Negative)', async () => {
        const nonExistentId = 99999;
        const updateData = {
          text: 'This should fail'
        };

        const response = await request(app)
          .put(`/api/items/${nonExistentId}`)
          .send(updateData)
          .expect(404);

        expect(response.body).toHaveProperty('success', false);
        expect(response.body).toHaveProperty('message', 'Todo not found');
      });
    });

    describe('DELETE /api/items/:id', () => {
      test('Should delete existing todo successfully (Positive)', async () => {
        // First create a todo to delete
        const newTodo = {
          text: 'Todo to delete ' + Date.now()
        };

        const createResponse = await request(app)
          .post('/api/items')
          .send(newTodo)
          .expect(201);

        const todoId = createResponse.body.id;

        // Delete the todo
        const response = await request(app)
          .delete(`/api/items/${todoId}`)
          .expect(200);

        expect(response.body).toHaveProperty('success', true);
        expect(response.body).toHaveProperty('message', 'Todo deleted successfully');
        expect(response.body).toHaveProperty('deletedTodo');
        expect(response.body.deletedTodo).toHaveProperty('id', todoId);
        expect(response.body.deletedTodo).toHaveProperty('text', newTodo.text);
      });

      test('Should fail to delete non-existent todo (Negative)', async () => {
        const nonExistentId = 99999;

        const response = await request(app)
          .delete(`/api/items/${nonExistentId}`)
          .expect(404);

        expect(response.body).toHaveProperty('success', false);
        expect(response.body).toHaveProperty('message', 'Todo not found');
      });
    });
  });

  describe('Error Handling', () => {
    test('Should handle requests to non-existent endpoints', async () => {
      const response = await request(app)
        .get('/api/nonexistent')
        .expect(404);
    });

    test('Should handle unsupported HTTP methods', async () => {
      const response = await request(app)
        .patch('/api/items/1')
        .expect(404);
    });
  });

  describe('Data Integrity Tests', () => {
    test('Should maintain data consistency across CRUD operations', async () => {
      // Create a todo
      const newTodo = {
        text: 'Data integrity test ' + Date.now()
      };

      const createResponse = await request(app)
        .post('/api/items')
        .send(newTodo)
        .expect(201);

      const todoId = createResponse.body.id;

      // Verify it exists
      const getResponse = await request(app)
        .get('/api/items')
        .expect(200);

      const createdTodo = getResponse.body.find(todo => todo.id === todoId);
      expect(createdTodo).toBeDefined();
      expect(createdTodo.text).toBe(newTodo.text);
      expect(createdTodo.completed).toBe(false);

      // Update it
      const updatedText = 'Updated data integrity test ' + Date.now();
      const updateResponse = await request(app)
        .put(`/api/items/${todoId}`)
        .send({ text: updatedText, completed: true })
        .expect(200);

      expect(updateResponse.body.text).toBe(updatedText);
      expect(updateResponse.body.completed).toBe(true);

      // Verify update persisted
      const getUpdatedResponse = await request(app)
        .get('/api/items')
        .expect(200);

      const updatedTodo = getUpdatedResponse.body.find(todo => todo.id === todoId);
      expect(updatedTodo).toBeDefined();
      expect(updatedTodo.text).toBe(updatedText);
      expect(updatedTodo.completed).toBe(true);

      // Delete it
      await request(app)
        .delete(`/api/items/${todoId}`)
        .expect(200);

      // Verify it's deleted
      const getDeletedResponse = await request(app)
        .get('/api/items')
        .expect(200);

      const deletedTodo = getDeletedResponse.body.find(todo => todo.id === todoId);
      expect(deletedTodo).toBeUndefined();
    });
  });
});