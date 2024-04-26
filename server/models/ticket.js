import { DataTypes } from "sequelize";
import db from "../database/connection.js";

const Ticket = db.define("Ticket", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  customer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  free_data_id: DataTypes.INTEGER,
  description: DataTypes.TEXT,
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.ENUM("Backlog", "todo", "in_progress", "done", "Canceled"),
    allowNull: false,
  },
  cost: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  priority: {
    type: DataTypes.ENUM("high", "medium", "low", "unset"),
    allowNull: false,
  },
  priority_position: DataTypes.INTEGER,
});

export default Ticket;
