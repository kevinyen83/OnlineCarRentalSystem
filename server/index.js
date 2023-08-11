const express = require("express");
const app = express();
const cors = require("cors");
const { Sequelize, DataTypes } = require('sequelize');

require('dotenv').config({ path: 'server/.env' });


// Initialize Sequelize connection
const sequelize = new Sequelize(process.env.DATABASE, "root", process.env.PASSWORD, {
    host: process.env.HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql'
  });

// Define Renting_Histories model
const Renting_Histories = sequelize.define('Renting_Histories', {
  email: DataTypes.STRING,
  rent_date: DataTypes.DATE,
  bond_amount: DataTypes.DECIMAL,
  totalPrice: DataTypes.DECIMAL,
});

// Sync models with the database
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    await sequelize.sync();

    app.use(cors());
    app.use(express.json());

    app.get("/cars.json", (req, res) => {
        try {
          const carsData = require("./cars.json"); 
          res.json(carsData);
        } catch (error) {
          console.error(error);
          res.status(500).send("Internal Server Error");
        }
      });

      app.post("/validateEmail", async (req, res) => {
        try {
            const { email } = req.body;
    
            const query = `
                SELECT COUNT(*) AS count 
                FROM Renting_Histories 
                WHERE email = :email 
                AND rent_date >= DATE_SUB(NOW(), INTERVAL 3 MONTH)
            `;
            
            const results = await sequelize.query(query, {
                replacements: { email },
                type: Sequelize.QueryTypes.SELECT
            });
    
            const count = results[0].count;
            const hasRentingHistory = count > 0;
    
            res.json({ hasRentingHistory });
        } catch (error) {
            console.error(error);
            console.error("Validation error:", error); 
            res.status(500).send("Internal Server Error");
        }
    });

    app.post("/create", async (req, res) => {
      try {
        const { email, totalPrice } = req.body;
        const rent_date = new Date();
        let bond_amount = 200;

        const lastRentingHistory = await Renting_Histories.findOne({
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

        await Renting_Histories.create({
          email,
          rent_date,
          bond_amount,
          totalPrice,
        });

        console.log("Booking added to RentingHistory table.");
        res.send("Booking added to RentingHistory table.");
      } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
    });

    const PORT = process.env.PORT;

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();