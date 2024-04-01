import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Admin() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('https://books-task-lemon.vercel.app/book/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks(); // Call fetchBooks function when the component mounts

  }, []); 

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://books-task-lemon.vercel.app/book/books/${id}`);
      setBooks(books.filter(book => book._id !== id));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Admin Page</h2>
      <Link to="/createBook" className="btn btn-primary mb-3">Add Book</Link>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Description</th>
            <th>Published Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.description}</td>
              <td>{book.published_date}</td>
              <td>
                <div className="btn-group">
                  <Link to={`/bookEdit/${book._id}`} className="btn btn-primary">Edit</Link>
                  <button onClick={() => handleDelete(book._id)} className="btn btn-danger">Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
