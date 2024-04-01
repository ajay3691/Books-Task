
import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String },
  published_date: { type: Date },
 // published_date: { type: Date, default: Date.now }, 
  image: { type: String } 
});

const Book = mongoose.model('Book', bookSchema);
export default Book;
