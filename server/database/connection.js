import { Sequelize } from "sequelize";

const db = new Sequelize("freedb_it-help-desk", "freedb_amirt", "CmE273HmD?uZJtu", {
  host: "sql.freedb.tech",
  dialect: "mysql",
  logging: false,
});

export default db;
