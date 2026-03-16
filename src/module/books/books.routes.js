import express from "express";
import {
  getAllBooks,
  createBook,
  getSingleBook,
  updateBook,
  deleteBook,
} from "./books.controller.js";

const router = express.Router();


router.get("/", getAllBooks);


router.post("/", createBook);


router.get("/:id", getSingleBook);

router.put("/:id", updateBook);

router.delete("/:id", deleteBook);

export default router;
