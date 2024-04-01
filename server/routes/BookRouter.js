// routes/bookRoutes.js

import express from 'express';
import Book from '../models/Book.js';

const router = express.Router();

router.post('/books', async (req, res) => {
    const { title, author, description, published_date, image } = req.body;
    try {
        const existingBook = await Book.findOne({ title, author });
        if (existingBook) {
            return res.status(400).json({ message: 'Book with the same title and author already exists' });
        }

        const book = new Book({
            title,
            author,
            description,
            published_date,
            image
        });

        const newBook = await book.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
  
// Route to get all books
router.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to get a single book by ID
router.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Route to update a book by ID
router.put('/books/:id', async (req, res) => {
    const { title, author, description, published_date, image } = req.body;
    try {
      const existingBook = await Book.findOne({ title, author, _id: { $ne: req.params.id } });
      if (existingBook) {
        return res.status(400).json({ message: 'Another book with the same title and author already exists' });
      }
  
      const updatedBook = await Book.findByIdAndUpdate(req.params.id, {
        title,
        author,
        description,
        published_date,
        image
      }, { new: true });
  
      if (updatedBook) {
        res.json(updatedBook);
      } else {
        res.status(404).json({ message: 'Book not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

// Route to delete a book by ID
router.delete('/books/:id', async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
  
      await book.deleteOne(); // or book.remove() if you're using Mongoose version 4.x or earlier
      res.json({ message: 'Book deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
export default router;
