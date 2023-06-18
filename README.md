# Online Car Rental System

This is an assignment for UTS Master of IT, which achieved a High Distinction grade and was invited to participate in the software engineering showcase of the 2023 UTS Tech Festival.

In this project, an online car rental service was developed using React.js, Node.js, and MySQL. User research and usability testing were conducted to improve the user experience in major user flows.

## Installation

To install and run the project, follow these steps:

1.  Clone the repository.
2.  Navigate to the project directory.
3.  Install the dependencies using `npm install`.
4.  Start the project with `npm start`.

## Usage

1.  To activate the server, please enter your MySQL database password in the `./car-rental-system/clint/src/index.js` file.
```javascript
{
    const db = mysql.createConnection({
    user: "", //Please type your own username
    host: "", //Please type your own host
    password: "",   //Please type your own password
    database: "", //Please type your own database name
    port: 3306, //Please type your own port
    });
}
```

## Action Items

1.  Use validation library to manage form validation parts.
2.  Use unique ID instead of Key index (Refer to https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key)
3.  Add unit tests
4.  Add Integrated tests by Cypress