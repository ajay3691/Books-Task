import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function BookEdit() {
  const { id } = useParams();
  const [book, setBook] = useState({
    title: '',
    author: '',
    description: '',
    published_date: ''
  });
  const navigate = useNavigate();

  const updateHandler = (event) => {
    setBook({ ...book, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/book/books/${id}`)
      .then((resp) => {
        setBook(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const submitHandler = (event) => {
    event.preventDefault();

    axios
      .put(`http://localhost:5000/book/books/${id}`, book)
      .then((resp) => {
        navigate('/bookAdmin');
      })
      .catch((error) => {
        console.error(error);
        alert('Failed to update the book. Please try again.');
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="d-flex vh-100 bg-light justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
              <form>
                <h2>Edit Book</h2>
                <div className="mb-2">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    onChange={updateHandler}
                    name="title"
                    value={book.title}
                    placeholder="Enter title"
                    className="form-control"
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="author">Author</label>
                  <input
                    type="text"
                    onChange={updateHandler}
                    name="author"
                    value={book.author}
                    placeholder="Enter author"
                    className="form-control"
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="description">Description</label>
                  <textarea
                    onChange={updateHandler}
                    name="description"
                    value={book.description}
                    placeholder="Enter description"
                    className="form-control"
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="published_date">Published Date</label>
                  <input
                    type="text"
                    onChange={updateHandler}
                    name="published_date"
                    value={book.published_date}
                    placeholder="Enter published date"
                    className="form-control"
                  />
                </div>
                <button className="btn btn-primary" onClick={submitHandler}>
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookEdit;
