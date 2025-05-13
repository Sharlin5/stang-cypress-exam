# Sharlin Tang Cypress Exam
The website to be tested: "https://testautomation-ph-quiz-app.vercel.app". The focus of testing is the register page.

## Setup & Installations
- This part contains how to setup the repository and add the different dependencies to be used to perform **Cypress** testing.
### 1. Create Git Repository
- This is to help store the program in a remote repository.
- Steps:
    - Click **New** to create a repository
    - Name: *stang-cypress-exam*
    - Add .gitignore select Node.
    - Click **Create Repository** when done.
### 2. Clone Repository
- Create folder to store the repository. You can name it as 'CypressProject'
- Open your cmd or vscode terminal and perform the following:
- Redirect to your selected folder as shown below
```bash
cd ~/CypressProject
git clone https://github.com/Sharlin5/stang-cypress-exam.git
```
### 3. Install Cypress
- Before installing Cypress make sure you have **Node.js** installed
- To check perform the following in your cmd
```bash
node -v
npm -v
```
- To start the installation make sure you are in the directory you want to perform cypress tests
```bash
npm init -y
npm install cypress save-dev
npx cypress --version
```
- *npm init* initialize npm and create package.json 
- *npx cypress --version* checks if you installed cypress properly
### 4. Setup Cypress e2e tests
```bash
npx cypress open
```
- This opens a User Interface for Cypress
- Select *E2E Testing*
- Click *Continue*
- Inside the project **stang-cypress-exam** add *e2e* folder inside the cypress folder or add new spec file via the Cypress User Interface.
### 5. Install and Setup Faker
```bash
npm install @faker-js/faker --save-dev
```
- To use **Faker** add the following to the file using Faker
```js
import { faker } from '@faker-js/faker';
```

## Run in Headed and Headless mode
### 1. Headed Mode
```bash
npx cypress open
```
- select e2e testing
- select registration.cy.js to check the cypress test for registration
### 2. Headless Mode
**Set up**
Add projectId: "96srdf" in cypress config and "registration-test": "npx cypress run --record --key c6cea708-0bee-4c1e-8599-3cae4d43cb1e --spec 'cypress/e2e/regression-testing/registration.cy.js' --browser chrome" in package.json
In the terminal run the following to perform headless test
```bash
npm run registration test
```



