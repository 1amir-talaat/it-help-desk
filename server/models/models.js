import Customer from "./customer.js";
import Ticket from "./ticket.js";
import FreeDate from "./freeDate.js";
import Category from "./category.js";
import TicketCategory from "./ticketCategory.js";
import Admin from "./admin.js";

Customer.hasMany(Ticket, { foreignKey: "customer_id" });
Ticket.belongsTo(Customer, { foreignKey: "customer_id" });

Ticket.belongsTo(FreeDate, { foreignKey: "free_data_id" });
FreeDate.hasOne(Ticket, { foreignKey: "free_data_id" });

Ticket.belongsToMany(Category, { through: TicketCategory, foreignKey: "ticket_id" });
Category.belongsToMany(Ticket, { through: TicketCategory, foreignKey: "category_id" });

export { Customer, Ticket, FreeDate, Category, TicketCategory, Admin };
