import React from 'react';
import '../styles/BookCard.css';

function BookCard({ book, onDelete }) {
    return (
        <div className="book-card">
            <h3>{book.title}</h3>
            <p><strong>Auteur :</strong> {book.author}</p>
            <p><strong>Année :</strong> {book.year}</p>
            <p><strong>Prix :</strong> {book.price} €</p>
            <div className="book-card-buttons">
                <button onClick={() => onDelete(book.id)}>Supprimer</button>
            </div>
        </div>
    );
}

export default BookCard;
