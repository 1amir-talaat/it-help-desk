import { DataTypes } from "sequelize";
import db from "../database/connection.js";

const FreeDate = db.define("FreeDate", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

export default FreeDate;
