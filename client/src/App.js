import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './navbar/Navbar';
import BookAdmin from './components/BookAdmin';
import BookEdit from './components/BookEdit'; 
import CreateBook from './components/CreateBook'; 

const Home = () => {
  return (
    <div className="container mt-4">
      <h2 className='text-primary'>Hello, welcome to  My Books  Library !
      </h2>
      <br/>
      <h3 className='text-warning'>Have A nice day</h3>
    </div>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        await axios.get('https://books-task-lemon.vercel.app/book/books');
        setLoading(false);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks(); // Call fetchBooks function when the component mounts
  }, []); 

  if (loading) {
    return <div>Loading...</div>; // Display a loading message while fetching books
  }

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bookAdmin" element={<BookAdmin />} />
          <Route path="/createBook" element={<CreateBook />} />
          <Route path="/bookEdit/:id" element={<BookEdit />} /> 
        </Routes>
      </Router>
    </div>
  );
};

export default App;
