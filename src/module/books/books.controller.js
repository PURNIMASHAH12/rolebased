import bookModel from "./books.model.js";

export const getAllBooks = async (req, res) => {
  try {
    const books = await bookModel.find().populate("postedBy","username email role");

    if (!books) {
      res.status(400).json({
        message: "No Books Found",
        success: false,
      });
    }

    if (books.lenght === 0) {
      res.status(400).json({
        message: "Book Collection is Empty",
        success: false,
      });
    }

    res.status(200).json({
      message: "Books Fetched Successfully",
      success: true,
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal Server Error",
      success: false,
    });
  }
};

export const createBook = async (req, res) => {
  try {
    const { title, author, edition, genera, price, postedBy } = await req.body;

    // check if the body is empty
    if (!title || !author || !edition || !genera || !price) {
      res.status(400).json({
        message: "All Fields are Required!",
        success: false,
      });
    }

    const newBook = new bookModel({
      title,
      author,
      edition,
      genera,
      price,
      postedBy,
    });

    if (!newBook) {
      res.status(400).json({
        message: "Failed to Create Book",
        success: false,
      });
    }

    await newBook.save();

    res.status(201).json({
      message: "Book Created Successfully",
      success: true,
      data: newBook,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal Server Error",
      success: false,
    });
  }
};

export const getSingleBook = async (req, res) => {
  try {
    const id = req.params.id;

    const book = await bookModel.findById(id);
    if (!book) {
      res.status(404).json({
        message: "Book Not Found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Book Fetched Successfully",
      success: true,
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal Server Error",
      success: false,
    });
  }
};

//delete book

export const deleteBook = async (req, res) => {
  try {
    const id = req.params.id;

    const book = await bookModel.findById(id);
    if (!book) {
      res.status(404).json({
        message: "Book Not Found",
        success: false,
      });
    }

    await bookModel.findByIdAndDelete(id);

    res.status(200).json({
      message: "Book Deleted Successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal Server Error",
      success: false,
    });
  }
};

// update book

export const updateBook = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, author, edition, genera, price, postedBy } = await req.body;

    if (!title || !author || !edition || !genera || !price) {
      res.status(400).json({
        message: "All Fields are Required!",
        success: false,
      });
    }

    const book = await bookModel.findById(id);
    if (!book) {
      res.status(404).json({
        message: "Book Not Found",
        success: false,
      });
    }

    const updatedBook = await bookModel.findByIdAndUpdate(id, {
      title,
      author,
      edition,
      genera,
      price,
      postedBy,
    });

    await updatedBook.save();

    res.status(200).json({
      message: "Book Updated Successfully",
      success: true,
      data: updatedBook,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal Server Error",
      success: false,
    });
  }
};