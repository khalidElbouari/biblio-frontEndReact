import React from 'react';
import '../styles/BookCard.css';

function BookCard({ book }) {
  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <p><strong>Auteur:</strong> {book.author}</p>
      <p><strong>Année:</strong> {book.year}</p>
    </div>
  );
}

export default BookCard;
