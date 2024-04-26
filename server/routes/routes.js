import express from "express";
import customerController from "../controllers/CustomerController.js";
import verifyToken from "../middleware/verifyToken.js";
// import ParticipationController from "../controllers/participationController.js";
// import EventController from "../controllers/EventController.js";
// import checkEventParticipation from "../middleware/checkEventParticipation.js";

const router = express.Router();

// // User routes
router.get("/user/all", customerController.getAllcustomers);
router.get("/user/:id", verifyToken, customerController.getcustomerById);
router.post("/user/register", customerController.register);
router.post("/user/login", customerController.login);
router.put("/user/edit/:id", verifyToken, customerController.editcustomer);
router.delete("/user", verifyToken, customerController.deletecustomers);
// router.get("/refresh-token", verifyToken, customerController.refreshUserToken);

// // Admin routes
// router.post("/admin", verifyToken, UserController.createAdmin);
// router.get("/admin/all", verifyToken, UserController.getAllAdmins);
// router.put("/admin/:id", verifyToken, UserController.editAdmin);
// router.delete("/admin", verifyToken, UserController.deleteAdmins);
// router.get("/admin/:id", verifyToken, UserController.getAdminById);

// // Participation routes
// router.post("/participation/register", verifyToken, checkEventParticipation, ParticipationController.participateInEvent);
// router.get("/participation/:eventId/participants", verifyToken, ParticipationController.getEventParticipants);

// // Event routes
// router.post("/event/create", verifyToken, EventController.createEvent);
// router.get("/event/all", verifyToken, EventController.getAllEvents);
export default router;
