const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs")
const dotenv = require("dotenv");
const Sequelize = require('sequelize');

dotenv.config();

// Initialize Sequelize connection
const sequelize = new Sequelize(process.env.database, process.env.user, process.env.password, {
username: process.env.USER,
password: process.env.PASSWORD,
database: process.env.DATABASE,
host: process.env.HOST,
port: process.env.PORT,
dialect: 'mysql'
});

// Define RentingHistory model
const RentingHistory = sequelize.define('RentingHistory', {
  email: Sequelize.STRING,
  rent_date: Sequelize.DATE,
  bond_amount: Sequelize.DECIMAL,
  totalPrice: Sequelize.DECIMAL,
});

app.use(cors());
app.use(express.json());

app.post("/create", async (req, res) => {
  try {
    const { email, totalPrice } = req.body;
    const rent_date = new Date();
    let bond_amount = 200;

    const lastRentingHistory = await RentingHistory.findOne({
      where: { email },
      order: [['rent_date', 'DESC']],
    });

    if (lastRentingHistory) {
      const lastRentDate = new Date(lastRentingHistory.rent_date);
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      if (lastRentDate >= threeMonthsAgo) {
        bond_amount = 0;
      }
    }

    await RentingHistory.create({
      email,
      rent_date,
      bond_amount,
      totalPrice,
    });

    res.send("Booking added to RentingHistory table.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Start the server
const PORT = process.env.PORT || 3001;
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});