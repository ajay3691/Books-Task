import React from 'react';
import Navbar from './navbar/Navbar';
import BookAdmin from './components/BookAdmin';
import BookEdit from './components/BookEdit'; 
import CreateBook from './components/CreateBook'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/bookAdmin" element={<BookAdmin />} />
          <Route path="/createBook" element={<CreateBook />} />
          <Route path="/bookEdit/:id" element={<BookEdit />} /> 
        </Routes>
      </Router>
    </div>
  );
};

export default App;
