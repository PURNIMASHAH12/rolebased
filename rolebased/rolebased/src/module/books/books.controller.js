import bookModel from "./books.model.js";

const books = {};

books.createBook = async (req, res) => {
  try {
    const { title, author, genre, takenBy, returnDate } = req.body;
    if (!title || !author || !genre || !takenBy || !returnDate) {
      return res.status(400).json({
        message: "Some Field is Missing",
        success: false,
      });
    }
    const newBook = await bookModel.create({
      title,
      author,
      genre,
      takenBy,
      returnDate,
    });
    res.status(201).json({
      message: "Book Created successfully",
      data: newBook,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something went wrong",
      success: false,
    });
  }
};

books.getAllBooks = async (req, res) => {
  try {
    const books = await bookModel.find();
    res.status(200).json({
      message: "Books fetched successfully",
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something went wrong",
      success: false,
    });
  }
};

books.getSingleBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await bookModel.findById(id);
    res.status(200).json({
      message: "Book fetched successfully",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something went wrong",
      success: false,
    });
  }
};

books.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, genre, takenBy, returnDate } = req.body;
    const book = await bookModel.findByIdAndUpdate(
      id,
      {
        title,
        author,
        genre,
        takenBy,
        returnDate,
      },
      { new: true },
    );
    res.status(200).json({
      message: "Book updated successfully",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something went wrong",
      success: false,
    });
  }
};

books.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await bookModel.findByIdAndDelete(id);
    res.status(200).json({
      message: "Book deleted successfully",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something went wrong",
      success: false,
    });
  }
};

export default books;
