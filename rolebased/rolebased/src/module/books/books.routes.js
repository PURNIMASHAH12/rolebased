import books from "./books.controller.js";
import express from "express";
import { authRole } from "../../middleware/auth.role.js";
import {permission} from "../../middleware/promises.js";

const router = express.Router();

router.get("/",authRole('Admin'),permission("GET"),books.getAllBooks);
//router.get("/", books.getAllBooks);
router.get("/:id", books.getSingleBook);
router.post( "/",authRole('Admin'), books.createBook, );
router.put("/:id",authRole('Admin'), books.updateBook);
router.delete("/:id", authRole('Admin'), books.deleteBook,
);

export default router;
