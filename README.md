# Online Car Rental System

![Alt text](https://github.com/kevinyen83/OnlineCarRentalSystem/blob/main/client/screenshots/homepage.png)

This is an assignment for UTS Master of IT, which achieved a High Distinction grade and was invited to participate in the software engineering showcase of the 2023 UTS Tech Festival.

In this project, an online car rental service was developed using React.js, Node.js, and MySQL. User research and usability testing were conducted to improve the user experience in major user flows.

# Framework Information

1.  Front-end: React.JS, react-dom, react-hook-form, axios, Formik & Yup(Form validation)
2.  Back-end: Node.JS
3.  Database: MySQL, express
4.  Unit test: Jest, Mock Service Worker

## Installation And Data Configuration

To install and run the project, follow these steps:

1.  Clone the repository.
2.  Navigate to the project directory.
3.  Go to the "Client" file, and install the dependencies using `npm install`.
4.  Go to the back-end "Server" file, and install the dependencies using `npm install`.
5.  Execute database configuration by creating a new `.env` file on this path `server/.env`
6.  In the .env file, paste and change the value as follows:

    ```javascript
    USER=YOUR USER NAME
    HOST=YOUR HOST
    PASSWORD=YOUR PASSWORD
    DATABASE=YOUR DATABASE
    PORT=3001
    DB_PORT=3306
    ```

7.  Return to the "Client" file, and start the front-end project with `npm start`.
8.  Return to the "Client" file, and start the back-end project with `npm start`.

## Action Items

- [x] Use validation library to manage form validation parts.
- [x] Add unit tests
- [ ] Add Integrated tests by Cypress
