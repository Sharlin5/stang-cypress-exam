// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('auth', (userType) => {
    cy.session(`${userType}Session`, () => {
      cy.fixture('users').then((users) => {
        const user = users[userType]
        if (!user) {
          throw new Error("User type \"" + userType + "\" not found in fixtures/users.json")
        }
        cy.visit('/login')
        cy.get('[data-testid="input-username"]').type(user.username)
        cy.get('[data-testid="input-password"]').type(user.password)
        cy.get('[data-testid="login-button"]').click()
        cy.url().should('include', user.redirectUrl)
  
        // Add a check for authentication indicators
        cy.contains('Log out').should('be.visible')
      })
    }, {
      cacheAcrossSpecs: true,
      // Add cookie validation for server-side auth
      validate() {
        // Check for the specific Supabase cookie
        return cy.getCookie('sb-bxcqtplcvglztzrzczsi-auth-token')
          .then(cookie => {
            if (!cookie) return false
            // Optionally check if token isn't expired
            try {
              const parsed = JSON.parse(decodeURIComponent(cookie.value))
              const expiryTime = parsed?.expiresAt || 0
              return Date.now() < expiryTime * 1000
            } catch {
              // If parsing fails, just check cookie presence
              return !!cookie
            }
          })
      }
    })
  })

  Cypress.Commands.add('login', (registrationData) => {
    cy.get('[data-testid="input-username"]').type(registrationData.username)
    cy.get('[data-testid="input-password"]').type(registrationData.password)
    cy.get('[data-testid="login-button"]').click()
  })

  Cypress.Commands.add('register', (registrationData) => {
    // Fill registration form
    cy.get('#username').type(registrationData.username)
    cy.get('#email').type(registrationData.email)
    cy.get('#password').type(registrationData.password)
    cy.get('#confirmPassword').type(registrationData.confirmPassword)

    // Select role using the roleId from the generated data
    cy.get('#' + registrationData.roleId).check()
  })

  Cypress.Commands.add('loginAsQuizMaster', () => {
    cy.auth('quizMaster')
  })
  
  Cypress.Commands.add('loginAsRegularUser', () => {
    cy.auth('regularUser')
  })

  Cypress.Commands.add('LoggedOut', () => {
    cy.contains('Log out').click()
    cy.url().should('include', '/login')
    cy.clearAllSessionStorage()
  });