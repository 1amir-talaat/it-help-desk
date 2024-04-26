import { DataTypes } from "sequelize";
import db from "../database/connection.js";

const TicketCategory = db.define("TicketCategory", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ticket_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default TicketCategory;
