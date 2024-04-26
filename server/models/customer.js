// Import necessary modules and database connection
import { DataTypes } from "sequelize";
import db from "../database/connection.js"; // Assuming path to your connection file

const Customer = db.define("Customer", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true, // Validates that the value matches an email format
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM("individual", "business"),
    allowNull: false,
  },
  address: {
    type: DataTypes.TEXT,
  },
});

export default Customer;
