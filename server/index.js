const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const fs = require("fs")
import cars from "clint/public/cars.json";

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "Tmups9351007*",
  database: "Renting_History",
  port: 3306,
});

app.post("/create", (req, res) => {
  const user_email = req.body.email;
  const rent_date = new Date().toLocaleString();
  const rental_items = req.session.cartItems;
  const bond_amount = req.session.lastRentDate && (Date.now() - req.session.lastRentDate) < 7776000000 ? 0 : 200; // check if user has rented within past 3 months

  db.query(
    "INSERT INTO Renting_History (user_email, rent_date, rental_items, bond_amount) VALUES (?, ?, ?, ?)",
    [user_email, rent_date, JSON.stringif(rental_items), bond_amount],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Booking added to Renting_History table.");
      }
    }
  );
});

// Update the availability of booked cars in cars.json file
const cars = JSON.parse(fs.readFileSync("cars.json", "utf-8"));
rental_items.forEach(item => {
  const carIndex = cars.findIndex(car => car.id === item.id);
  if (carIndex !== -1) {
    cars[carIndex].availability = false;
  }
});
fs.writeFileSync("cars.json", JSON.stringify(cars));

// Clear shopping cart session
req.session.cartItems = [];

// Notify the user of successful booking
res.status(200).send("Booking successful!");

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});