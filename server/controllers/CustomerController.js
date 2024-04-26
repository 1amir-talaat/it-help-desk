import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Customer, Admin } from "../models/models.js";

class customerController {
  static getAllcustomers = async (req, res) => {
    if (!req.isAdmin) {
      return res.status(403).json({ error: "Unauthorized - Admin access required" });
    }

    try {
      const customers = await Customer.findAll({ attributes: { exclude: ["password"] } });
      res.json(customers);
    } catch (error) {
      console.error("Error fetching customers:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  static getcustomerById = async (req, res) => {
    const { id } = req.params;
    if (!req.isAdmin) {
      return res.status(403).json({ error: "Unauthorized - Admin access required" });
    }

    try {
      const customer = await customer.findByPk(id);
      if (!customer) {
        return res.status(404).json({ message: "customer not found" });
      }
      res.json(customer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  };

  static register = async (req, res) => {
    const { username, email, password } = req.body;

    if (!(username && email && password)) {
      return res.status(401).json({ error: "Missing input fields" });
    }

    try {
      const newcustomer = await customer.create({ username, email, password: await bcrypt.hash(password, 10), isTeam });

      const token = jwt.sign(
        {
          id: newcustomer.id,
          email: newcustomer.email,
          username: newcustomer.username,
          isAdmin: false,
          isTeam: newcustomer.isTeam,
          maxEvents: newcustomer.maxEvents,
          points: newcustomer.points,
          role: "student",
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "30d",
        }
      );

      res.status(200).json({
        token,
        msg: "Registration Successful",
      });
    } catch (error) {
      if (error.username === "SequelizeUniqueConstraintError") {
        return res.status(400).json({ error: "Email address already exists" });
      } else {
        console.error("Error creating admin customer:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  };

  static login = async (req, res) => {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(401).json({ error: "Missing input fields" });
    }

    let isAdmin = false;
    let role = "student";

    try {
      let customer = await customer.findOne({
        where: { email },
      });

      if (!customer) {
        customer = await Admin.findOne({ where: { email } });

        if (!customer) {
          return res.status(401).json({ error: "customer not found" });
        }

        isAdmin = true;
        role = customer.role;
      }

      const matchedPassword = await bcrypt.compare(password, customer.password);

      if (!matchedPassword) {
        return res.status(401).json({ error: "Incorrect email or password" });
      }

      const token = jwt.sign(
        {
          id: customer.id,
          email: customer.email,
          name: customer.name,
          isAdmin,
          role,
          points: customer.points,
          isTeam: customer.isTeam,
          maxEvents: customer.maxEvents,
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "30d",
        }
      );

      res.status(200).json({
        token,
        msg: "Login Successful",
      });
    } catch (error) {
      console.error("Error during Login:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  static editcustomer = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    if (!req.isAdmin) {
      return res.status(403).json({ error: "Unauthorized - Admin access required" });
    }

    try {
      let customer = await customer.findByPk(id);

      if (!customer) {
        return res.status(404).json({ message: "customer not found" });
      }

      if (name) customer.name = name;
      if (email) customer.email = email;

      await customer.save();

      res.status(200).json({ message: "customer updated successfully" });
    } catch (error) {
      console.error("Error updating customer:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  static deletecustomers = async (req, res) => {
    const { ids } = req.body;

    if (!req.isAdmin) {
      return res.status(403).json({ error: "Unauthorized - Admin access required" });
    }

    try {
      for (const id of ids) {
        const customer = await customer.findByPk(id);
        if (!customer) {
          return res.status(404).json({ error: `customer with ID ${id} not found` });
        }

        await customer.destroy();
      }

      res.status(200).json({ msg: "customers deleted successfully" });
    } catch (error) {
      console.error("Error deleting customers:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  static getAllAdmins = async (req, res) => {
    if (!req.isAdmin && req.role != "superadmin") {
      return res.status(403).json({ error: "Unauthorized - Super Admin access required" });
    }

    try {
      const admins = await Admin.findAll();
      res.json(admins);
    } catch (error) {
      console.error("Error fetching admins:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  static createAdmin = async (req, res) => {
    const { name, email, password } = req.body;

    if (!(name && email && password)) {
      return res.status(401).json({ error: "Missing input fields" });
    }

    if (!req.isAdmin || req.role !== "superadmin") {
      return res.status(403).json({ error: "Unauthorized - Only super admins can create new admins" });
    }

    try {
      const existingAdmin = await Admin.findOne({ where: { email } });
      if (existingAdmin) {
        return res.status(400).json({ error: "Email address already exists" });
      }

      const newAdmin = await Admin.create({ name, email, role: "admin", password: await bcrypt.hash(password, 10) });

      const token = jwt.sign(
        {
          id: newAdmin.id,
          email: newAdmin.email,
          name: newAdmin.name,
          isAdmin: true,
          role: newAdmin.role,
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "30d",
        }
      );

      res.status(201).json({
        token,
        msg: "Admin created successfully",
      });
    } catch (error) {
      console.error("Error creating admin customer:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  static editAdmin = async (req, res) => {
    if (!req.isAdmin) {
      return res.status(403).json({ error: "Unauthorized - Admin access required" });
    }
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    try {
      const admin = await Admin.findByPk(id);
      if (!admin) {
        return res.status(404).json({ error: "Admin not found" });
      }

      admin.name = name;
      admin.email = email;

      await admin.save();

      res.json(admin);
    } catch (error) {
      console.error("Error editing admin:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  static deleteAdmins = async (req, res) => {
    if (!req.isAdmin) {
      return res.status(403).json({ error: "Unauthorized - Admin access required" });
    }

    const { ids } = req.body;

    try {
      for (const id of ids) {
        const admin = await Admin.findByPk(id);
        if (!admin) {
          return res.status(404).json({ error: `Admin with ID ${id} not found` });
        }

        await admin.destroy();
      }

      res.status(200).json({ msg: "Admins deleted successfully" });
    } catch (error) {
      console.error("Error deleting admins:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  static getAdminById = async (req, res) => {
    const { id } = req.params;

    try {
      const admin = await Admin.findByPk(id);
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }

      res.json(admin);
    } catch (error) {
      console.error("Error fetching admin:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  static changeMaxEvents = async (req, res) => {
    const { id, maxEvents } = req.body;

    try {
      const customer = await customer.findByPk(id);

      if (!customer) {
        return res.status(404).json({ message: "customer not found" });
      }

      customer.maxEvents = maxEvents;

      await customer.save();

      res.status(200).json({ message: "student data updated successfully" });
    } catch (error) {
      console.error("Error updating max events:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  static refreshcustomerToken = async (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const { id, email, name, isAdmin, role, isTeam, maxEvents } = decoded;

      const updatedcustomer = await customer.findByPk(id);

      const newToken = jwt.sign(
        {
          id: updatedcustomer.id,
          email: updatedcustomer.email,
          name: updatedcustomer.name,
          isAdmin,
          role,
          points: updatedcustomer.points,
          isTeam: updatedcustomer.isTeam,
          maxEvents: updatedcustomer.maxEvents,
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "30d",
        }
      );

      res.status(200).json({
        token: newToken,
        msg: "Token refreshed successfully",
      });
    } catch (error) {
      console.error("Error refreshing token:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  static getTopcustomers = async (req, res) => {
    if (!req.isAdmin) {
      return res.status(403).json({ error: "Unauthorized - Admin access required" });
    }

    try {
      const customers = await Customer.findAll({
        attributes: { exclude: ["password"] },
        order: [["points", "DESC"]], // Sorting customers by points in descending order
      });
      res.json(customers);
    } catch (error) {
      console.error("Error fetching customers:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}

export default customerController;
