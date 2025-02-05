import React from 'react';
import '../styles/BookCard.css';

function BookCard({ book, onDelete, onEdit }) {
    return (
        <div className="book-card">
            <h3>{book.title}</h3>
            <p><strong>Auteur :</strong> {book.author}</p>
            <p><strong>Année :</strong> {book.year}</p>
            <p><strong>Prix :</strong> {book.price} €</p>
            <p><strong>description :</strong> {book.description}</p>
            <div className="book-card-buttons">
                <button onClick={() => onEdit(book)}>Modifier</button>
                <button onClick={() => onDelete(book)}>Supprimer</button>
            </div>
        </div>
    );
}

export default BookCard;
