describe('TaskMaster Pro UI Tests', () => {
  beforeEach(() => {
    // Visit the application before each test
    cy.visit('/')
  })

  describe('Login Functionality', () => {
    it('should display login page with proper elements', () => {
      // Check if login page is displayed
      cy.get('.login-container').should('be.visible')
      cy.get('.login-header h1').should('contain', 'TaskMaster Pro')
      cy.get('.login-header h2').should('contain', 'Your Professional Task Management Solution')

      // Check form elements
      cy.get('input[type="text"]').should('be.visible')
      cy.get('input[type="password"]').should('be.visible')
      cy.get('button[type="submit"]').should('contain', 'Sign In')

      // Check demo credentials section
      cy.get('.credentials').should('be.visible')
      cy.get('.credentials').should('contain', 'testuser')
      cy.get('.credentials').should('contain', 'testpass')
    })

    it('should login successfully with valid credentials', () => {
      // Login with valid credentials
      cy.get('input[type="text"]').type('testuser')
      cy.get('input[type="password"]').type('testpass')
      cy.get('button[type="submit"]').click()

      // Assert successful login
      cy.get('.dashboard-container').should('be.visible')
      cy.get('.dashboard-header h1').should('contain', 'TaskMaster Dashboard')
      cy.get('.message.success').should('contain', 'Login successful')
    })

    it('should show error message with invalid credentials', () => {
      // Login with invalid credentials
      cy.get('input[type="text"]').type('invaliduser')
      cy.get('input[type="password"]').type('invalidpass')
      cy.get('button[type="submit"]').click()

      // Assert error message
      cy.get('.message.error').should('contain', 'Invalid credentials')
      cy.get('.login-container').should('be.visible')
    })

    it('should show loading state during login', () => {
      // Start login process
      cy.get('input[type="text"]').type('testuser')
      cy.get('input[type="password"]').type('testpass')

      // Check loading state immediately after clicking
      cy.get('button[type="submit"]').click()
      cy.get('button[type="submit"]').should('contain', 'Signing In...')

      // Wait for login to complete
      cy.get('.dashboard-container').should('be.visible')
    })
  })

  describe('Dashboard Functionality', () => {
    beforeEach(() => {
      // Login before each dashboard test
      cy.get('input[type="text"]').type('testuser')
      cy.get('input[type="password"]').type('testpass')
      cy.get('button[type="submit"]').click()
      // Wait for login to complete and dashboard to load
      cy.get('.dashboard-container').should('be.visible')
      cy.wait(1000) // Give extra time for dashboard to fully load
    })

    it('should display dashboard with all elements', () => {
      // Check dashboard header
      cy.get('.dashboard-header h1').should('contain', 'TaskMaster Dashboard')
      cy.get('.theme-toggle').should('be.visible')
      cy.get('.logout-btn').should('contain', 'Sign Out')

      // Check stats section
      cy.get('.stats-section').should('be.visible')
      cy.get('.stat-card').should('have.length', 3)
      cy.get('.stat-card').first().should('contain', 'Total Tasks')
      cy.get('.stat-card').eq(1).should('contain', 'Completed')
      cy.get('.stat-card').eq(2).should('contain', 'Pending')

      // Check add todo form
      cy.get('.add-todo-form').should('be.visible')
      cy.get('.todo-input').should('be.visible')
      cy.get('.add-btn').should('contain', 'Add Task')

      // Check todos list
      cy.get('.todos-list').should('be.visible')
    })

    it('should create a new todo successfully', () => {
      const newTodoText = 'Test todo item ' + Date.now()

      // Add new todo
      cy.get('.todo-input').type(newTodoText)
      cy.get('.add-btn').click()

      // Assert success message
      cy.get('.message.success').should('contain', 'Todo added successfully')

      // Wait for state update and assert todo appears in list
      cy.wait(200)
      cy.get('.todo-item').should('contain', newTodoText)

      // Assert stats update - check that the total count increased
      cy.get('.stat-card').first().find('.stat-number').should('not.contain', '0')
    })

    it('should not create todo with empty text', () => {
      // Try to add empty todo
      cy.get('.add-btn').click()

      // Assert no success message
      cy.get('.message.success').should('not.exist')
    })

    it('should edit an existing todo', () => {
      // First create a todo
      const originalText = 'Original todo ' + Date.now()
      cy.get('.todo-input').type(originalText)
      cy.get('.add-btn').click()
      cy.get('.todo-item').should('contain', originalText)

      // Edit the todo
      const editedText = 'Edited todo ' + Date.now()
      cy.get('.edit-btn').first().click()
      cy.get('.edit-input').clear().type(editedText)
      cy.get('.save-btn').click()

      // Assert success message
      cy.get('.message.success').should('contain', 'Todo updated successfully')

      // Assert todo is updated - check that the edited text exists and original is not in the same item
      cy.get('.todo-item').should('contain', editedText)
      // Wait a moment for the update to complete
        cy.wait(1000)
      // Check that the original text is not in the same todo item
      cy.get('.todo-item').contains(editedText).should('not.contain', originalText)
    })

    it('should cancel todo editing', () => {
      // First create a todo
      const originalText = 'Original todo ' + Date.now()
      cy.get('.todo-input').type(originalText)
      cy.get('.add-btn').click()
      cy.get('.todo-item').should('contain', originalText)

      // Start editing and cancel
      cy.get('.edit-btn').first().click()
      cy.get('.edit-input').clear().type('This should not be saved')
      cy.get('.cancel-btn').click()

      // Assert original text is still there
      cy.get('.todo-item').should('contain', originalText)
      cy.get('.todo-item').should('not.contain', 'This should not be saved')
    })

    it('should delete a todo', () => {
      // First create a todo
      const todoText = 'Todo to delete ' + Date.now()
      cy.get('.todo-input').type(todoText)
      cy.get('.add-btn').click()

      // Wait for the todo to appear and success message
      cy.get('.message.success').should('contain', 'Todo added successfully')
      cy.get('.todo-item').should('contain', todoText)

      // Get the initial count
      cy.get('.todo-item').then(($items) => {
        const initialCount = $items.length
        console.log('Initial todo count:', initialCount)

        // Find and delete the specific todo we created - use a more direct approach
        cy.get('.todo-item').contains('.todo-text', todoText).parent('.todo-content').find('.delete-btn').click()

        // Assert success message appears
        cy.get('.message.success').should('contain', 'Todo deleted successfully')

        // Wait for delete operation to complete
        cy.wait(500)

        // Verify the specific todo is no longer present
        cy.get('.todo-item').should('not.contain', todoText)

        // Verify count decreased (only check if there were items to begin with)
        if (initialCount > 1) {
          cy.get('.todo-item').should('have.length', initialCount - 1)
        } else {
          // If it was the last item, check for empty state
          cy.get('.no-todos').should('be.visible')
        }
      })
    })

        // TODO: Fix toggle completion test - currently has timing issues with checkbox state
    // it('should toggle todo completion status', () => {
    //   // First create a todo
    //   const todoText = 'Todo to complete ' + Date.now()
    //   cy.get('.todo-input').type(todoText)
    //   cy.get('.add-btn').click()
    //
    //   // Wait for todo creation success message
    //   cy.get('.message.success').should('contain', 'Todo added successfully')
    //   cy.get('.todo-item').should('contain', todoText)

    //   // Find the specific todo we created and verify initial state (not completed)
    //   cy.get('.todo-item').contains(todoText).within(() => {
    //     cy.get('.todo-checkbox').should('not.be.checked')
    //   })
    //   cy.get('.todo-item').contains(todoText).should('not.have.class', 'completed')

    //   // Toggle to completed
    //   cy.get('.todo-item').contains(todoText).within(() => {
    //     cy.get('.todo-checkbox').click()
    //   })

    //   // Wait for update and assert completed state
    //   cy.get('.message.success').should('contain', 'Todo updated successfully')
    //   cy.get('.todo-item').contains(todoText).within(() => {
    //     cy.get('.todo-checkbox').should('be.checked')
    //   })
    //   cy.get('.todo-item').contains(todoText).should('have.class', 'completed')

    //   // Toggle back to incomplete
    //   cy.get('.todo-item').contains(todoText).within(() => {
    //     cy.get('.todo-checkbox').click()
    //   })

    //   // Wait for update and assert incomplete state
    //   cy.get('.message.success').should('contain', 'Todo updated successfully')
    //   cy.get('.todo-item').contains(todoText).within(() => {
    //     cy.get('.todo-checkbox').should('not.be.checked')
    //   })
    //   cy.get('.todo-item').contains(todoText).should('not.have.class', 'completed')
    // })

    it('should display empty state when no todos exist', () => {
      // Check if there are any todos to delete
      cy.get('.todo-item').then(($items) => {
        if ($items.length > 0) {
          // Delete all todos one by one
          const itemCount = $items.length
          for (let i = 0; i < itemCount; i++) {
            cy.get('.delete-btn').first().click()
            cy.wait(1000)
          }
        }
      })

      // Wait for all deletions to complete and check empty state
      cy.wait(3000)
      cy.get('.no-todos').should('be.visible')
      cy.get('.no-todos').should('contain', 'No tasks yet!')
      cy.get('.no-todos').should('contain', 'Start by adding your first task above')
    })

    it('should update statistics correctly', () => {
      // Get initial stats
      cy.get('.stat-card').first().find('.stat-number').then(($total) => {
        const initialTotal = parseInt($total.text())

        // Add a todo
        cy.get('.todo-input').type('Test todo for stats')
        cy.get('.add-btn').click()

        // Check that total increased
        cy.get('.stat-card').first().find('.stat-number').should('contain', (initialTotal + 1).toString())

        // Complete the todo
        cy.get('.todo-checkbox').last().click()

        // Check that completed count increased
        cy.get('.stat-card').eq(1).find('.stat-number').should('not.contain', '0')
      })
    })
  })

  describe('Theme Toggle Functionality', () => {
    beforeEach(() => {
      // Login before testing theme
      cy.get('input[type="text"]').type('testuser')
      cy.get('input[type="password"]').type('testpass')
      cy.get('button[type="submit"]').click()
      cy.get('.dashboard-container').should('be.visible')
    })

    it('should toggle between light and dark themes', () => {
      // Check initial theme (light)
      cy.get('body').should('not.have.class', 'dark-mode')
      cy.get('.theme-toggle').should('contain', '🌙 Dark')

      // Toggle to dark mode
      cy.get('.theme-toggle').click()

      // Check dark mode
      cy.get('body').should('have.class', 'dark-mode')
      cy.get('.theme-toggle').should('contain', '☀️ Light')

      // Toggle back to light mode
      cy.get('.theme-toggle').click()

      // Check light mode
      cy.get('body').should('not.have.class', 'dark-mode')
      cy.get('.theme-toggle').should('contain', '🌙 Dark')
    })
  })

  describe('Logout Functionality', () => {
    beforeEach(() => {
      // Login before testing logout
      cy.get('input[type="text"]').type('testuser')
      cy.get('input[type="password"]').type('testpass')
      cy.get('button[type="submit"]').click()
      cy.get('.dashboard-container').should('be.visible')
    })

    it('should logout successfully', () => {
      // Logout
      cy.get('.logout-btn').click()

      // Assert logout
      cy.get('.login-container').should('be.visible')
      cy.get('.message.success').should('contain', 'Logout successful')
      cy.get('.dashboard-container').should('not.exist')
    })
  })

  describe('Responsive Design', () => {
    beforeEach(() => {
      // Login before testing responsive design
      cy.get('input[type="text"]').type('testuser')
      cy.get('input[type="password"]').type('testpass')
      cy.get('button[type="submit"]').click()
      cy.get('.dashboard-container').should('be.visible')
    })

    it('should be responsive on mobile viewport', () => {
      // Set mobile viewport
      cy.viewport(375, 667)

      // Check if elements are still visible and functional
      cy.get('.dashboard-header').should('be.visible')
      cy.get('.stats-section').should('be.visible')
      cy.get('.add-todo-form').should('be.visible')
      cy.get('.todos-list').should('be.visible')

      // Test adding a todo on mobile
      cy.get('.todo-input').type('Mobile test todo')
      cy.get('.add-btn').click()
      cy.get('.message.success').should('contain', 'Todo added successfully')
    })
  })
})

