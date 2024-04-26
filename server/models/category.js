import { DataTypes } from "sequelize";
import db from "../database/connection.js";

const Category = db.define("Category", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM("soft_ware", "hard_ware"),
    allowNull: false,
  },
  price: {
    type : DataTypes.INTEGER,
    allowNull: false,

  }
});

export default Category;
