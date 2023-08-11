# Online Car Rental System

This is an assignment for UTS Master of IT, which achieved a High Distinction grade and was invited to participate in the software engineering showcase of the 2023 UTS Tech Festival.

In this project, an online car rental service was developed using React.js, Node.js, and MySQL. User research and usability testing were conducted to improve the user experience in major user flows.

# Framework Information

1.  Front-end: React.JS, react-dom, react-hook-form, axios, Formik & Yup(Form validation)
2.  Back-end: Node.JS
3.  Database: MySQL, express
4.  Unit test: Jest, Mock Service Worker

## Installation

To install and run the project, follow these steps:

1.  Clone the repository.
2.  Navigate to the project directory.
3.  Go to the "Client" file, and install the dependencies using `npm install`.
4.  Start the front-end project with `npm start`.
5.  Go to the back-end "Server" file, and install the dependencies using `npm install`.
6.  Start the back-end project with `node index.js`.

## Database Configuration

```javascript
    'username': process.env.USER,
    'password': process.env.PASSWORD,
    'database': process.env.DATABASE,
    'host': process.env.HOST,
```

## Action Items

- [x] Use validation library to manage form validation parts.
- [x] Add unit tests
- [ ] Add Integrated tests by Cypress
