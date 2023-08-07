const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const fs = require("fs")

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "", //Please type your own username
  host: "", //Please type your own host
  password: "",   //Please type your own password
  database: "", //Please type your own database name
  port: 3306, //Please type your own port
});

app.post("/create", (req, res) => {
  const email = req.body.email;
  const rent_date = new Date().toISOString().replace("T", " ").replace("Z", "");
    let bond_amount = 200;
  const totalPrice = req.body.totalPrice;

  db.query(
    "SELECT rent_date FROM Renting_History WHERE email = ? ORDER BY rent_date DESC LIMIT 1",
    [email],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (result.length > 0) {
          const lastRentDate = new Date(result[0].rent_date);
          const threeMonthsAgo = new Date();
          threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
          if (lastRentDate >= threeMonthsAgo) {
            bond_amount = 0; // Set bond amount to 0 if user rented within the past three months
          }
        }

        db.query(
        "INSERT INTO Renting_History (email, rent_date, bond_amount, totalPrice) VALUES (?, ?, ?, ?)",
        [email, rent_date, bond_amount, totalPrice],
        (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send("Booking added to Renting_History table.");
            }
        }
        );
    }
    }
    );
});

app.get("/Renting_History", (req, res) => {
  db.query("SELECT * FROM Renting_History", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/validateEmail", (req, res) => {
    const { email } = req.body;  
    const query = `SELECT COUNT(*) AS count FROM Renting_History WHERE email = ? AND rent_date >= DATE_SUB(NOW(), INTERVAL 3 MONTH)`;
  
    db.query(query, [email], (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
        return;
      }
  
      const count = results[0].count;
      const hasRentingHistory = count > 0;
  
      res.json({ hasRentingHistory });
    });
  });
  
  app.get("/cars.json", (req, res) => {
    fs.readFile("cars.json", 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
      } else {
        res.json(JSON.parse(data));
      }
    });
  });
  
  app.put("/cars.json", (req, res) => {
    const updatedCars = req.body.cars;
    const jsonContent = JSON.stringify({ cars: updatedCars });
  
    fs.writeFile("cars.json", jsonContent, "utf8", (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
      } else {
        res.send("Cars availability updated successfully.");
      }
    });
  });

app.listen(3001, () => {
  console.log("Yay, your server is running on port 3001");
});