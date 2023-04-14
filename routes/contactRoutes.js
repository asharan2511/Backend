import express from "express";
import getContact, {
  createContact,
  deleteContacts,
  getContacts,
  putContacts,
} from "../controllers/contactController.js";
const router = express.Router();

router.get("/", getContact).post("/", createContact);

router
  .get("/:id", getContacts)
  .put("/:id", putContacts)
  .delete("/:id", deleteContacts);

export default router;
