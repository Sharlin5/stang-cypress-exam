/// <reference types ="cypress" />

import { generateRegistrationData } from "../../support/fakerUtils";

describe('Sprint 1 - Registration for Quiz Master & Regular Users', { testIsolation: false }, () => {
    let registrationData = null
    after(() => {
        cy.LoggedOut()
    })
    before(() => {
        cy.visit('/register')
    })
    it('Verify user registration works for both Quiz Master and Regular User roles', () => {
        // The role is set to 'quiz_master' or 'user' in the registration data
        registrationData = generateRegistrationData()

        cy.log('Registering as ' + (registrationData.role === 'quiz_master' ? 'Quiz Master' : 'Regular User'))

        cy.register(registrationData)
        
        // Submit form
        cy.contains('Register').should('be.visible').click()
        cy.wait(2000)
        cy.url().should('include', '/login')
    })

    it('Verify newly created account can successfully log in and access appropriate URL', () => {
        // Login with the registration data from the previous test
        cy.log('Logging in as ' + registrationData.username)
        cy.get('[data-testid="input-username"]').type(registrationData.username)
        cy.get('[data-testid="input-password"]').type(registrationData.password)
        cy.get('[data-testid="login-button"]').click()

        cy.wait(2000)
        // Verify successful login
        cy.url().should('include', registrationData.expectedRedirect, { timeout: 10000 })
        cy.contains('Log out').should('be.visible')

        // Additional verifications based on role
        if (registrationData.role === 'quiz_master') {
            cy.contains('Manage Topics').should('be.visible')
        } else {
            cy.contains('Browse Topics').should('be.visible')
        }
    })
})

describe('Sprint 1 - Non-Deterministic', () => {
    beforeEach(() => {
        cy.visit('/register')
    })

    it('Verify user cannot register without inputs', () => {
        cy.contains('Register').should('be.visible').click()
        cy.wait(2000)
        cy.url().should('include', '/register')
        cy.contains('Username must be at least 3 characters').should('be.visible')
        cy.contains('Please enter a valid email').should('be.visible')
        cy.contains('Password must be at least 6 characters').should('be.visible')
    })
})